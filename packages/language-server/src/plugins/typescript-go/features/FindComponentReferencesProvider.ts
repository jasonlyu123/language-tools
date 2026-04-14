import { ReferencesRequest } from 'vscode-languageserver-protocol';
import { Location, Position, Range } from 'vscode-languageserver-types';
import { mapRangeToOriginal } from '../../../lib/documents';
import { FindComponentReferencesProvider } from '../../interfaces';
import { DocumentSnapshot, SvelteDocumentSnapshot } from '../../typescript/DocumentSnapshot';
import { offsetOfGeneratedComponentExport } from '../../typescript/utils';
import { TsApiService } from '../lspService';
import { rangeHasNegativeLines } from './utils';

export class TsGoFindComponentReferencesProvider implements FindComponentReferencesProvider {
    constructor(tsApiService: TsApiService) {
        this.tsApiService = tsApiService;
    }

    private readonly tsApiService: TsApiService;

    async findComponentReferences(uri: string): Promise<Location[] | null> {
        const tsDoc = this.tsApiService.getDocumentSnapshot(uri);
        if (!tsDoc || !(tsDoc instanceof SvelteDocumentSnapshot)) {
            return null;
        }
        const targetPosition = offsetOfGeneratedComponentExport(tsDoc);
        if (!targetPosition) {
            return null;
        }

        const generatedPosition = tsDoc.positionAt(targetPosition);
        const references = await this.tsApiService.sendRequest(ReferencesRequest.type, {
            textDocument: { uri: uri },
            position: generatedPosition,
            context: { includeDeclaration: false }
        });

        if (!references) {
            return null;
        }

        const result: Location[] = [];

        for (const loc of references) {
            if (!loc.uri.endsWith('.svelte')) {
                result.push(loc);
                continue;
            }

            const snapshot = this.tsApiService.getDocumentSnapshot(loc.uri);
            if (!snapshot) {
                continue;
            }
            const mappedRange = mapRangeToOriginal(snapshot, loc.range);
            if (rangeHasNegativeLines(mappedRange)) {
                continue;
            }
            if (TsGoFindComponentReferencesProvider.isEndTag(mappedRange, snapshot)) {
                continue;
            }
            result.push(Location.create(loc.uri, mappedRange));
        }
        return result;
    }

    static isEndTag(range: Range, snapshot: DocumentSnapshot) {
        if (!(snapshot instanceof SvelteDocumentSnapshot)) {
            return false;
        }

        const testEndTagRange = Range.create(
            Position.create(range.start.line, range.start.character - 1),
            range.end
        );

        const text = snapshot.getOriginalText(testEndTagRange);
        if (text.substring(0, 1) == '/') {
            return true;
        }

        return false;
    }
}
