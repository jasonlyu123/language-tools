import { Position, Range, SelectionRange, SelectionRangeRequest } from 'vscode-languageserver';
import { Document, isInTag, mapRangeToOriginal } from '../../../lib/documents';
import { SelectionRangeProvider } from '../../interfaces';
import { SvelteDocumentSnapshot } from '../../typescript/DocumentSnapshot';
import { checkRangeMappingWithGeneratedSemi } from '../../typescript/features/utils';
import { TsApiService } from '../lspService';

export class TsGoSelectionRangeProvider implements SelectionRangeProvider {
    private readonly tsApiService: TsApiService;
    constructor(tsApiService: TsApiService) {
        this.tsApiService = tsApiService;
    }

    async getSelectionRange(
        document: Document,
        position: Position
    ): Promise<SelectionRange | null> {
        const tsDoc = this.tsApiService.getDocumentSnapshot(document);
        if (!tsDoc || isInTag(position, document.styleInfo)) {
            return null;
        }

        const generatedPosition = tsDoc.getGeneratedPosition(position);
        if (generatedPosition.line < 0) {
            return null;
        }
        const selectionRange = await this.tsApiService.sendRequest(SelectionRangeRequest.type, {
            textDocument: { uri: document.uri },
            positions: [generatedPosition]
        });
        if (!selectionRange?.length) {
            return null;
        }
        const singleSelectionRange = selectionRange[0];
        const mappedRange = this.mapSelectionRangeToParent(tsDoc, document, singleSelectionRange);

        return this.filterOutUnmappedRange(mappedRange);
    }

    private mapSelectionRangeToParent(
        tsDoc: SvelteDocumentSnapshot,
        document: Document,
        selectionRange: SelectionRange
    ): SelectionRange {
        const { range, parent } = selectionRange;
        const originalRange = mapRangeToOriginal(tsDoc, range);

        checkRangeMappingWithGeneratedSemi(originalRange, range, tsDoc);

        if (!parent) {
            return SelectionRange.create(originalRange);
        }

        return SelectionRange.create(
            originalRange,
            this.mapSelectionRangeToParent(tsDoc, document, parent)
        );
    }

    private filterOutUnmappedRange(selectionRange: SelectionRange): SelectionRange | null {
        const flattened = this.flattenAndReverseSelectionRange(selectionRange);
        const filtered = flattened.filter((range) => range.start.line > 0 && range.end.line > 0);
        if (!filtered.length) {
            return null;
        }

        let result: SelectionRange | undefined;

        for (const selectionRange of filtered) {
            result = SelectionRange.create(selectionRange, result);
        }

        return result ?? null;
    }

    /**
     *   flatten the selection range and its parent to an array in reverse order
     * so it's easier to filter out unmapped selection and create a new tree of
     * selection range
     */
    private flattenAndReverseSelectionRange(selectionRange: SelectionRange) {
        const result: Range[] = [];
        let current = selectionRange;

        while (current.parent) {
            result.unshift(current.range);
            current = current.parent;
        }

        return result;
    }
}
