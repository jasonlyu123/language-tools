import { Position, Range, TextDocument, TextDocumentChangeEvent, TextDocumentContentChangeEvent } from 'vscode-languageserver';
import { getLineOffsets, offsetAt, positionAt } from './utils';

/**
 * Represents a textual document.
 */
export abstract class ReadableDocument implements TextDocument {
    /**
     * Get the text content of the document
     */
    abstract getText(range?: Range): string;

    /**
     * Returns the url of the document
     */
    abstract getURL(): string;

    /**
     * Returns the file path if the url scheme is file
     */
    abstract getFilePath(): string | null;

    /**
     * Current version of the document.
     */
    public version = 0;

    /**
     * Should be cleared when there's an update to the text
     */
    protected lineOffsets?: number[];

    /**
     * Get the length of the document's content
     */
    getTextLength(): number {
        return this.getText().length;
    }

    /**
     * Get the line and character based on the offset
     * @param offset The index of the position
     */
    positionAt(offset: number): Position {
        return positionAt(offset, this.getText(), this.getLineOffsets());
    }

    /**
     * Get the index of the line and character position
     * @param position Line and character position
     */
    offsetAt(position: Position): number {
        return offsetAt(position, this.getText(), this.getLineOffsets());
    }

    private getLineOffsets() {
        if (!this.lineOffsets) {
            this.lineOffsets = getLineOffsets(this.getText());
        }
        return this.lineOffsets;
    }

    /**
     * Implements TextDocument
     */
    get uri(): string {
        return this.getURL();
    }

    get lineCount(): number {
        return this.getText().split(/\r?\n/).length;
    }

    abstract languageId: string;
}
