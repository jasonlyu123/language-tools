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
import { createGetCanonicalFileName, pathToUrl, urlToPath } from '../../utils';
import { Resolvable } from '../interfaces';
import { DocumentSnapshot, SvelteSnapshotOptions } from '../typescript/DocumentSnapshot';
// import { toVirtualSvelteFilePath } from '../typescript/utils';
import type {
    API,
    Snapshot,
    Project
} from '@typescript/api/async' with { 'resolution-mode': 'import' };
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

export class TsApiService {
    private readonly getCanonicalFileName: (fileName: string) => string;
    private readonly useCaseSensitiveFileNames: boolean;
    private readonly options: TsApiServiceOptions;
    private serverProcess: ChildProcess | null = null;
    private connection: ProtocolConnection | null = null;
    private initializePending: Promise<void> | null = null;
    private documentSnapshots: Map<string, DocumentSnapshot> = new Map();
    private readonly svelteTsPath: string;

    private api: API | null = null;

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

        const apiModulePromise = import('@typescript/api/async');

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

    async getApiProject(filePath: string): Promise<Project | undefined> {
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

    private createDocumentSnapshot(filePath: string, document: Document): DocumentSnapshot {
        const result = DocumentSnapshot.fromDocument(
            document,
            this.loadSvelte2tsxOptions(filePath)
        );

        this.documentSnapshots.set(document.uri, result);

        return result;
    }

    getDocumentSnapshot(document: Document): DocumentSnapshot | undefined;
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
}
