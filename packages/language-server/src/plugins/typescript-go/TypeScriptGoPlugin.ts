import { CancellationToken } from 'vscode-languageserver-protocol';
import { CodeLens, Location, TextDocumentIdentifier } from 'vscode-languageserver-types';
import { Document } from '../../lib/documents';
import { CodeLensProvider, FindComponentReferencesProvider } from '../interfaces';
import { TsApiService } from './TsApiService';

export class TypeScriptGoPlugin implements CodeLensProvider, FindComponentReferencesProvider {
    constructor(sendNotification: (v: string) => void) {
        this.sendNotification = sendNotification;
    }

    __name = 'tsgo';

    private apiService: TsApiService | null = null;
    private pendingProjectCheck: string[] = [];
    private sendNotification: (v: string) => void;

    async setupApiService(pipe: string) {
        this.apiService = await TsApiService.create(pipe);
        for (const uri of this.pendingProjectCheck) {
            this.checkAndNotifyProjectStatus(uri, this.apiService!);
        }
        this.pendingProjectCheck = [];
    }

    checkProjectStatus(identifier: TextDocumentIdentifier) {
        if (!this.apiService) {
            this.pendingProjectCheck.push(identifier.uri);
            return;
        }
        this.checkAndNotifyProjectStatus(identifier.uri, this.apiService!);
    }

    private async checkAndNotifyProjectStatus(uri: string, apiService: TsApiService) {
        const projectStatus = await apiService.fileProjectStatus(uri);
        if (!projectStatus) {
            this.sendNotification(
                `File ${uri} doesn't belongs to any projects with content-mapper setup,\n language features may not be available.`
            );
        }
        // this.sendNotification(`File ${uri} project : ${projectStatus}`);
    }

    getCodeLens(document: Document): Promise<CodeLens[] | null> {
        throw new Error('Method not implemented.');
    }

    resolveCodeLens(
        textDocument: Document,
        codeLensToResolve: CodeLens,
        cancellationToken?: CancellationToken
    ): Promise<CodeLens> {
        throw new Error('Method not implemented.');
    }

    findComponentReferences(uri: string): Promise<Location[] | null> {
        throw new Error('Method not implemented.');
    }
}
