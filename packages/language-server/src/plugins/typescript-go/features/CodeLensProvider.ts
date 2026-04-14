import {
    CancellationToken,
    CodeLens,
    CodeLensRequest,
    CodeLensResolveRequest,
    Location,
    Position,
    Range
} from 'vscode-languageserver-protocol';
import {
    Document,
    mapLocationToOriginal,
    mapRangeToGenerated,
    mapRangeToOriginal
} from '../../../lib/documents';
import { TsApiService } from '../lspService';
import { CodeLensProvider } from '../../interfaces';
import { hasNonNegativeRange } from './utils';
import { offsetOfGeneratedComponentExport } from '../../typescript/utils';
import { SvelteDocumentSnapshot } from '../../typescript/DocumentSnapshot';
import { LSConfigManager } from '../../../ls-config';
import { TsGoFindComponentReferencesProvider } from './FindComponentReferencesProvider';

export class TsGoCodeLensProvider implements CodeLensProvider {
    private readonly tsApiService: TsApiService;
    private readonly lsConfigManager: LSConfigManager;

    constructor(tsApiService: TsApiService, lsConfigManager: LSConfigManager) {
        this.tsApiService = tsApiService;
        this.lsConfigManager = lsConfigManager;
    }

    async getCodeLens(document: Document): Promise<CodeLens[] | null> {
        const tsDoc = this.tsApiService.getDocumentSnapshot(document);
        if (!tsDoc) {
            return null;
        }

        // TODO check if tsgo starts to differentiate between js and ts preferences.
        const config = this.lsConfigManager.getClientTsUserConfig('typescript');
        if (!config.referencesCodeLens?.enabled || !config.implementationsCodeLens?.enabled) {
            return null;
        }

        const res = await this.tsApiService.sendRequest(CodeLensRequest.type, {
            textDocument: { uri: document.uri }
        });

        if (!res) {
            return null;
        }

        if (!res.length) {
            return [];
        }

        const result = res
            .map((codeLens) => ({
                ...codeLens,
                range: mapRangeToOriginal(tsDoc, codeLens.range)
                // data: {
                //     type: codeLens.data.type,
                //     uri: document.uri
                // }
            }))
            .filter(hasNonNegativeRange);

        if (config.referencesCodeLens?.enabled) {
            result.push({
                range: { start: Position.create(0, 0), end: Position.create(0, 1) },
                data: {
                    kind: 'references',
                    uri: document.uri
                }
            });
        }
        return result;
    }

    async resolveCodeLens(
        document: Document,
        codeLensToResolve: CodeLens,
        cancellationToken?: CancellationToken
    ): Promise<CodeLens> {
        const tsDoc = this.tsApiService.getDocumentSnapshot(document);
        if (!tsDoc || !codeLensToResolve.data?.kind) {
            return codeLensToResolve;
        }

        const isComponentReferencesCodeLens =
            codeLensToResolve.data.kind === 'references' &&
            codeLensToResolve.range.start.line === 0 &&
            codeLensToResolve.range.start.character === 0;

        const res = await this.tsApiService.sendRequest(
            CodeLensResolveRequest.type,
            {
                ...codeLensToResolve,
                range: isComponentReferencesCodeLens
                    ? this.getComponentCodeLensPos(tsDoc)
                    : mapRangeToGenerated(tsDoc, codeLensToResolve.range)
            },
            cancellationToken
        );

        if (!res.command || (res.command.arguments && res.command.arguments.length !== 3)) {
            return codeLensToResolve;
        }

        const commandArgs = res.command.arguments;
        if (!commandArgs) {
            return {
                ...codeLensToResolve,
                command: {
                    command: res.command.command,
                    title: res.command.title
                }
            };
        }

        const locations = commandArgs[2] as Location[];
        let originalLocations = locations
            .map((loc) => mapLocationToOriginal(tsDoc, loc.range))
            .filter(hasNonNegativeRange);

        if (isComponentReferencesCodeLens) {
            originalLocations = originalLocations.filter(
                (loc) => !TsGoFindComponentReferencesProvider.isEndTag(loc.range, tsDoc)
            );
        }

        return {
            ...codeLensToResolve,
            command: {
                command: res.command.command,
                title: res.command.title.replace(
                    locations.length.toString(),
                    originalLocations.length.toString()
                ),
                arguments: [commandArgs[0], commandArgs[1], originalLocations]
            }
        };
    }

    private getComponentCodeLensPos(tsDoc: SvelteDocumentSnapshot): Range {
        const offset = offsetOfGeneratedComponentExport(tsDoc);
        const pos = tsDoc.positionAt(offset);

        return {
            start: pos,
            end: pos
        };
    }
}
