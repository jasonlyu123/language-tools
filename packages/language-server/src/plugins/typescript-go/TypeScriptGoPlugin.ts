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

export class TypeScriptGoPlugin implements Plugin {
    __name = 'typescript';
    private readonly lspService: TsApiService;

    constructor(lspService: TsApiService) {
        this.lspService = lspService;
    }
    getDiagnostics(document: Document): Resolvable<Diagnostic[]> {
        return this.lspService.getDiagnostics(document);
    }

    doHover(document: Document, position: Position): Resolvable<Hover | null> {
        return this.lspService.doHover(document, position);
    }

    getDefinitions(document: Document, position: Position): Resolvable<DefinitionLink[]> {
        return this.lspService.getDefinitions(document, position);
    }

    getCodeLens(document: Document): Resolvable<CodeLens[] | null> {
        return this.lspService.getCodeLens(document);
    }

    resolveCodeLens(
        document: Document,
        codeLensToResolve: CodeLens,
        cancellationToken?: CancellationToken
    ): Resolvable<CodeLens> {
        return this.lspService.resolveCodeLens(document, codeLensToResolve, cancellationToken);
    }

    async findReferences(
        document: Document,
        position: Position,
        context: ReferenceContext,
        cancellationToken?: CancellationToken
    ): Promise<Location[] | null> {
        return this.lspService.findReferences(document, position, context, cancellationToken);
    }

    async prepareRename(document: Document, position: Position): Promise<Range | null> {
        return this.lspService.prepareRename(document, position);
    }

    async rename(
        document: Document,
        position: Position,
        newName: string,
        cancellationToken?: CancellationToken
    ): Promise<WorkspaceEdit | null> {
        return this.lspService.rename(document, position, newName, cancellationToken);
    }
}
