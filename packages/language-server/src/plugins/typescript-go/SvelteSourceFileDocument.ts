import { internalHelpers } from 'svelte2tsx';
import { Position, Range } from 'vscode-languageserver';
import { Document } from '../../lib/documents';
import type { SvelteNode, TemplateNode } from '../../plugins/svelte/features/svelte-ast-utils';
import { svelteNodeAt } from '../../plugins/svelte/features/svelte-ast-utils';
import { tsAst } from './types';

export interface MappedPosition {
    position: Position;
    fidelity: tsAst.SpanMapFidelity;
}

export interface MappedRange {
    range: Range;
    fidelity: tsAst.SpanMapFidelity;
}

export interface SourceFileDiagnosticHandler {
    getSourceFile(): tsAst.SourceFile;
    getText(start: number, end: number): string;
    getFullText(): string;
    svelteNodeAt(positionOrOffset: number | Position): SvelteNode | null;
    mapToOriginalRange(
        span: tsAst.ReadonlyTextRange,
        feature?: tsAst.SpanMapFeature
    ): MappedRange;
    mapToOriginalPos(
        position: number,
        feature?: tsAst.SpanMapFeature
    ): MappedPosition;
    svelteDocument: Document;
}

export class SvelteSourceFileDocument implements SourceFileDiagnosticHandler {
    private sourceFile: tsAst.SourceFile;
    svelteDocument: Document;
    private htmlAstCache: { ast: TemplateNode | null } | undefined;
    private tsAstModule: typeof tsAst;

    constructor(tsAstModule: typeof tsAst, sourceFile: tsAst.SourceFile, svelteDocument: Document) {
        this.tsAstModule = tsAstModule;
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

    getFullText(): string {
        return this.sourceFile.text;
    }

    mapToOriginalPos(position: number, feature?: tsAst.SpanMapFeature): MappedPosition {
        if (!this.sourceFile.spanMap) {
            return {
                position: this.svelteDocument.positionAt(position),
                fidelity: this.tsAstModule.SpanMapFidelity.Exact
            };
        }

        const mapped =
            feature == null
                ? this.sourceFile.spanMap.virtualToOriginalPosition(position)
                : this.sourceFile.spanMap.virtualToOriginalPositionForFeature(position, feature);

        return {
            position: this.svelteDocument.positionAt(mapped.position),
            fidelity: mapped.fidelity
        };
    }

    mapToOriginalRange(
        span: tsAst.ReadonlyTextRange,
        feature?: tsAst.SpanMapFeature
    ): MappedRange {
        if (!this.sourceFile.spanMap) {
            return {
                range: Range.create(
                    this.svelteDocument.positionAt(span.pos),
                    this.svelteDocument.positionAt(span.end)
                ),
                fidelity: this.tsAstModule.SpanMapFidelity.Exact
            };
        }

        const mapped =
            feature == null
                ? this.sourceFile.spanMap.virtualToOriginalSpan(span)
                : this.sourceFile.spanMap.virtualToOriginalSpanForFeature(span, feature);

        return {
            range: Range.create(
                this.svelteDocument.positionAt(mapped.range.pos),
                this.svelteDocument.positionAt(mapped.range.end)
            ),
            fidelity: mapped.fidelity
        };
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
