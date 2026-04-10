import {
    CancellationToken,
    Position,
    PrepareRenameRequest,
    PrepareRenameResult,
    RenameRequest,
    TextEdit,
    WorkspaceEdit
} from 'vscode-languageserver-protocol';
import { RenameProvider } from '../../interfaces';
import { TsApiService } from '../lspService';
import { Document, mapRangeToOriginal } from '../../../lib/documents';

export class TsGoRenameProvider implements RenameProvider {
    private readonly tsApiService: TsApiService;

    constructor(tsApiService: TsApiService) {
        this.tsApiService = tsApiService;
    }

    async rename(
        document: Document,
        position: Position,
        newName: string,
        cancellationToken?: CancellationToken
    ): Promise<WorkspaceEdit | null> {
        const tsDoc = this.tsApiService.getDocumentSnapshot(document);
        if (!tsDoc) {
            return null;
        }

        const generatedPosition = tsDoc.getGeneratedPosition(position);
        const res = await this.tsApiService.sendRequest(
            RenameRequest.type,
            {
                textDocument: { uri: document.uri },
                position: generatedPosition,
                newName
            },
            cancellationToken
        );

        if (!res || !res.changes) {
            return null;
        }

        const changes: Record<string, TextEdit[]> = {};

        for (const [uri, edits] of Object.entries(res.changes)) {
            if (uri.endsWith('.svelte')) {
                const snapshot = this.tsApiService.getDocumentSnapshot(uri);
                if (!snapshot) {
                    continue;
                }

                const mappedEdits: TextEdit[] = [];
                for (const edit of edits) {
                    const mappedRange = mapRangeToOriginal(snapshot, edit.range);
                    if (mappedRange.start.line < 0 || mappedRange.end.line < 0) {
                        continue;
                    }
                    mappedEdits.push({
                        range: mappedRange,
                        newText: edit.newText
                    });
                }
                if (mappedEdits.length > 0) {
                    changes[uri] = mappedEdits;
                }
            } else {
                changes[uri] = edits;
            }
        }

        return { changes };
    }

    async prepareRename(
        document: Document,
        position: Position
    ): Promise<PrepareRenameResult | null> {
        const tsDoc = this.tsApiService.getDocumentSnapshot(document);
        if (!tsDoc) {
            return null;
        }

        const generatedPosition = tsDoc.getGeneratedPosition(position);
        const res = await this.tsApiService.sendRequest(PrepareRenameRequest.type, {
            textDocument: { uri: document.uri },
            position: generatedPosition
        });

        if (res === null) {
            return null;
        }
        if ('defaultBehavior' in res) {
            return res;
        }

        const range = 'range' in res ? res.range : res;
        const mappedRange = mapRangeToOriginal(tsDoc, range);
        if (mappedRange.start.line < 0 || mappedRange.end.line < 0) {
            return null;
        }
        return 'range' in res ? { range: mappedRange, placeholder: res.placeholder } : mappedRange;
    }
}
