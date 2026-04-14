import {
    CancellationToken,
    SignatureHelpContext,
    SignatureHelpRequest
} from 'vscode-languageserver-protocol';
import { Position, SignatureHelp, SignatureInformation } from 'vscode-languageserver-types';
import { Document } from '../../../lib/documents';
import { SignatureHelpProvider } from '../../interfaces';
import { TsApiService } from '../lspService';

export class TsGoSignatureHelpProvider implements SignatureHelpProvider {
    private readonly tsApiService: TsApiService;
    constructor(tsApiService: TsApiService) {
        this.tsApiService = tsApiService;
    }

    async getSignatureHelp(
        document: Document,
        position: Position,
        context: SignatureHelpContext | undefined,
        cancellationToken?: CancellationToken
    ): Promise<SignatureHelp | null> {
        const tsDoc = this.tsApiService.getDocumentSnapshot(document);
        if (!tsDoc) {
            return null;
        }

        const info = await this.tsApiService.sendRequest(
            SignatureHelpRequest.type,
            {
                textDocument: { uri: document.uri },
                position: tsDoc.getGeneratedPosition(position),
                context
            },
            cancellationToken
        );

        if (
            !info ||
            info.signatures.some((signature) => this.isInSvelte2tsxGeneratedFunction(signature))
        ) {
            return null;
        }

        return info;
    }

    private isInSvelte2tsxGeneratedFunction(signatureHelpItem: SignatureInformation) {
        return signatureHelpItem.label.includes('__sveltets');
    }
}
