import { Range } from 'vscode-languageserver-types';
import { SvelteDocumentSnapshot } from '../../typescript/DocumentSnapshot';

export function rangeHasNegativeLines(range: Range): boolean {
    return range.start.line < 0 || range.end.line < 0;
}

export function locationHasNegativeLines(location: { range: Range }): boolean {
    return rangeHasNegativeLines(location.range);
}

export function hasNonNegativeRange(location: { range: Range }): boolean {
    return !locationHasNegativeLines(location);
}

export function isSvelteFilePath(filePath: string): boolean {
    return filePath.endsWith('.svelte');
}
