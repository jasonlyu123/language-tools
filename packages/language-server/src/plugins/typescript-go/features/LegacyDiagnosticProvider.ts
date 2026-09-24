import { Position, Range } from 'vscode-languageserver-types';
import { mapRangeToOriginal } from '../../../lib/documents';
import { SvelteNode } from '../../svelte/features/svelte-ast-utils';
import { SvelteDocumentSnapshot } from '../../typescript/DocumentSnapshot';
import { SourceFileDiagnosticHandler } from '../SvelteSourceFileDocument';
import { tsAst } from '../types';

export class SvelteSnapshotDiagnosticsHandler implements SourceFileDiagnosticHandler {
    private tsAstModule: typeof tsAst;
    private tsDoc: SvelteDocumentSnapshot;
    private sourceFile: tsAst.SourceFile;

    constructor(
        tsAstModule: typeof tsAst,
        snapshot: SvelteDocumentSnapshot,
        sourceFile: tsAst.SourceFile
    ) {
        this.tsAstModule = tsAstModule;
        this.tsDoc = snapshot;
        this.sourceFile = sourceFile;
    }
    get svelteDocument() {
        return this.tsDoc.parent;
    }

    getSourceFile(): tsAst.SourceFile {
        return this.sourceFile;
    }

    getText(start: number, end: number): string {
        return this.tsDoc.getText(start, end);
    }

    getFullText(): string {
        return this.tsDoc.getFullText();
    }

    svelteNodeAt(positionOrOffset: number | Position): SvelteNode | null {
        return this.tsDoc.svelteNodeAt(positionOrOffset);
    }

    mapToOriginalRange(span: tsAst.ReadonlyTextRange) {
        const range = mapRangeToOriginal(
            this.tsDoc,
            Range.create(this.tsDoc.positionAt(span.pos), this.tsDoc.positionAt(span.end))
        );

        return {
            range,
            fidelity:
                range.start.line < 0
                    ? this.tsAstModule.SpanMapFidelity.None
                    : this.tsAstModule.SpanMapFidelity.Exact
        };
    }

    mapToOriginalPos(position: number) {
        const offset = this.tsDoc.positionAt(position);
        return {
            position: offset,
            fidelity:
                offset.line < 0
                    ? this.tsAstModule.SpanMapFidelity.None
                    : this.tsAstModule.SpanMapFidelity.Exact
        };
    }
}
