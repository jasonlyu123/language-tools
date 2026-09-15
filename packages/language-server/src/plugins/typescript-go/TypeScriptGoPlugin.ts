import { CancellationToken } from 'vscode-languageserver-protocol';
import { CodeLens, Location, Position, TextDocumentIdentifier } from 'vscode-languageserver-types';
import { Document } from '../../lib/documents';
import {
    CodeLensProvider,
    FindComponentReferencesProvider,
    FindReferencesProvider
} from '../interfaces';
import { TsApiService } from './TsApiService';
import { LSConfigManager } from '../../ls-config';
import { TsGoComponentReferenceProvider } from './features/FindComponentReferencesProvider';
import { TsGoCodelensProvider } from './features/CodelensProvider';

export class TypeScriptGoPlugin
    implements CodeLensProvider, FindComponentReferencesProvider, FindReferencesProvider
{
    constructor(
        sendNotification: (v: string) => void,
        apiService: TsApiService,
        configManager: LSConfigManager
    ) {
        this.sendNotification = sendNotification;
        this.apiService = apiService;
        const findComponentReferencesProvider = new TsGoComponentReferenceProvider(apiService);
        this.findComponentReferencesProvider = findComponentReferencesProvider;
        this.codelensProvider = new TsGoCodelensProvider(
            apiService,
            configManager,
            findComponentReferencesProvider
        );
    }

    __name = 'tsgo';

    private readonly apiService: TsApiService;
    private readonly sendNotification: (v: string) => void;
    private readonly findComponentReferencesProvider: FindComponentReferencesProvider;
    private readonly codelensProvider: CodeLensProvider;

    async checkProjectStatus(identifier: TextDocumentIdentifier) {
        const uri = identifier.uri;
        const projectStatus = await this.apiService.fileProjectStatus(uri);
        if (!projectStatus) {
            this.sendNotification(
                `File ${uri} doesn't belongs to any projects with content-mapper setup,\n language features may not be available.`
            );
        }
    }

    async getCodeLens(document: Document): Promise<CodeLens[] | null> {
        return this.codelensProvider.getCodeLens(document);
    }

    async resolveCodeLens(
        textDocument: Document,
        codeLensToResolve: CodeLens,
        cancellationToken?: CancellationToken
    ): Promise<CodeLens> {
        return this.codelensProvider.resolveCodeLens(
            textDocument,
            codeLensToResolve,
            cancellationToken
        );
    }

    findComponentReferences(uri: string): Promise<Location[] | null> {
        return this.findComponentReferencesProvider.findComponentReferences(uri);
    }

    async findReferences(document: Document, position: Position): Promise<Location[] | null> {
        if (this.isScriptStartOrEndTag(position, document)) {
            return this.findComponentReferences(document.uri);
        }

        return null;
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
