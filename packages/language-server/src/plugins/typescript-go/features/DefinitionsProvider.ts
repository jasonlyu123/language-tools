import { DefinitionLink, LocationLink, Position } from 'vscode-languageserver-types';
import { DefinitionsProvider } from '../../interfaces';
import { TsApiService } from '../lspService';
import {
    Document,
    mapLocationToOriginal,
    mapRangeToOriginal,
    mapRangeToOriginalFallbackStartOfFile
} from '../../../lib/documents';
import { DefinitionRequest } from 'vscode-languageserver-protocol';
import { pathToUrl, isNotNullOrUndefined } from '../../../utils';

export class TsGoDefinitionsProvider implements DefinitionsProvider {
    private readonly tsApiService: TsApiService;

    constructor(tsApiService: TsApiService) {
        this.tsApiService = tsApiService;
    }

    async getDefinitions(document: Document, position: Position): Promise<DefinitionLink[]> {
        const tsDoc = this.tsApiService.getDocumentSnapshot(document);
        if (!tsDoc) {
            return Promise.resolve([]);
        }

        const generatedPosition = tsDoc.getGeneratedPosition(position);
        const res = await this.tsApiService.sendRequest(DefinitionRequest.type, {
            textDocument: { uri: document.uri },
            position: generatedPosition
        });

        if (!res) {
            return [];
        }

        if (!Array.isArray(res)) {
            const location = mapLocationToOriginal(tsDoc, res.range);
            return [LocationLink.create(location.uri, location.range, location.range)];
        }

        const result: DefinitionLink[] = [];

        for (const link of res) {
            if (!LocationLink.is(link)) {
                if (link.uri.endsWith('.svelte')) {
                    const snapshot = this.tsApiService.getDocumentSnapshot(link.uri);
                    if (!snapshot) {
                        continue;
                    }

                    result.push(
                        LocationLink.create(
                            pathToUrl(snapshot.filePath),
                            mapRangeToOriginal(snapshot, link.range),
                            mapRangeToOriginal(snapshot, link.range)
                        )
                    );
                    continue;
                }
                result.push(LocationLink.create(link.uri, link.range, link.range));
                continue;
            }
            if (!link.targetUri.endsWith('.svelte')) {
                result.push(link);
                continue;
            }

            const targetSnapshot = this.tsApiService.getDocumentSnapshot(link.targetUri);
            if (!targetSnapshot) {
                continue;
            }
            const targetRange = {
                uri: pathToUrl(targetSnapshot.filePath),
                range: mapRangeToOriginalFallbackStartOfFile(targetSnapshot, link.targetRange)
            };
            const originSelectionRange = link.originSelectionRange
                ? mapRangeToOriginal(tsDoc, link.originSelectionRange)
                : undefined;
            const targetSelectionRange = mapRangeToOriginalFallbackStartOfFile(
                targetSnapshot,
                link.targetSelectionRange
            );
            result.push(
                LocationLink.create(
                    targetRange.uri,
                    targetRange.range,
                    targetSelectionRange,
                    originSelectionRange
                )
            );
        }
    
        return result;
    }
}
