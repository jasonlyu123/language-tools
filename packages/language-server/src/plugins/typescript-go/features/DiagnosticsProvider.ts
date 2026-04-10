import { Diagnostic } from 'vscode-languageserver-types';
import { Document, mapRangeToOriginal } from '../../../lib/documents';
import { DiagnosticsProvider } from '../../interfaces';
import {
    CancellationToken,
    DocumentDiagnosticReport,
    DocumentDiagnosticRequest,
    RelatedFullDocumentDiagnosticReport
} from 'vscode-languageserver-protocol';
import { TsApiService } from '../lspService';
import { DocumentSnapshot } from '../../typescript/DocumentSnapshot';

export class TsGoDiagnosticsProvider implements DiagnosticsProvider {
    private readonly tsApiService: TsApiService;

    private lastDiagnostics: Map<string, Diagnostic[]> = new Map();

    constructor(tsApiService: TsApiService) {
        this.tsApiService = tsApiService;
    }

    async getDiagnostics(
        document: Document,
        cancellationToken?: CancellationToken
    ): Promise<Diagnostic[]> {
        const tsDoc = this.tsApiService.getDocumentSnapshot(document);
        if (!tsDoc) {
            return [];
        }
        const res = await this.tsApiService.sendRequest(
            DocumentDiagnosticRequest.type,
            {
                textDocument: { uri: document.uri }
            },
            cancellationToken
        );
        if (res.kind !== 'full') {
            return this.lastDiagnostics.get(document.uri) || [];
        }

        const result = this.convertDiagnostics(res, tsDoc);
        this.lastDiagnostics.set(document.uri, result);
        return result;
    }

    private convertDiagnostics(res: RelatedFullDocumentDiagnosticReport, tsDoc: DocumentSnapshot) {
        return res.items
            .map((item) => ({
                ...item,
                range: mapRangeToOriginal(tsDoc, item.range)
            }))
            .filter((item) => item.range.start.line >= 0 && item.range.end.line >= 0);
    }

    async getDiagnosticsForPullMode(
        document: Document,
        previousResultId?: string,
        cancellationToken?: CancellationToken
    ): Promise<DocumentDiagnosticReport> {
        const tsDoc = this.tsApiService.getDocumentSnapshot(document);
        if (!tsDoc) {
            return { kind: 'full', items: [] };
        }
        const res = await this.tsApiService.sendRequest(
            DocumentDiagnosticRequest.type,
            {
                textDocument: { uri: document.uri },
                previousResultId
            },
            cancellationToken
        );

        if (res.kind !== 'full') {
            return res;
        }

        const items = this.convertDiagnostics(res, tsDoc);
        return { kind: 'full', items };
    }
}
