import { DefinitionLink, Diagnostic, Hover, Position } from 'vscode-languageserver-types';
import { Document } from '../../lib/documents';
import { Plugin, Resolvable } from '../interfaces';
import { TsApiService } from './lspService';

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
}