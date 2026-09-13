import { getLineOffsets, positionAt } from '../../lib/documents';
import type { tsAst } from './types';

export class SpanMapDocument {
    private readonly sourceFile: tsAst.SourceFile;
    private originalCodeLineOffsets: number[] | undefined;

    constructor(sourceFile: tsAst.SourceFile) {
        this.sourceFile = sourceFile;
    }

    private getOriginalLineOffsets() {
        if (!this.originalCodeLineOffsets) {
            this.originalCodeLineOffsets = getLineOffsets(this.sourceFile.originalText);
        }
        return this.originalCodeLineOffsets;
    }

    positionAt(offset: number) {
        return positionAt(offset, this.sourceFile.originalText, this.getOriginalLineOffsets());
    }
}
