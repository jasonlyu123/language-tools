import { CancellationToken } from 'vscode-languageserver-protocol';
import { CodeLens, Location, TextDocumentIdentifier } from 'vscode-languageserver-types';
import { Document } from '../../lib/documents';
import { CodeLensProvider, FindComponentReferencesProvider } from '../interfaces';
import { TsApiService } from './TsApiService';
import { TsGoComponentReferenceProvider } from './features/FindComponentReferencesProvider';

export class TypeScriptGoPlugin implements CodeLensProvider, FindComponentReferencesProvider {
    constructor(sendNotification: (v: string) => void, apiService: TsApiService) {
        this.sendNotification = sendNotification;
        this.apiService = apiService;
        this.findComponentReferencesProvider = new TsGoComponentReferenceProvider(apiService);
    }

    __name = 'tsgo';

    private readonly apiService: TsApiService;
    private readonly sendNotification: (v: string) => void;
    private readonly findComponentReferencesProvider: FindComponentReferencesProvider;

    async checkProjectStatus(identifier: TextDocumentIdentifier) {
        const uri = identifier.uri;
        const projectStatus = await this.apiService.fileProjectStatus(uri);
        if (!projectStatus) {
            this.sendNotification(
                `File ${uri} doesn't belongs to any projects with content-mapper setup,\n language features may not be available.`
            );
        }
        // this.sendNotification(`File ${uri} project : ${projectStatus}`);
    }

    getCodeLens(document: Document): Promise<CodeLens[] | null> {
        return Promise.resolve(null);
    }

    resolveCodeLens(
        textDocument: Document,
        codeLensToResolve: CodeLens,
        cancellationToken?: CancellationToken
    ): Promise<CodeLens> {
        return Promise.resolve(codeLensToResolve);
        // throw new Error('Method not implemented.');
    }

    findComponentReferences(uri: string): Promise<Location[] | null> {
        return this.findComponentReferencesProvider.findComponentReferences(uri);
    }
}
