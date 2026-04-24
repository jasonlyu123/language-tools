import { ChildProcess, spawn } from 'node:child_process';
import fs from 'node:fs';
import {
    CancellationToken,
    DidChangeConfigurationNotification,
    DidChangeTextDocumentNotification,
    DidChangeWatchedFilesNotification,
    DidChangeWatchedFilesRegistrationOptions,
    DidCloseTextDocumentNotification,
    DidOpenTextDocumentNotification,
    InitializeParams,
    InitializeRequest,
    InitializeResult,
    InitializedNotification,
    LogMessageNotification,
    MessageType,
    PositionEncodingKind,
    ProtocolConnection,
    ProtocolNotificationType,
    ProtocolRequestType,
    RegistrationRequest,
    WorkspaceFolder,
    createProtocolConnection
} from 'vscode-languageserver-protocol';
import { StreamMessageReader, StreamMessageWriter } from 'vscode-languageserver-protocol/node';
import { getPackageInfo, importSvelte } from '../../importPackage';
import { Document, DocumentManager } from '../../lib/documents';
import { LSConfigManager } from '../../ls-config';
import { pathToUrl, urlToPath } from '../../utils';
import { Resolvable } from '../interfaces';
import {
    DocumentSnapshot,
    SvelteDocumentSnapshot,
    SvelteSnapshotOptions
} from '../typescript/DocumentSnapshot';
// import { toVirtualSvelteFilePath } from '../typescript/utils';
import { dirname } from 'node:path';
import { internalHelpers } from 'svelte2tsx';
import ts, { ScriptKind } from 'typescript';
import { Logger } from '../../logger';
import { tsAst, tsApi } from './types';
import { FileMap } from '../../lib/documents/fileCollection';

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
    docManager: DocumentManager;
    isSvelteCheck?: boolean;
    serverInitializationOptions: Partial<InitializeParams> & {
        workspaceFolders: WorkspaceFolder[];
    };
    registerFileWatcher?: (pattern: DidChangeWatchedFilesRegistrationOptions) => void;
}

export class TsApiService {
    private readonly useCaseSensitiveFileNames: boolean;
    private readonly options: TsApiServiceOptions;
    private serverProcess: ChildProcess | null = null;
    private connection: ProtocolConnection | null = null;
    private initializePending: Promise<void> | null = null;
    private readonly documentSnapshots: FileMap<DocumentSnapshot>;
    private readonly svelteTsPath: string;

    private api: tsApi.API<true> | null = null;
    private tsAstModule: typeof tsAst | null = null;

    constructor(options: TsApiServiceOptions) {
        // In mac, you can have both case-sensitive and case-insensitive file systems in different directories
        // use tsserver path so that it is more likely to be consistent with what tsserver uses.
        this.useCaseSensitiveFileNames =
            process.platform === 'win32' || !fs.existsSync(options.tsserverPath.toUpperCase());

        this.documentSnapshots = new FileMap(this.useCaseSensitiveFileNames);
        this.options = options;

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

    async sendRequest<P, R, PR, E, RO>(
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

    async syncConfiguration() {
        const lsConfigManager = this.options.lsConfigManager;
        await this.sendNotification(DidChangeConfigurationNotification.type, {
            settings: {
                typescript: lsConfigManager.getClientTsUserConfig('typescript'),
                javascript: lsConfigManager.getClientTsUserConfig('javascript')
            }
        });
    }

    start(): Resolvable<void> {
        if (this.connection || this.initializePending) {
            throw new Error(
                `TypeScript Go server is already running at ${this.options.tsserverPath}`
            );
        }
        this.initializePending = this.initializeServerProcess();
        const { docManager, lsConfigManager } = this.options;
        docManager.on('documentOpen', async (document: Document) => {
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

        docManager.on('documentChange', (document: Document) => {
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

        docManager.on('documentClose', (document: Document) => {
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

        lsConfigManager.onChange(() => {
            this.syncConfiguration();
        });
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
            Logger.error(
                err,
                `Failed to start TypeScript Go server process at ${options.tsserverPath}`
            );
        });
        this.serverProcess.on('exit', (code, signal) => {
            if (code !== 0) {
                Logger.error(
                    `TypeScript Go server process exited with code ${code} and signal ${signal}`
                );
            }
        });
        const connection = createProtocolConnection(
            new StreamMessageReader(this.serverProcess.stdout),
            new StreamMessageWriter(this.serverProcess.stdin)
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
                    rename: clientCapabilities?.textDocument?.rename,
                    inlayHint: clientCapabilities?.textDocument?.inlayHint,
                    signatureHelp: clientCapabilities?.textDocument?.signatureHelp,
                    foldingRange: clientCapabilities?.textDocument?.foldingRange
                        ? {
                              ...clientCapabilities.textDocument?.foldingRange,
                              // Always set to false to get accurate ranges from the server. Manually convert it to lineFoldingOnly if the client only supports that.
                              // TODO: Would be a problem if the lsp server is shared with the typescript extension.
                              lineFoldingOnly: false
                          }
                        : undefined
                },
                workspace: {
                    workspaceFolders: clientCapabilities?.workspace?.workspaceFolders,
                    didChangeWatchedFiles: clientCapabilities?.workspace?.didChangeWatchedFiles
                    // configuration: clientCapabilities?.workspace?.configuration,
                },

                // Don't sync with client's position encoding capabilities
                // we only support javascript's position encoding, don't use the client's capabilities
                // utf-16 support is mandatory for the client because of backwards compatibility anyway.
            },
            initializationOptions: {
                codeLensShowLocationsCommandName: 'editor.action.showReferences'
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
                    Logger.debug(`[ts go] [info]: ${params.message}`);
                    break;
                case MessageType.Log:
                    Logger.debug(`[ts go] [log]: ${params.message}`);
                    break;
                case MessageType.Debug:
                    Logger.debug(`[ts go] [debug]: ${params.message}`);
                    break;
            }
        });
        connection.onRequest(RegistrationRequest.type, (params) => {
            for (const registration of params.registrations) {
                if (registration.method === DidChangeWatchedFilesNotification.type.method) {
                    options.registerFileWatcher?.(registration.registerOptions);
                }
            }

            return;
        });

        const apiModulePromise = import('@typescript/native-preview/async');
        connection.listen();
        return connection
            .sendRequest(InitializeRequest.type, initializeParams)
            .then(async (result: InitializeResult) => {
                Logger.debug('TypeScript Go server initialized successfully');
                Logger.debug('Server capabilities:', result.capabilities);
                await connection.sendNotification(InitializedNotification.type, {});
                this.syncConfiguration();
                const apiModule = await apiModulePromise;
                const apiInfo = await connection.sendRequest<{ pipe: string }>(
                    'custom/initializeAPISession',
                    {}
                );
                this.api = await apiModule.API.fromLSPConnection({ pipe: apiInfo.pipe });
            });
    }

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

    async getApiProject(filePath: string): Promise<tsApi.Project | undefined> {
        if (!this.api) {
            await this.initializePending;
            if (!this.api) {
                throw new Error('Failed to initialize TypeScript API session');
            }
        }
        const snapshot = await this.api.updateSnapshot();
        try {
            const project = await snapshot.getDefaultProjectForFile(filePath);
            return project;
        } catch (error) {
            return undefined;
        }
    }

    async importAstApi() {
        if (!this.tsAstModule) {
            this.tsAstModule = await import('@typescript/native-preview/ast');
        }
        return this.tsAstModule;
    }

    private createDocumentSnapshot(filePath: string, document: Document): DocumentSnapshot {
        const result = DocumentSnapshot.fromDocument(
            document,
            this.loadSvelte2tsxOptions(filePath)
        );

        this.documentSnapshots.set(document.uri, result);

        return result;
    }

    getDocumentSnapshot(document: Document): SvelteDocumentSnapshot | undefined;
    getDocumentSnapshot(document: string): DocumentSnapshot | undefined;
    getDocumentSnapshot(document: Document | string): DocumentSnapshot | undefined {
        const uri = typeof document === 'string' ? document : document.uri;
        const result = this.documentSnapshots.get(uri);
        if (!result) {
            console.error(`No TypeScript document snapshot found for ${uri}`);
            return undefined;
        }

        return result;
    }

    dispose() {
        if (this.connection) {
            this.connection.dispose();
            this.connection = null;
        }
        if (this.serverProcess) {
            this.serverProcess.removeAllListeners();
            this.serverProcess.kill();
            this.serverProcess = null;
        }
        this.documentSnapshots.clear();
    }
}
