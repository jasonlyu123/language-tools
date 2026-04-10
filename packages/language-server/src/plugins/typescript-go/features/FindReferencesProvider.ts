import {
    CancellationToken,
    Location,
    Position,
    ReferenceContext,
    ReferencesRequest
} from 'vscode-languageserver-protocol';
import { FindReferencesProvider } from '../../interfaces';
import { TsApiService } from '../lspService';
import { Document, mapRangeToOriginal } from '../../../lib/documents';
import { TsGoFindComponentReferencesProvider } from './FindComponentReferencesProvider';

export class TsGoFindReferencesProvider implements FindReferencesProvider {
    private readonly tsApiService: TsApiService;
    private readonly componentReferencesProvider: TsGoFindComponentReferencesProvider;

    constructor(
        tsApiService: TsApiService,
        componentReferencesProvider: TsGoFindComponentReferencesProvider
    ) {
        this.tsApiService = tsApiService;
        this.componentReferencesProvider = componentReferencesProvider;
    }

    async findReferences(
        document: Document,
        position: Position,
        context: ReferenceContext,
        cancellationToken?: CancellationToken
    ): Promise<Location[] | null> {
        const tsDoc = this.tsApiService.getDocumentSnapshot(document);
        if (!tsDoc) {
            return null;
        }

        if (this.isScriptStartOrEndTag(position, document)) {
            return this.componentReferencesProvider.findComponentReferences(document.uri);
        }

        const generatedPosition = tsDoc.getGeneratedPosition(position);
        const res = await this.tsApiService.sendRequest(
            ReferencesRequest.type,
            {
                textDocument: { uri: document.uri },
                position: generatedPosition,
                context
            },
            cancellationToken
        );

        if (!res) {
            return null;
        }

        const result: Location[] = [];

        for (const loc of res) {
            if (!loc.uri.endsWith('.svelte')) {
                result.push(loc);
                continue;
            }

            const snapshot = this.tsApiService.getDocumentSnapshot(loc.uri);
            if (!snapshot) {
                continue;
            }
            const mappedRange = mapRangeToOriginal(snapshot, loc.range);
            if (mappedRange.start.line < 0 || mappedRange.end.line < 0) {
                continue;
            }
            result.push(Location.create(loc.uri, mappedRange));
        }
        return result;
    }

    private isScriptStartOrEndTag(position: Position, document: Document) {
        if (!document.scriptInfo) {
            return false;
        }
        const { start, end } = document.scriptInfo.container;

        const offset = document.offsetAt(position);
        return (
            (offset >= start && offset <= start + '<script'.length) ||
            (offset >= end - '</script>'.length && offset <= end)
        );
    }
}
