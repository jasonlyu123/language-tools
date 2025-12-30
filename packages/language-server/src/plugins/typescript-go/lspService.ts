import { ChildProcess, spawn } from 'node:child_process';
import fs from 'node:fs';
import {
    CancellationToken,
    CodeLens,
    CodeLensRequest,
    CodeLensResolveRequest,
    DefinitionLink,
    DefinitionRequest,
    Diagnostic,
    DidChangeConfigurationNotification,
    DidChangeTextDocumentNotification,
    DidChangeWatchedFilesNotification,
    DidChangeWatchedFilesRegistrationOptions,
    DidCloseTextDocumentNotification,
    DidOpenTextDocumentNotification,
    DocumentDiagnosticRequest,
    Hover,
    HoverRequest,
    InitializeParams,
    InitializeRequest,
    InitializeResult,
    InitializedNotification,
    Location,
    LocationLink,
    LogMessageNotification,
    MessageType,
    Position,
    PrepareRenameRequest,
    ProtocolConnection,
    ProtocolNotificationType,
    ProtocolRequestType,
    Range,
    ReferenceContext,
    ReferencesRequest,
    RegistrationRequest,
    RelativePattern,
    RenameRequest,
    TextEdit,
    WorkspaceEdit,
    WorkspaceFolder,
    createProtocolConnection
} from 'vscode-languageserver-protocol';
import { StreamMessageReader, StreamMessageWriter } from 'vscode-languageserver-protocol/node';
import { getPackageInfo, importSvelte } from '../../importPackage';
import {
    Document,
    DocumentManager,
    mapLocationToOriginal,
    mapRangeToGenerated,
    mapRangeToOriginal,
    mapRangeToOriginalFallbackStartOfFile
} from '../../lib/documents';
import { LSConfigManager } from '../../ls-config';
import {
    createGetCanonicalFileName,
    isNotNullOrUndefined,
    pathToUrl,
    urlToPath
} from '../../utils';
import {
    CodeLensProvider,
    DefinitionsProvider,
    DiagnosticsProvider,
    FindReferencesProvider,
    HoverProvider,
    LSProvider,
    RenameProvider,
    Resolvable
} from '../interfaces';
import { DocumentSnapshot, SvelteSnapshotOptions } from '../typescript/DocumentSnapshot';
// import { toVirtualSvelteFilePath } from '../typescript/utils';
import { dirname } from 'node:path';
import { internalHelpers } from 'svelte2tsx';
import ts, { ScriptKind } from 'typescript';
import { Logger } from '../../logger';

const toVirtualSvelteFilePath = (uri: string, kind: ScriptKind): string => {
    return uri /*+ (kind === ScriptKind.TS ? '.ts' : '.js')*/;
};

// export interface TsGoLSContext {
//     isSvelteCheck: boolean;
//     ambientTypesSource: string;
//     transformOnTemplateError: boolean;
//     reportConfigError: ((diagnostics: PublishDiagnosticsParams) => void) | undefined;
//     nonRecursiveWatchPattern: string | undefined;
//     tsModule: typeof tsApi
//     useCaseSensitiveFileNames: boolean;
//     tsFileSystem: tsFS.FileSystem;
// }

export interface TsApiServiceOptions {
    tsserverPath: string;
    lsConfigManager: LSConfigManager;
    docManager?: DocumentManager;
    isSvelteCheck?: boolean;
    serverInitializationOptions: Partial<InitializeParams> & {
        workspaceFolders: WorkspaceFolder[];
    };
    registerFileWatcher?: (pattern: DidChangeWatchedFilesRegistrationOptions) => void;
}

export interface ProjectContainer {
    host: LSProvider;
}

export class TsApiService
    implements
        DiagnosticsProvider,
        HoverProvider,
        DefinitionsProvider,
        CodeLensProvider,
        FindReferencesProvider,
        RenameProvider
{
    private readonly getCanonicalFileName: (fileName: string) => string;
    private readonly useCaseSensitiveFileNames: boolean;
    private readonly options: TsApiServiceOptions;
    private serverProcess: ChildProcess | null = null;
    private connection: ProtocolConnection | null = null;
    private initializePending: Promise<void> | null = null;
    private documentSnapshots: Map<string, DocumentSnapshot> = new Map();
    private readonly svelteTsPath: string;

    constructor(options: TsApiServiceOptions) {
        this.useCaseSensitiveFileNames =
            process.platform === 'win32' || !fs.existsSync(__filename.toUpperCase());
        this.getCanonicalFileName = createGetCanonicalFileName(this.useCaseSensitiveFileNames);
        this.options = options;
        options.docManager?.on('documentOpen', async (document: Document) => {
            const filePath = document.getFilePath();
            if (!filePath) {
                return;
            }
            const tsDoc = this.createDocumentSnapshot(filePath, document);

            await this.sendNotification(DidOpenTextDocumentNotification.type, {
                textDocument: {
                    uri: toVirtualSvelteFilePath(document.uri, tsDoc.scriptKind),
                    languageId: tsDoc.scriptKind === ScriptKind.TS ? 'typescript' : 'javascript',
                    version: document.version,
                    text: tsDoc.getFullText()
                }
            });
        });

        options.docManager?.on('documentChange', (document: Document) => {
            const filePath = document.getFilePath();
            if (document.version === 0 || !filePath) {
                return;
            }
            const oldSnapshot = this.documentSnapshots.get(document.uri);
            const tsDoc = this.createDocumentSnapshot(filePath, document);
            this.sendNotification(DidChangeTextDocumentNotification.type, {
                textDocument: {
                    uri: toVirtualSvelteFilePath(document.uri, tsDoc.scriptKind),
                    version: document.version
                },
                contentChanges: [
                    oldSnapshot
                        ? {
                              text: tsDoc.getFullText(),
                              range: {
                                  start: { line: 0, character: 0 },
                                  end: oldSnapshot.positionAt(oldSnapshot.getFullText().length)
                              }
                          }
                        : { text: tsDoc.getFullText() }
                ]
            });
        });

        options.docManager?.on('documentClose', (document: Document) => {
            const snapshot = this.documentSnapshots.get(document.uri);
            if (!snapshot) {
                return;
            }
            this.sendNotification(DidCloseTextDocumentNotification.type, {
                textDocument: {
                    uri: toVirtualSvelteFilePath(document.uri, snapshot.scriptKind)
                }
            });
        });

        try {
            // For when svelte2tsx/svelte-check is part of node_modules, for example VS Code extension
            this.svelteTsPath = dirname(
                require.resolve(this.options.isSvelteCheck ? 'svelte-check' : 'svelte2tsx')
            );
        } catch (e) {
            // Fall back to dirname
            this.svelteTsPath = __dirname;
        }
    }

    private async sendRequest<P, R, PR, E, RO>(
        type: ProtocolRequestType<P, R, PR, E, RO>,
        params: P,
        token?: CancellationToken
    ): Promise<R> {
        const connection = await this.getConnection();
        return connection.sendRequest(type, params, token);
    }

    private async sendNotification<P, RO>(
        type: ProtocolNotificationType<P, RO>,
        params?: P
    ): Promise<void> {
        const connection = await this.getConnection();
        return connection.sendNotification(type, params);
    }

    private async getConnection(): Promise<ProtocolConnection> {
        await this.initializePending;
        if (!this.connection) {
            throw new Error(
                `TypeScript Go server connection is not initialized. Please start the server first.`
            );
        }
        return this.connection;
    }

    start(): Resolvable<void> {
        if (this.connection || this.initializePending) {
            throw new Error(
                `TypeScript Go server is already running at ${this.options.tsserverPath}`
            );
        }
        this.initializePending = this.initializeServerProcess();
        return this.initializePending;
    }

    private async initializeServerProcess(): Promise<void> {
        const options = this.options;
        if (this.serverProcess) {
            throw new Error(
                `TypeScript Go server process is already running at ${options.tsserverPath}`
            );
        }
        this.serverProcess = spawn(options.tsserverPath, ['--lsp', '--stdio'], {});
        if (!this.serverProcess?.stdin || !this.serverProcess.stdout) {
            throw new Error(
                `Failed to spawn TypeScript Go server process at ${options.tsserverPath}`
            );
        }
        this.serverProcess.on('error', (err) => {
            console.error(`[ts go]: ${err.message}`);
        });
        this.serverProcess.on('exit', (code, signal) => {
            if (code !== 0) {
                console.error(
                    `TypeScript Go server process exited with code ${code} and signal ${signal}`
                );
            }
        });
        this.serverProcess.stderr?.on('data', (data) => {
            console.error(`[ts go]: ${data.toString()}`);
        });
        const connection = createProtocolConnection(
            new StreamMessageReader(this.serverProcess.stdout),
            new StreamMessageWriter(this.serverProcess.stdin),
            {
                error: console.error,
                warn: console.warn,
                info: console.info,
                log: console.log
            }
        );
        this.connection = connection;

        const clientCapabilities = options.lsConfigManager.getClientCapabilities();
        const initializeParams: InitializeParams = {
            processId: process.pid,
            rootUri: options.serverInitializationOptions.rootUri ?? null,
            workspaceFolders: options.serverInitializationOptions.workspaceFolders,
            locale: options.serverInitializationOptions.locale,
            capabilities: {
                textDocument: {
                    diagnostic: {
                        ...clientCapabilities?.textDocument?.publishDiagnostics,
                        ...clientCapabilities?.textDocument?.diagnostic
                    },
                    hover: clientCapabilities?.textDocument?.hover,
                    definition: clientCapabilities?.textDocument?.definition,
                    // used by TS GO server to extract diagnostics capabilities
                    publishDiagnostics: clientCapabilities?.textDocument?.publishDiagnostics,
                    codeLens: clientCapabilities?.textDocument?.codeLens,
                    references: clientCapabilities?.textDocument?.references,
                    rename: clientCapabilities?.textDocument?.rename
                },
                workspace: {
                    workspaceFolders: clientCapabilities?.workspace?.workspaceFolders,
                    didChangeWatchedFiles: clientCapabilities?.workspace?.didChangeWatchedFiles
                    // configuration: clientCapabilities?.workspace?.configuration,
                }
            },
            initializationOptions: {
                codeLensShowLocationsCommandName: 'editor.action.showReferences',
                extraFileExtensions: [
                    {
                        extension: 'svelte',
                        isMixedContent: true,
                        scriptKind: ts.ScriptKind.Deferred
                    }
                ]
            }
        };
        connection.onNotification(LogMessageNotification.type, (params) => {
            switch (params.type) {
                case MessageType.Error:
                    Logger.error(`[ts go] [error]: ${params.message}`);
                    break;
                case MessageType.Warning:
                    Logger.log(`[ts go] [warn]: ${params.message}`);
                    break;
                case MessageType.Info:
                    Logger.log(`[ts go] [info]: ${params.message}`);
                    break;
                case MessageType.Log:
                    Logger.log(`[ts go]: ${params.message}`);
                    break;
                case MessageType.Debug:
                    Logger.debug(`[ts go] [debug]: ${params.message}`);
                    break;
            }
        });
        connection.onRequest(RegistrationRequest.type, (params) => {
            // console.log('Received registration request:', JSON.stringify(params));
            for (const registration of params.registrations) {
                if (registration.method === DidChangeWatchedFilesNotification.type.method) {
                    options.registerFileWatcher?.(registration.registerOptions);
                }
            }

            return;
        });

        connection.onRequest(
            '$/extensibility/language/loadFile',
            async (params: { uri: string }) => {
                const filePath = urlToPath(params.uri);
                if (!filePath || !ts.sys.fileExists(filePath)) {
                    return null;
                }
                const result = DocumentSnapshot.fromFilePath(
                    filePath,
                    (filePath, text) => new Document(pathToUrl(filePath), text),
                    this.loadSvelte2tsxOptions(filePath),
                    ts.sys
                );
                this.documentSnapshots.set(params.uri, result);
                return {
                    content: result.getFullText(),
                    scriptKind: result.scriptKind
                };
            }
        );
        connection.listen();
        return connection
            .sendRequest(InitializeRequest.type, initializeParams)
            .then(async (result: InitializeResult) => {
                console.log('TypeScript Go server initialized successfully');
                console.log('Server capabilities:', result.capabilities);
                await connection.sendNotification(InitializedNotification.type, {});
                await connection.sendNotification(DidChangeConfigurationNotification.type, {
                    settings: {
                        typescript: options.lsConfigManager.getClientTsUserConfig('typescript'),
                        javascript: options.lsConfigManager.getClientTsUserConfig('javascript')
                    }
                });
            });
    }

    private lastDiagnostics: Map<string, Diagnostic[]> = new Map();
    private shimPathsCache: Map<string, string[]> = new Map();

    private loadSvelte2tsxOptions(filePath: string): SvelteSnapshotOptions {
        const sveltePackageInfo = getPackageInfo('svelte', filePath);
        const svelteCompiler = importSvelte(filePath);
        let shimPaths = this.shimPathsCache.get(sveltePackageInfo.path);
        if (!shimPaths) {
            shimPaths = internalHelpers.get_global_types(
                ts.sys,
                sveltePackageInfo.version?.major === 3,
                sveltePackageInfo.path,
                this.svelteTsPath
            );
            this.shimPathsCache.set(sveltePackageInfo.path, shimPaths);
        }
        return {
            parse: svelteCompiler?.parse,
            transformOnTemplateError: true,
            typingsNamespace: 'svelteHTML',
            version: svelteCompiler.VERSION,
            shimPaths
        };
    }

    private createDocumentSnapshot(filePath: string, document: Document): DocumentSnapshot {
        const result = DocumentSnapshot.fromDocument(
            document,
            this.loadSvelte2tsxOptions(filePath)
        );

        this.documentSnapshots.set(document.uri, result);

        return result;
    }

    async getDiagnostics(document: Document): Promise<Diagnostic[]> {
        const tsDoc = this.getDocumentSnapshot(document);
        if (!tsDoc) {
            return [];
        }
        const res = await this.sendRequest(DocumentDiagnosticRequest.type, {
            textDocument: { uri: toVirtualSvelteFilePath(document.uri, tsDoc?.scriptKind) }
        });
        if (res.kind !== 'full') {
            return this.lastDiagnostics.get(document.uri) || [];
        }

        if (!tsDoc) {
            return [];
        }
        this.lastDiagnostics.set(document.uri, res.items);
        return res.items
            .map((item) => ({
                ...item,
                range: mapRangeToOriginal(tsDoc, item.range)
            }))
            .filter((item) => item.range.start.line >= 0 && item.range.end.line >= 0);
    }

    async doHover(document: Document, position: Position): Promise<Hover | null> {
        const tsDoc = this.getDocumentSnapshot(document);
        if (!tsDoc) {
            return null;
        }

        const generatedPosition = tsDoc.getGeneratedPosition(position);
        if (generatedPosition.line < 0) {
            return null;
        }
        const res = await this.sendRequest(HoverRequest.type, {
            textDocument: { uri: toVirtualSvelteFilePath(document.uri, tsDoc.scriptKind) },
            position: generatedPosition
        });
        if (!res) {
            return null;
        }
        return {
            contents: res.contents,
            range: res.range ? mapRangeToOriginal(tsDoc, res.range) : undefined
        };
    }

    async getDefinitions(document: Document, position: Position): Promise<DefinitionLink[]> {
        const tsDoc = this.getDocumentSnapshot(document);
        if (!tsDoc) {
            return Promise.resolve([]);
        }

        const generatedPosition = tsDoc.getGeneratedPosition(position);
        const res = await this.sendRequest(DefinitionRequest.type, {
            textDocument: { uri: toVirtualSvelteFilePath(document.uri, tsDoc.scriptKind) },
            position: generatedPosition
        });

        if (!res) {
            return [];
        }

        if (!Array.isArray(res)) {
            const location = mapLocationToOriginal(tsDoc, res.range);
            return [LocationLink.create(location.uri, location.range, location.range)];
        }

        return res
            .map((link) => {
                if (!LocationLink.is(link)) {
                    if (link.uri.endsWith('.svelte')) {
                        const snapshot = this.documentSnapshots.get(link.uri);
                        if (!snapshot) {
                            return;
                        }

                        return LocationLink.create(
                            pathToUrl(snapshot.filePath),
                            mapRangeToOriginal(snapshot, link.range),
                            mapRangeToOriginal(snapshot, link.range)
                        );
                    }
                    return LocationLink.create(link.uri, link.range, link.range);
                }
                if (!link.targetUri.endsWith('.svelte')) {
                    return link;
                }

                const targetSnapshot = this.documentSnapshots.get(link.targetUri);
                if (!targetSnapshot) {
                    return;
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
                return LocationLink.create(
                    targetRange.uri,
                    targetRange.range,
                    targetSelectionRange,
                    originSelectionRange
                );
            })
            .filter(isNotNullOrUndefined);
    }

    async getCodeLens(document: Document): Promise<CodeLens[] | null> {
        const tsDoc = this.getDocumentSnapshot(document);
        if (!tsDoc) {
            return null;
        }

        const res = await this.sendRequest(CodeLensRequest.type, {
            textDocument: { uri: toVirtualSvelteFilePath(document.uri, tsDoc.scriptKind) }
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
        const tsDoc = this.getDocumentSnapshot(document);
        if (!tsDoc || !codeLensToResolve.data?.kind) {
            return codeLensToResolve;
        }

        const res = await this.sendRequest(
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

    async findReferences(
        document: Document,
        position: Position,
        context: ReferenceContext,
        cancellationToken?: CancellationToken
    ): Promise<Location[] | null> {
        const tsDoc = this.getDocumentSnapshot(document);
        if (!tsDoc) {
            return null;
        }

        const generatedPosition = tsDoc.getGeneratedPosition(position);
        const res = await this.sendRequest(
            ReferencesRequest.type,
            {
                textDocument: { uri: toVirtualSvelteFilePath(document.uri, tsDoc.scriptKind) },
                position: generatedPosition,
                context
            },
            cancellationToken
        );

        if (!res) {
            return null;
        }

        return res
            .map((loc) => {
                if (loc.uri.endsWith('.svelte')) {
                    const snapshot = this.documentSnapshots.get(loc.uri);
                    if (!snapshot) {
                        return null;
                    }
                    const mappedRange = mapRangeToOriginal(snapshot, loc.range);
                    if (mappedRange.start.line < 0 || mappedRange.end.line < 0) {
                        return null;
                    }
                    return Location.create(loc.uri, mappedRange);
                }
                return loc;
            })
            .filter(isNotNullOrUndefined);
    }

    async rename(
        document: Document,
        position: Position,
        newName: string,
        cancellationToken?: CancellationToken
    ): Promise<WorkspaceEdit | null> {
        const tsDoc = this.getDocumentSnapshot(document);
        if (!tsDoc) {
            return null;
        }

        const generatedPosition = tsDoc.getGeneratedPosition(position);
        const res = await this.sendRequest(
            RenameRequest.type,
            {
                textDocument: { uri: toVirtualSvelteFilePath(document.uri, tsDoc.scriptKind) },
                position: generatedPosition,
                newName
            },
            cancellationToken
        );

        if (!res || !res.changes) {
            return null;
        }

        const changes: Record<string, TextEdit[]> = {};

        for (const [uri, edits] of Object.entries(res.changes)) {
            if (uri.endsWith('.svelte')) {
                const snapshot = this.documentSnapshots.get(uri);
                if (!snapshot) {
                    continue;
                }
                const mappedEdits = edits
                    .map((edit) => {
                        const mappedRange = mapRangeToOriginal(snapshot, edit.range);
                        if (mappedRange.start.line < 0 || mappedRange.end.line < 0) {
                            return null;
                        }
                        return {
                            range: mappedRange,
                            newText: edit.newText
                        };
                    })
                    .filter(isNotNullOrUndefined);
                if (mappedEdits.length > 0) {
                    changes[uri] = mappedEdits;
                }
            } else {
                changes[uri] = edits;
            }
        }

        return { changes };
    }

    async prepareRename(document: Document, position: Position): Promise<Range | null> {
        // prepare rename is not fully supported yet

        // const tsDoc = this.getDocumentSnapshot(document);
        // if (!tsDoc) {
        //     return null;
        // }

        // const generatedPosition = tsDoc.getGeneratedPosition(position);
        // const res = await this.sendRequest(PrepareRenameRequest.type, {
        //     textDocument: { uri: toVirtualSvelteFilePath(document.uri, tsDoc.scriptKind) },
        //     position: generatedPosition,
        // });

        // if (res === null || !Range.is(res)) {
        //     return null;
        // }

        // const mappedRange = mapRangeToOriginal(tsDoc, res);
        // if (mappedRange.start.line < 0 || mappedRange.end.line < 0) {
        //     return null;
        // }
        // return mappedRange;
        return { start: position, end: position };
    }

    private getDocumentSnapshot(document: Document): DocumentSnapshot | undefined {
        const result = this.documentSnapshots.get(document.uri);
        if (!result) {
            console.error(`No TypeScript document snapshot found for ${document.uri}`);
            return undefined;
        }
        return result;
    }
}
