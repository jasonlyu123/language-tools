import {
    CancellationToken,
    DocumentDiagnosticReport,
    PrepareRenameResult,
    SignatureHelpContext
} from 'vscode-languageserver-protocol';
import {
    CodeLens,
    DefinitionLink,
    Diagnostic,
    DocumentHighlight,
    FoldingRange,
    Hover,
    InlayHint,
    Location,
    Position,
    Range,
    ReferenceContext,
    SelectionRange,
    SignatureHelp,
    WorkspaceEdit
} from 'vscode-languageserver-types';
import { Document } from '../../lib/documents';
import { LSConfigManager } from '../../ls-config';
import { Plugin } from '../interfaces';
import { TsGoCodeLensProvider } from './features/CodeLensProvider';
import { TsGoDefinitionsProvider } from './features/DefinitionsProvider';
import { TsGoDiagnosticsProvider } from './features/DiagnosticsProvider';
import { TsGoDocumentHighlightProvider } from './features/DocumentHighlightProvider';
import { TsGoFindComponentReferencesProvider } from './features/FindComponentReferencesProvider';
import { TsGoFindReferencesProvider } from './features/FindReferencesProvider';
import { TsGoFoldingRangeProvider } from './features/FoldingRangeProvider';
import { TsGoHoverProvider } from './features/HoverProvider';
import { TsGoInlayHintProvider } from './features/InlayHintProvider';
import { TsGoRenameProvider } from './features/RenameProvider';
import { TsGoSelectionRangeProvider } from './features/SelectionRangeProvider';
import { TsGoSignatureHelpProvider } from './features/SignatureHelpProvider';
import { TsApiService } from './lspService';

export class TypeScriptGoPlugin implements Plugin {
    __name = 'typescript';
    private readonly lspService: TsApiService;
    private readonly codeLensProvider: TsGoCodeLensProvider;
    private readonly definitionsProvider: TsGoDefinitionsProvider;
    private readonly diagnosticsProvider: TsGoDiagnosticsProvider;
    private readonly documentHighlightProvider: TsGoDocumentHighlightProvider;
    private readonly findComponentReferencesProvider: TsGoFindComponentReferencesProvider;
    private readonly findReferencesProvider: TsGoFindReferencesProvider;
    private readonly foldingRangeProvider: TsGoFoldingRangeProvider;
    private readonly hoverProvider: TsGoHoverProvider;
    private readonly inlayHintProvider: TsGoInlayHintProvider;
    private readonly renameProvider: TsGoRenameProvider;
    private readonly selectionRangeProvider: TsGoSelectionRangeProvider;
    private readonly signatureHelpProvider: TsGoSignatureHelpProvider;

    constructor(lspService: TsApiService, lsConfigManager: LSConfigManager) {
        this.lspService = lspService;
        this.codeLensProvider = new TsGoCodeLensProvider(lspService, lsConfigManager);
        this.definitionsProvider = new TsGoDefinitionsProvider(lspService);
        this.diagnosticsProvider = new TsGoDiagnosticsProvider(lspService);
        this.documentHighlightProvider = new TsGoDocumentHighlightProvider(lspService);
        this.findComponentReferencesProvider = new TsGoFindComponentReferencesProvider(lspService);
        this.findReferencesProvider = new TsGoFindReferencesProvider(
            lspService,
            this.findComponentReferencesProvider
        );
        this.foldingRangeProvider = new TsGoFoldingRangeProvider(lspService, lsConfigManager);
        this.hoverProvider = new TsGoHoverProvider(lspService);
        this.inlayHintProvider = new TsGoInlayHintProvider(lspService);
        this.renameProvider = new TsGoRenameProvider(lspService);
        this.selectionRangeProvider = new TsGoSelectionRangeProvider(lspService);
        this.signatureHelpProvider = new TsGoSignatureHelpProvider(lspService);
    }

    getCodeLens(document: Document): Promise<CodeLens[] | null> {
        return this.codeLensProvider.getCodeLens(document);
    }

    resolveCodeLens(
        document: Document,
        codeLensToResolve: CodeLens,
        cancellationToken?: CancellationToken
    ): Promise<CodeLens> {
        return this.codeLensProvider.resolveCodeLens(
            document,
            codeLensToResolve,
            cancellationToken
        );
    }

    getDefinitions(document: Document, position: Position): Promise<DefinitionLink[]> {
        return this.definitionsProvider.getDefinitions(document, position);
    }

    getDiagnostics(document: Document): Promise<Diagnostic[]> {
        return this.diagnosticsProvider.getDiagnostics(document);
    }

    getDiagnosticsForPullMode(
        document: Document,
        previousResultId?: string,
        cancellationToken?: CancellationToken
    ): Promise<DocumentDiagnosticReport> {
        return this.diagnosticsProvider.getDiagnosticsForPullMode(
            document,
            previousResultId,
            cancellationToken
        );
    }

    findDocumentHighlight(
        document: Document,
        position: Position
    ): Promise<DocumentHighlight[] | null> {
        return this.documentHighlightProvider.findDocumentHighlight(document, position);
    }

    async findComponentReferences(uri: string): Promise<Location[] | null> {
        return this.findComponentReferencesProvider.findComponentReferences(uri);
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

    getFoldingRanges(document: Document): Promise<FoldingRange[]> {
        return this.foldingRangeProvider.getFoldingRanges(document);
    }

    doHover(document: Document, position: Position): Promise<Hover | null> {
        return this.hoverProvider.doHover(document, position);
    }

    getInlayHints(
        document: Document,
        range: Range,
        cancellationToken?: CancellationToken
    ): Promise<InlayHint[] | null> {
        return this.inlayHintProvider.getInlayHints(document, range, cancellationToken);
    }

    prepareRename(document: Document, position: Position): Promise<PrepareRenameResult | null> {
        return this.renameProvider.prepareRename(document, position);
    }

    rename(
        document: Document,
        position: Position,
        newName: string,
        cancellationToken?: CancellationToken
    ): Promise<WorkspaceEdit | null> {
        return this.renameProvider.rename(document, position, newName, cancellationToken);
    }

    getSelectionRange(document: Document, position: Position): Promise<SelectionRange | null> {
        return this.selectionRangeProvider.getSelectionRange(document, position);
    }

    getSignatureHelp(
        document: Document,
        position: Position,
        context: SignatureHelpContext | undefined,
        cancellationToken?: CancellationToken
    ): Promise<SignatureHelp | null> {
        return this.signatureHelpProvider.getSignatureHelp(
            document,
            position,
            context,
            cancellationToken
        );
    }
}
