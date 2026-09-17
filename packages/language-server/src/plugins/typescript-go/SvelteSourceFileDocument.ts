import { Position } from 'vscode-languageserver';
import type { SvelteNode, TemplateNode } from '../../plugins/svelte/features/svelte-ast-utils';
import { svelteNodeAt } from '../../plugins/svelte/features/svelte-ast-utils';
import { Document } from '../../lib/documents';
import { tsAst } from './types';
import { internalHelpers } from 'svelte2tsx';

export class SvelteSourceFileDocument {
    private sourceFile: tsAst.SourceFile;
    svelteDocument: Document;
    private htmlAstCache: { ast: TemplateNode | null } | undefined;

    constructor(sourceFile: tsAst.SourceFile, svelteDocument: Document) {
        this.sourceFile = sourceFile;
        this.svelteDocument = svelteDocument;
    }

    getSourceFile(): tsAst.SourceFile {
        return this.sourceFile;
    }

    svelteNodeAt(positionOrOffset: number | Position): SvelteNode | null {
        const templateAst = this.getTemplateAst();
        if (!templateAst) {
            return null;
        }

        const offset =
            typeof positionOrOffset === 'number'
                ? positionOrOffset
                : this.svelteDocument.offsetAt(positionOrOffset);

        return svelteNodeAt(templateAst, offset);
    }

    getText(start: number, end: number): string {
        return this.sourceFile.text.slice(start, end);
    }

    private getTemplateAst() {
        if (!this.htmlAstCache) {
            this.htmlAstCache = { ast: this.loadTemplateAst() };
        }
        return this.htmlAstCache.ast;
    }

    private loadTemplateAst() {
        try {
            return internalHelpers.parseTemplateOnly(this.svelteDocument.getText(), {
                parse: this.svelteDocument.compiler.parse,
                emitOnTemplateError: true,
                svelte5Plus: this.svelteDocument.isSvelte5
            }) as TemplateNode;
        } catch (error) {
            return null;
        }
    }
}
