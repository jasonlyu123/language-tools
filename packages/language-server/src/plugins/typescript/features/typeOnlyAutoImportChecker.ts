import ts from 'typescript';
import { Document } from '../../../lib/documents';
import { SvelteSnapshotFragment } from '../DocumentSnapshot';

export function createTypeOnlyAutoImportChecker(
    lang: ts.LanguageService,
    document: Document,
    fragment: SvelteSnapshotFragment
): (change: ts.TextChange) => ts.TextChange {
    return (v) => v;
}
