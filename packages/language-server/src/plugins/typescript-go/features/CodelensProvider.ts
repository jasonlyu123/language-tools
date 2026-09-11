import { TsApiService } from '../TsApiService';
import { CodeLensProvider, FindComponentReferencesProvider } from '../../interfaces';
import { CancellationToken } from 'vscode-languageserver-protocol';
import { CodeLens, Location } from 'vscode-languageserver-types';
import { Document } from '../../../lib/documents';
import { LSConfigManager } from '../../../ls-config';

export class TsGoCodelensProvider implements CodeLensProvider {
    private readonly tsApiService: TsApiService;
    private readonly configManager: LSConfigManager;

    constructor(tsApiService: TsApiService, configManager: LSConfigManager) {
        this.tsApiService = tsApiService;
        this.configManager = configManager;
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
}
