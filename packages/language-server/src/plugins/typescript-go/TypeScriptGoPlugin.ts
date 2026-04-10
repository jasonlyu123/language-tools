import {
    CodeLens,
    DefinitionLink,
    Diagnostic,
    Hover,
    Location,
    Position,
    Range,
    ReferenceContext,
    WorkspaceEdit
} from 'vscode-languageserver-types';
import { Document } from '../../lib/documents';
import { Plugin, Resolvable } from '../interfaces';
import { TsApiService } from './lspService';
import { CancellationToken } from 'vscode-languageserver-protocol';
import { TsGoHoverProvider } from './features/HoverProvider';
import { TsGoDefinitionsProvider } from './features/DefinitionsProvider';
import { TsGoDiagnosticsProvider } from './features/DiagnosticsProvider';
import { TsGoCodeLensProvider } from './features/CodeLensProvider';
import { TsGoFindReferencesProvider } from './features/FindReferencesProvider';
import { TsGoRenameProvider } from './features/RenameProvider';

export class TypeScriptGoPlugin implements Plugin {
    __name = 'typescript';
    private readonly lspService: TsApiService;
    private readonly hoverProvider: TsGoHoverProvider;
    private readonly definitionsProvider: TsGoDefinitionsProvider;
    private readonly diagnosticsProvider: TsGoDiagnosticsProvider;
    private readonly codeLensProvider: TsGoCodeLensProvider;
    private readonly findReferencesProvider: TsGoFindReferencesProvider;
    private readonly renameProvider: TsGoRenameProvider;

    constructor(lspService: TsApiService) {
        this.lspService = lspService;
        this.hoverProvider = new TsGoHoverProvider(lspService);
        this.definitionsProvider = new TsGoDefinitionsProvider(lspService);
        this.diagnosticsProvider = new TsGoDiagnosticsProvider(lspService);
        this.codeLensProvider = new TsGoCodeLensProvider(lspService);
        this.findReferencesProvider = new TsGoFindReferencesProvider(lspService);
        this.renameProvider = new TsGoRenameProvider(lspService);
    }
    getDiagnostics(document: Document): Resolvable<Diagnostic[]> {
        return this.diagnosticsProvider.getDiagnostics(document);
    }

    doHover(document: Document, position: Position): Resolvable<Hover | null> {
        return this.hoverProvider.doHover(document, position);
    }

    getDefinitions(document: Document, position: Position): Resolvable<DefinitionLink[]> {
        return this.definitionsProvider.getDefinitions(document, position);
    }

    getCodeLens(document: Document): Resolvable<CodeLens[] | null> {
        return this.codeLensProvider.getCodeLens(document);
    }

    resolveCodeLens(
        document: Document,
        codeLensToResolve: CodeLens,
        cancellationToken?: CancellationToken
    ): Resolvable<CodeLens> {
        return this.codeLensProvider.resolveCodeLens(
            document,
            codeLensToResolve,
            cancellationToken
        );
    }

    async findReferences(
        document: Document,
        position: Position,
        context: ReferenceContext,
        cancellationToken?: CancellationToken
    ): Promise<Location[] | null> {
        return this.findReferencesProvider.findReferences(
            document,
            position,
            context,
            cancellationToken
        );
    }

    async prepareRename(document: Document, position: Position): Promise<Range | null> {
        return this.renameProvider.prepareRename(document, position);
    }

    async rename(
        document: Document,
        position: Position,
        newName: string,
        cancellationToken?: CancellationToken
    ): Promise<WorkspaceEdit | null> {
        return this.renameProvider.rename(document, position, newName, cancellationToken);
    }
}
