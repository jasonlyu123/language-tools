import { ChildProcess, spawn } from 'node:child_process';
import fs from 'node:fs';
import {
    CancellationToken,
    DefinitionLink,
    DefinitionRequest,
    Diagnostic,
    DidChangeTextDocumentNotification,
    DidCloseTextDocumentNotification,
    DidOpenTextDocumentNotification,
    DocumentDiagnosticRequest,
    Hover,
    HoverRequest,
    InitializeParams,
    InitializeRequest,
    InitializeResult,
    InitializedNotification,
    LocationLink,
    Position,
    ProtocolConnection,
    ProtocolNotificationType,
    ProtocolRequestType,
    RegistrationRequest,
    WorkspaceFolder,
    createProtocolConnection
} from 'vscode-languageserver-protocol';
import { StreamMessageReader, StreamMessageWriter } from 'vscode-languageserver-protocol/node';
import { getPackageInfo, importSvelte } from '../../importPackage';
import {
    Document,
    DocumentManager,
    mapLocationToOriginal,
    mapRangeToOriginal
} from '../../lib/documents';
import { LSConfigManager } from '../../ls-config';
import { createGetCanonicalFileName, isNotNullOrUndefined, pathToUrl } from '../../utils';
import {
    DefinitionsProvider,
    DiagnosticsProvider,
    HoverProvider,
    LSProvider,
    Resolvable
} from '../interfaces';
import { DocumentSnapshot } from '../typescript/DocumentSnapshot';
// import { toVirtualSvelteFilePath } from '../typescript/utils';
import ts, { ScriptKind } from 'typescript';
import { join } from 'node:path';

const toVirtualSvelteFilePath = (uri: string): string => {
    return uri;
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
    rootUri: string | null;
    workspaceFolders: WorkspaceFolder[];
    tsserverPath: string;
    lsConfigManager: LSConfigManager;
    docManager?: DocumentManager;
}

export interface ProjectContainer {
    host: LSProvider;
}

export class TsApiService implements DiagnosticsProvider, HoverProvider, DefinitionsProvider {
    private readonly getCanonicalFileName: (fileName: string) => string;
    private readonly useCaseSensitiveFileNames: boolean;
    private readonly options: TsApiServiceOptions;
    private serverProcess: ChildProcess | null = null;
    private connection: ProtocolConnection | null = null;
    private initializePending: Promise<void> | null = null;
    private documentSnapshots: Map<string, DocumentSnapshot> = new Map();

    constructor(options: TsApiServiceOptions) {
        this.useCaseSensitiveFileNames = !fs.existsSync(__filename.toUpperCase());
        this.getCanonicalFileName = createGetCanonicalFileName(this.useCaseSensitiveFileNames);
        this.options = options;
        options.docManager?.on('documentOpen', (document: Document) => {
            const filePath = document.getFilePath();
            if (!filePath) {
                return;
            }
            const tsDoc = this.createDocumentSnapshot(filePath, document);
            this.sendNotification(DidOpenTextDocumentNotification.type, {
                textDocument: {
                    uri: toVirtualSvelteFilePath(document.uri),
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
                    uri: toVirtualSvelteFilePath(document.uri),
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
            this.sendNotification(DidCloseTextDocumentNotification.type, {
                textDocument: {
                    uri: toVirtualSvelteFilePath(document.uri)
                }
            });
        });
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
            rootUri: options.rootUri,
            workspaceFolders: options.workspaceFolders,
            capabilities: {
                textDocument: {
                    diagnostic: clientCapabilities?.textDocument?.diagnostic,
                    hover: clientCapabilities?.textDocument?.hover,
                    definition: clientCapabilities?.textDocument?.definition,
                },
                workspace: {
                    workspaceFolders: clientCapabilities?.workspace?.workspaceFolders,
                    didChangeWatchedFiles: clientCapabilities?.workspace?.didChangeWatchedFiles,                   
                },
                
            }
        };
        connection.onRequest(RegistrationRequest.type, (params) => {
            console.log('Received registration request:', JSON.stringify(params));

            return
        });
        connection.listen();
        return connection
            .sendRequest(InitializeRequest.type, initializeParams)
            .then((result: InitializeResult) => {
                console.log('TypeScript Go server initialized successfully');
                console.log('Server capabilities:', result.capabilities);
                connection.sendNotification(InitializedNotification.type, {});
            });
    }

    private lastDiagnostics: Map<string, Diagnostic[]> = new Map();

    private createDocumentSnapshot(filePath: string, document: Document): DocumentSnapshot {
        const sveltePackageInfo = getPackageInfo('svelte', filePath);
        const svelteCompiler = importSvelte(filePath);
        const result = DocumentSnapshot.fromDocument(document, {
            parse: svelteCompiler?.parse,
            transformOnTemplateError: true,
            typingsNamespace: 'svelteHTML',
            version: svelteCompiler.VERSION,
            shimPaths: [
                join(sveltePackageInfo.path, 'svelte-html.d.ts'),
                join(
                    sveltePackageInfo.path,
                    '..',
                    '.svelte2tsx-language-server-files/svelte-shims-v4.d.ts'
                )
            ]
        });

        this.documentSnapshots.set(document.uri, result);

        return result;
    }

    async getDiagnostics(document: Document): Promise<Diagnostic[]> {
        const res = await this.sendRequest(DocumentDiagnosticRequest.type, {
            textDocument: { uri: toVirtualSvelteFilePath(document.uri) }
        });
        if (res.kind !== 'full') {
            return this.lastDiagnostics.get(document.uri) || [];
        }

        const tsDoc = this.getDocumentSnapshot(document);
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
            textDocument: { uri: toVirtualSvelteFilePath(document.uri) },
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
            textDocument: { uri: toVirtualSvelteFilePath(document.uri) },
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

                const targetRange = mapLocationToOriginal(tsDoc, link.targetRange);
                return LocationLink.create(
                    targetRange.uri,
                    targetRange.range,
                    mapRangeToOriginal(tsDoc, link.targetSelectionRange)
                );
            })
            .filter(isNotNullOrUndefined);
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
