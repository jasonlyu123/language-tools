import { Hover, Position } from 'vscode-languageserver-types';
import { HoverProvider } from '../../interfaces';
import { TsApiService } from '../lspService';
import { Document, mapRangeToOriginal } from '../../../lib/documents';
import { HoverRequest } from 'vscode-languageserver-protocol';

export class TsGoHoverProvider implements HoverProvider {
    private readonly tsApiService: TsApiService;
    constructor(tsApiService: TsApiService) {
        this.tsApiService = tsApiService;
    }

    async doHover(document: Document, position: Position): Promise<Hover | null> {
        const tsDoc = this.tsApiService.getDocumentSnapshot(document);
        if (!tsDoc) {
            return null;
        }

        const generatedPosition = tsDoc.getGeneratedPosition(position);
        if (generatedPosition.line < 0) {
            return null;
        }
        const res = await this.tsApiService.sendRequest(HoverRequest.type, {
            textDocument: { uri: document.uri },
            position: generatedPosition
        });
        if (!res) {
            return null;
        }
        return {
            contents: res.contents,
            range: res.range ? mapRangeToOriginal(tsDoc, res.range) : undefined
        };
    }
}
