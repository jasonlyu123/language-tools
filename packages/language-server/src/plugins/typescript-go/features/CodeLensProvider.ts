import { CancellationToken, CodeLens, CodeLensRequest, CodeLensResolveRequest, Location } from 'vscode-languageserver-protocol';
import { Document, mapLocationToOriginal, mapRangeToGenerated, mapRangeToOriginal } from '../../../lib/documents';
import { TsApiService } from '../lspService';
import { CodeLensProvider } from '../../interfaces';

export class TsGoCodeLensProvider implements CodeLensProvider {
    private readonly tsApiService: TsApiService;

    constructor(tsApiService: TsApiService) {
        this.tsApiService = tsApiService;
    }

    async getCodeLens(document: Document): Promise<CodeLens[] | null> {
        const tsDoc = this.tsApiService.getDocumentSnapshot(document);
        if (!tsDoc) {
            return null;
        }

        const res = await this.tsApiService.sendRequest(CodeLensRequest.type, {
            textDocument: { uri: document.uri }
        });

        if (!res) {
            return null;
        }

        return res
            .map((codeLens) => ({
                ...codeLens,
                range: mapRangeToOriginal(tsDoc, codeLens.range)
                // data: {
                //     type: codeLens.data.type,
                //     uri: document.uri
                // }
            }))
            .filter((codeLens) => codeLens.range.start.line >= 0 && codeLens.range.end.line >= 0);
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
    
            const res = await this.tsApiService.sendRequest(
                CodeLensResolveRequest.type,
                {
                    ...codeLensToResolve,
                    range: mapRangeToGenerated(tsDoc, codeLensToResolve.range)
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
    
            return {
                ...codeLensToResolve,
                command: {
                    command: res.command.command,
                    title: res.command.title,
                    arguments: [
                        commandArgs[0],
                        commandArgs[1],
                        (commandArgs[2] as Location[])
                            .map((loc) => {
                                const mapped = mapLocationToOriginal(tsDoc, loc.range);
                                return {
                                    uri: mapped.uri,
                                    range: mapped.range
                                };
                            })
                            .filter((loc) => loc.range.start.line >= 0 && loc.range.end.line >= 0)
                    ]
                }
            };
        }
}
