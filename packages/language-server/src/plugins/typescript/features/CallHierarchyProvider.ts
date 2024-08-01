import path, { basename, dirname } from 'path';
import ts from 'typescript';
import { CancellationToken, SymbolTag } from 'vscode-languageserver';
import {
    CallHierarchyIncomingCall,
    CallHierarchyItem,
    CallHierarchyOutgoingCall,
    Position
} from 'vscode-languageserver-types';
import { Document } from '../../../lib/documents';
import {
    createGetCanonicalFileName,
    isNotNullOrUndefined,
    pathToUrl,
    urlToPath
} from '../../../utils';
import { CallHierarchyProvider } from '../../interfaces';
import { DocumentSnapshot } from '../DocumentSnapshot';
import { LSAndTSDocResolver } from '../LSAndTSDocResolver';
import { convertMappedRange, getNearestWorkspaceUri, symbolKindFromString } from '../utils';
import { SnapshotMap } from './utils';

export class CallHierarchyProviderImpl implements CallHierarchyProvider {
    constructor(
        private readonly lsAndTsDocResolver: LSAndTSDocResolver,
        private readonly workspaceUris: string[]
    ) {}

    async prepareCallHierarchy(
        document: Document,
        position: Position,
        cancellationToken?: CancellationToken
    ): Promise<CallHierarchyItem[] | null> {
        const { lang, tsDoc } = await this.lsAndTsDocResolver.getLSAndTSDoc(document);

        if (cancellationToken?.isCancellationRequested) {
            return null;
        }

        const offset = tsDoc.offsetAt(tsDoc.getGeneratedPosition(position));
        const items = lang.prepareCallHierarchy(tsDoc.filePath, offset);

        const itemsArray = Array.isArray(items) ? items : items ? [items] : [];

        const snapshots = new SnapshotMap(this.lsAndTsDocResolver);
        snapshots.set(tsDoc.filePath, tsDoc);

        const result = await Promise.all(
            itemsArray.map((item) => this.convertCallHierarchyItem(snapshots, item))
        );

        return result;
    }

    private isSourceFileItem(item: ts.CallHierarchyItem) {
        return (
            item.kind === ts.ScriptElementKind.scriptElement ||
            (item.kind === ts.ScriptElementKind.moduleElement && item.selectionSpan.start === 0)
        );
    }

    private async convertCallHierarchyItem(
        snapshots: SnapshotMap,
        item: ts.CallHierarchyItem
    ): Promise<CallHierarchyItem> {
        const snapshot = await snapshots.retrieve(item.file);

        const { name, detail } = this.getNameAndDetailForItem(this.isSourceFileItem(item), item);

        const selectionRange = convertMappedRange(snapshot, item.selectionSpan);
        const range = convertMappedRange(snapshot, item.span);

        return {
            kind: symbolKindFromString(item.kind),
            name,
            range,
            selectionRange,
            uri: pathToUrl(item.file),
            detail,
            tags: item.kindModifiers?.includes('deprecated') ? [SymbolTag.Deprecated] : undefined
        };
    }

    private getNameAndDetailForItem(useFileName: boolean, item: ts.CallHierarchyItem) {
        const nearestRootUri = getNearestWorkspaceUri(
            this.workspaceUris,
            item.file,
            createGetCanonicalFileName(ts.sys.useCaseSensitiveFileNames)
        );
        const nearestRoot = nearestRootUri && (urlToPath(nearestRootUri) ?? undefined);

        const name = useFileName ? basename(item.file) : item.name;
        const detail = useFileName
            ? nearestRoot && path.relative(nearestRoot, dirname(item.file))
            : item.containerName;
        return { name, detail };
    }

    async getIncomingCalls(
        previousItem: CallHierarchyItem,
        cancellationToken?: CancellationToken | undefined
    ): Promise<CallHierarchyIncomingCall[] | null> {
        const prepareResult = await this.prepareFurtherCalls(previousItem, cancellationToken);
        if (!prepareResult) {
            return null;
        }

        const { lang, filePath, snapshots, offset } = prepareResult;

        const incomingCalls: ts.CallHierarchyIncomingCall[] =
            lang.provideCallHierarchyIncomingCalls(filePath, offset);

        const result = await Promise.all(
            incomingCalls.map(async (item): Promise<CallHierarchyIncomingCall> => {
                const snapshot = await snapshots.retrieve(item.from.file);
                const from = await this.convertCallHierarchyItem(snapshots, item.from);

                return {
                    from,
                    fromRanges: this.convertFromRanges(snapshot, item.fromSpans)
                };
            })
        );

        return result.filter(isNotNullOrUndefined);
    }

    async getOutgoingCalls(
        previousItem: CallHierarchyItem,
        cancellationToken?: CancellationToken | undefined
    ): Promise<CallHierarchyOutgoingCall[] | null> {
        const prepareResult = await this.prepareFurtherCalls(previousItem, cancellationToken);
        if (!prepareResult) {
            return null;
        }

        const { lang, filePath, snapshots, tsDoc, offset } = prepareResult;

        const outgoingCalls = lang.provideCallHierarchyOutgoingCalls(filePath, offset);

        const result = await Promise.all(
            outgoingCalls.map(async (item): Promise<CallHierarchyOutgoingCall | null> => {
                const to = await this.convertCallHierarchyItem(snapshots, item.to);

                if (!to) {
                    return null;
                }
                return {
                    to,
                    fromRanges: this.convertFromRanges(tsDoc, item.fromSpans)
                };
            })
        );

        return result.filter(isNotNullOrUndefined).filter((item) => item.fromRanges.length);
    }

    private async prepareFurtherCalls(
        item: CallHierarchyItem,
        cancellationToken: CancellationToken | undefined
    ) {
        const filePath = urlToPath(item.uri);

        if (!filePath) {
            return null;
        }

        const lang = await this.lsAndTsDocResolver.getLSForPath(filePath);
        const tsDoc = await this.lsAndTsDocResolver.getSnapshot(filePath);

        if (cancellationToken?.isCancellationRequested) {
            return null;
        }

        const snapshots = new SnapshotMap(this.lsAndTsDocResolver);
        snapshots.set(tsDoc.filePath, tsDoc);

        return {
            snapshots,
            filePath,
            tsDoc,
            lang,
            offset:
                item.selectionRange.start.line === 0 && item.selectionRange.start.character === 0
                    ? 0
                    : tsDoc.offsetAt(tsDoc.getGeneratedPosition(item.selectionRange.start))
        };
    }

    private convertFromRanges(snapshot: DocumentSnapshot, spans: ts.TextSpan[]) {
        return spans.map((item) => convertMappedRange(snapshot, item));
    }
}
