import path from 'path';
import { internalHelpers } from 'svelte2tsx';
import ts from 'typescript';
import {
    CancellationToken,
    Diagnostic,
    DiagnosticSeverity,
    DiagnosticTag,
    DocumentDiagnosticReport,
    Range
} from 'vscode-languageserver';
import { Document, getLineOffsets, isRangeInTag, positionAt } from '../../../lib/documents';
import { configLoader } from '../../../lib/documents/configLoader';
import { FileMap } from '../../../lib/documents/fileCollection';
import {
    isPositionEqual,
    memoize,
    normalizePath,
    passMap,
    swapRangeStartEndIfNecessary,
    urlToPath
} from '../../../utils';
import { DiagnosticsProvider } from '../../interfaces';
import {
    DocumentSnapshot,
    JSOrTSDocumentSnapshot,
    SvelteDocumentSnapshot
} from '../../typescript/DocumentSnapshot';
import { DiagnosticCode } from '../../typescript/features/DiagnosticsProvider';
import {
    get$storeOffsetOf$storeDeclaration,
    isAfterSvelte2TsxPropsReturn,
    isInGeneratedCode,
    isStoreVariableIn$storeDeclaration
} from '../../typescript/features/utils';
import { isAttributeName, isEventHandler } from '../../typescript/svelte-ast-utils';
import { isSvelteFilePath, mapSeverity } from '../../typescript/utils';
import { SourceFileDiagnosticContext, SvelteSourceFileDocument } from '../SvelteSourceFileDocument';
import { tsApiSync, tsAst, tsFs } from '../types';
import {
    LegacyDiagnosticApiService,
    SvelteSnapshotDiagnosticsContext,
    toRealPath,
    toVirtualPath
} from './LegacyDiagnosticProvider';
import {
    gatherIdentifiers,
    getStartOfNode,
    isInReactiveStatement,
    isReactiveStatement
} from './utils';
import { getAttributeContextAtPosition } from '../../../lib/documents/parseHtml';

const CONTENT_MAPPER_UNMAPPED_CODE = 18074;

export interface TSModules {
    apiModule: typeof tsApiSync;
    astModule: typeof tsAst;
    fsModule: typeof tsFs;
    tsVersion: string;
}

export class SvelteCheckTSGoDiagnosticsProvider implements DiagnosticsProvider {
    private readonly api: tsApiSync.API;
    private readonly tsApiModule: typeof tsApiSync;
    private readonly tsFsModule: typeof tsFs;
    private readonly files: FileMap<DocumentSnapshot> = new FileMap();
    private readonly tsAstModule: typeof tsAst;
    private readonly tsconfigPath: string;
    /**
     * files is currently empty
     */
    private projectConfig: ts.ParsedCommandLine;
    private pendingConfigLoading: Promise<void> | undefined;
    private readonly legacyService: LegacyDiagnosticApiService | undefined;
    private readonly useStableApi: boolean;

    private createDocument: (filePath: string, content: string) => Document;
    private snapshot: tsApiSync.Snapshot | undefined;

    private pendingChanges = {
        created: new Set<string>(),
        changed: new Set<string>(),
        deleted: new Set<string>()
    };

    constructor(
        modules: TSModules,
        tsconfigPath: string,
        ambientTypesSource: string,
        createDocument: (filePath: string, content: string) => Document,
        // test only
        contentMapperMode: 'auto' | boolean = 'auto'
    ) {
        this.tsApiModule = modules.apiModule;
        this.tsAstModule = modules.astModule;
        this.tsFsModule = modules.fsModule;
        this.tsconfigPath = tsconfigPath;
        const { tsVersion } = modules;
        this.createDocument = createDocument;
        const [major, minor] = (tsVersion || '7.0').split('.').map(Number);
        this.useStableApi = major > 7 || (major === 7 && minor >= 1);

        this.projectConfig = this.parseConfig();
        const contentMapperConfigured =
            typeof this.projectConfig.raw.contentMappers === 'object' &&
            Array.isArray(this.projectConfig.raw.contentMappers) &&
            this.projectConfig.raw.contentMappers.find((mapper: { extensions: string[] }) =>
                mapper.extensions.includes('.svelte')
            );

        let useContentMapper: boolean;
        if (contentMapperMode === 'auto') {
            useContentMapper = !contentMapperConfigured;
        } else {
            if (contentMapperMode && !contentMapperConfigured) {
                console.warn(
                    'Content mapper mode is enabled but no content mapper for .svelte files is configured in ' +
                        tsconfigPath
                );
            }
            useContentMapper = contentMapperMode;
        }

        if (!useContentMapper) {
            this.legacyService = new LegacyDiagnosticApiService(
                this.projectConfig,
                tsconfigPath,
                ambientTypesSource,
                this.createDocument,
                this.files
            );
        }

        this.api = new this.tsApiModule.API({
            fs: this.createFsProxy(),
            runExternalCode: useContentMapper
        });

        this.pendingConfigLoading = configLoader.loadConfigs(path.dirname(tsconfigPath));
    }

    async getDiagnostics(
        document: Document,
        cancellationToken?: CancellationToken
    ): Promise<Diagnostic[]> {
        const filePath = document.getFilePath();
        if (!filePath) {
            return [];
        }
        const project = await this.getProject();
        if (!project) {
            return [];
        }

        const tsDoc = this.files.get(normalizePath(filePath));
        let path: string;
        if (tsDoc) {
            if (!tsDoc || !(tsDoc instanceof SvelteDocumentSnapshot)) {
                return [];
            }

            if (
                ['coffee', 'coffeescript'].includes(document.getLanguageAttribute('script')) ||
                cancellationToken?.isCancellationRequested
            ) {
                return [];
            }
            // Document preprocessing failed, show parser error instead
            const parserErrorDiag = getParserErrorDiagnostic(tsDoc);
            if (parserErrorDiag) {
                return [parserErrorDiag];
            }

            path = toVirtualPath(tsDoc);
        } else {
            path = normalizePath(filePath);
        }

        const diagnostics: tsApiSync.Diagnostic[] = [];
        const program = project.program;
        if (this.useStableApi) {
            this.api
                .batch(
                    program.getSyntacticDiagnostics.gen(path),
                    program.getSuggestionDiagnostics.gen(path),
                    program.getSemanticDiagnostics.gen(path)
                )
                .forEach((diag) => diagnostics.push(...diag));
        } else {
            diagnostics.push(...(program.getSyntacticDiagnostics(path) || []));
            diagnostics.push(...(program.getSuggestionDiagnostics(path) || []));
            diagnostics.push(...(program.getSemanticDiagnostics(path) || []));
        }

        const sourceFile = project.program.getSourceFile(path);
        if (!sourceFile) {
            throw new Error(`Source file not found for ${path}`);
        }
        const context = tsDoc
            ? new SvelteSnapshotDiagnosticsContext(this.tsAstModule, tsDoc, sourceFile)
            : new SvelteSourceFileDocument(this.tsAstModule, sourceFile, document);

        return mapAndFilterDiagnostics(
            this.tsAstModule,
            this.tsApiModule,
            project,
            diagnostics,
            context,
            this.createMappingContext(context)
        );
    }

    async getProject() {
        if (this.pendingConfigLoading) {
            await this.pendingConfigLoading;
            this.pendingConfigLoading = undefined;
        }

        const configPath = this.legacyService?.virtualTsconfigPath ?? this.tsconfigPath;

        const changes = {
            created: Array.from(this.pendingChanges.created),
            changed: Array.from(this.pendingChanges.changed),
            deleted: Array.from(this.pendingChanges.deleted)
        };

        let snapshot: tsApiSync.Snapshot;
        if (this.useStableApi) {
            if (
                this.snapshot &&
                changes.created.length === 0 &&
                changes.changed.length === 0 &&
                changes.deleted.length === 0
            ) {
                snapshot = this.snapshot;
            } else {
                snapshot = this.api.createSnapshot({
                    openProjects: [configPath],
                    fileNotifications: changes
                });
            }
            this.snapshot = snapshot;
        } else {
            // @ts-expect-error typescript < 7.1
            snapshot = this.api.updateSnapshot({
                openProject: configPath,
                fileChanges: changes
            });
        }
        this.pendingChanges.created.clear();
        this.pendingChanges.changed.clear();
        this.pendingChanges.deleted.clear();
        if (this.useStableApi) {
            const project = snapshot.getConfiguredProject(configPath);
            return project;
        }
        // @ts-expect-error typescript < 7.1
        const project = snapshot.getProject(configPath);
        return project;
    }

    getAllSvelteFiles(): string[] {
        return Array.from(this.files.keys()).filter(isSvelteFilePath);
    }

    mapAndFilterDiagnostics(
        project: tsApiSync.Project,
        diagnostics: tsApiSync.Diagnostic[]
    ): { filePath: string; text: string; diagnostics: Diagnostic[] }[] {
        const byFile = new Map<string, tsApiSync.Diagnostic[]>();
        for (const diag of diagnostics) {
            const key = toRealPath(diag.fileName ?? this.tsconfigPath);
            let bucket = byFile.get(key);
            if (!bucket) {
                bucket = [];
                byFile.set(key, bucket);
            }
            bucket.push(diag);
        }

        const result: { filePath: string; diagnostics: Diagnostic[]; text: string }[] = [];
        const configPath = this.legacyService?.virtualTsconfigPath ?? this.tsconfigPath;
        const virtualConfigPath = normalizePath(configPath);
        for (const [fileName, diags] of byFile) {
            const tsDoc = this.files.get(normalizePath(fileName));
            if (!tsDoc) {
                if (fileName === virtualConfigPath) {
                    result.push(this.reportVirtualConfigError(diags));
                } else {
                    result.push(this.covertDiagnosticsForUnopenedFile(fileName, diags));
                }

                continue;
            }

            if (tsDoc instanceof SvelteDocumentSnapshot) {
                const sourceFile = project.program.getSourceFile(tsDoc.filePath);
                if (!sourceFile) {
                    // should not happen, but if it does, we skip this file
                    continue;
                }
                const handler = new SvelteSnapshotDiagnosticsContext(
                    this.tsAstModule,
                    tsDoc,
                    sourceFile
                );
                const parserErrorDiag = getParserErrorDiagnostic(tsDoc);
                const mappedDiags = parserErrorDiag
                    ? [parserErrorDiag]
                    : mapAndFilterDiagnostics(
                          this.tsAstModule,
                          this.tsApiModule,
                          project,
                          diags,
                          handler,
                          this.createMappingContext(handler)
                      );
                result.push({
                    filePath: fileName,
                    text: tsDoc.parent.getText(),
                    diagnostics: mappedDiags
                });
            } else if (tsDoc instanceof JSOrTSDocumentSnapshot) {
                const mappedDiags = diags.map((diag): Diagnostic => {
                    return {
                        range: {
                            start: tsDoc.getOriginalPosition(tsDoc.positionAt(diag.pos)),
                            end: tsDoc.getOriginalPosition(tsDoc.positionAt(diag.end))
                        },
                        message: flattenDiagnosticMessage(diag),
                        severity: mapSeverity(diag.category),
                        source: diag.fileName?.endsWith('js') ? 'js' : 'ts',
                        tags: getDiagnosticTag(diag),
                        code: diag.code
                    };
                });
                result.push({
                    filePath: fileName,
                    text: tsDoc.originalText,
                    diagnostics: mappedDiags
                });
            } else {
                result.push(this.covertDiagnosticsForUnopenedFile(fileName, diags));
            }
        }

        return result;
    }

    private reportVirtualConfigError(diags: tsApiSync.Diagnostic[]): {
        filePath: string;
        diagnostics: Diagnostic[];
        text: string;
    } {
        return {
            filePath: this.tsconfigPath,
            diagnostics: diags.map(
                (diag): Diagnostic => ({
                    range: { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } },
                    message: flattenDiagnosticMessage(diag),
                    severity: mapSeverity(diag.category),
                    source: 'ts',
                    tags: getDiagnosticTag(diag),
                    code: diag.code,
                    data: {
                        positionUnknown: true
                    }
                })
            ),
            text: ''
        };
    }

    async getDiagnosticsForPullMode(document: Document): Promise<DocumentDiagnosticReport> {
        return {
            items: await this.getDiagnostics(document),
            kind: 'full'
        };
    }

    watchUpdate(doc: { text: string; uri: string }, kind: 'created' | 'changed' | 'deleted') {
        if (this.legacyService) {
            this.legacyService.watchUpdate(doc, kind, this.pendingChanges);
        } else {
            const filePath = urlToPath(doc.uri) || '';
            const normalizedPath = normalizePath(filePath);
            if (kind === 'created') {
                this.pendingChanges.created.add(normalizedPath);
            } else if (kind === 'deleted') {
                this.pendingChanges.deleted.add(normalizedPath);
            } else if (kind === 'changed') {
                let changedPath = normalizedPath;
                if (this.files.has(normalizedPath)) {
                    const newSnapshot = DocumentSnapshot.fromNonSvelteFilePath(filePath, ts.sys);
                    this.files.set(normalizedPath, newSnapshot);
                }
                this.pendingChanges.changed.add(changedPath);
            }
        }
    }

    getProjectConfig() {
        return this.projectConfig;
    }

    private createFsProxy(): tsFs.FileSystemCallbacks {
        // optional chaining for supporting older version.
        // For older version, undefined means using the default system callbacks. So this setup is type safe and also compatible with both older and newer versions.

        const serverFS = this.tsFsModule?.serverFS;
        const defaultSys: tsFs.FileSystemCallbacks = {
            fileExists: serverFS?.useOS,
            directoryExists: serverFS?.useOS,
            getAccessibleEntries: serverFS?.useOS,
            stat: serverFS?.useOS,
            realpath: serverFS?.useOS,
            writeFile: serverFS?.useOS,
            removeFile: serverFS?.useOS,
            readFile: serverFS?.useOS
        };
        if (this.legacyService) {
            const legacyFsProxy = this.legacyService.createFsProxy(serverFS);
            return {
                ...defaultSys,
                ...legacyFsProxy
            };
        }

        const service = this;
        const kitFiles: Parameters<typeof internalHelpers.isKitFile>[1] = {
            serverHooksPath: 'src/hooks.client',
            clientHooksPath: 'src/hooks.client',
            universalHooksPath: 'src/hooks',
            paramsPath: 'src/params'
        };

        return {
            ...defaultSys,
            readFile(path: string) {
                const normalizedPath = normalizePath(path);

                if (normalizedPath.endsWith('node_modules/svelte/types/ambient.d.ts')) {
                    return '';
                }

                if (
                    normalizedPath.endsWith('node_modules/svelte/types/index.d.ts') ||
                    internalHelpers.isKitFile(normalizedPath, kitFiles)
                ) {
                    const snapshot = DocumentSnapshot.fromNonSvelteFilePath(normalizedPath, ts.sys);
                    service.files.set(normalizedPath, snapshot);
                    return snapshot.getFullText();
                }

                return serverFS?.useOS;
            }

            // If we can redirect .svelte.d.ts to .d.svelte.ts in LSP then add a fileExists proxy.
        };
    }

    private parseConfig() {
        // TODO use ts7 api when svelte2tsx can work without ts6
        const commandLine = ts.parseJsonSourceFileConfigFileContent(
            ts.parseJsonText(this.tsconfigPath, ts.sys.readFile(this.tsconfigPath) || ''),
            {
                ...ts.sys,
                readDirectory() {
                    // skip project file searching
                    return [];
                }
            },
            path.dirname(this.tsconfigPath)
        );
        return commandLine;
    }

    private covertDiagnosticsForUnopenedFile(
        filePath: string,
        diagnostics: tsApiSync.Diagnostic[]
    ): { filePath: string; diagnostics: Diagnostic[]; text: string } {
        const text = ts.sys.readFile(filePath) ?? '';
        const result: Diagnostic[] = [];
        const lineOffsets = getLineOffsets(text);
        for (const diag of diagnostics) {
            result.push({
                range: {
                    start: positionAt(diag.pos, text, lineOffsets),
                    end: positionAt(diag.end, text, lineOffsets)
                },
                severity: mapSeverity(diag.category),
                message: flattenDiagnosticMessage(diag),
                code: diag.code,
                source: diag.fileName?.endsWith('js') ? 'js' : 'ts',
                tags: getDiagnosticTag(diag)
            });
        }
        return { filePath, diagnostics: result, text };
    }

    deduplicateDiagnostics(diagnostics: tsApiSync.Diagnostic[]): tsApiSync.Diagnostic[] {
        return diagnostics.filter(dedupDiagnostics());
    }

    private createMappingContext(context: SourceFileDiagnosticContext): DiagnosticsMappingContext {
        if (this.legacyService) {
            const legacyService = this.legacyService;
            return {
                ensureVirtualSpan: (diagnostic: tsApiSync.Diagnostic) => {
                    return diagnostic;
                },
                onMapToOriginalRange: (
                    diagnostic: tsApiSync.Diagnostic,
                    flattenMessage: string
                ) => {
                    return legacyService.onMapToOriginalRange(context, diagnostic, flattenMessage);
                },
                isNotGenerated: isNotGeneratedVirtualSpan
            };
        }
        return {
            ensureVirtualSpan: (diagnostic: tsApiSync.Diagnostic) => {
                if (rangeIsVirtual(diagnostic)) {
                    return diagnostic;
                }
                const sourceFile = context.getSourceFile();
                if (!sourceFile.spanMap) {
                    return diagnostic;
                }
                const mapped = sourceFile.spanMap.originalToVirtualSpans(
                    diagnostic,
                    this.tsAstModule.SpanMapFeature.All
                );
                return (
                    Array.from(mapped).sort((a, b) => a.fidelity - b.fidelity)[0].range ??
                    diagnostic
                );
            },
            onMapToOriginalRange: (diagnostic: tsApiSync.Diagnostic) => {
                if (rangeIsVirtual(diagnostic)) {
                    return context.mapToOriginalRange({
                        pos: diagnostic.pos,
                        end: diagnostic.end
                    }).range;
                }
                return {
                    start:
                        diagnostic.startPosition ??
                        context.svelteDocument.positionAt(diagnostic.pos),
                    end: diagnostic.endPosition ?? context.svelteDocument.positionAt(diagnostic.end)
                };
            },
            isNotGenerated: isNotGeneratedContentMapper
        };
    }

    dispose() {
        this.snapshot?.dispose();
        this.api.close();
    }
}

function rangeIsVirtual(diagnostic: tsApiSync.Diagnostic): boolean {
    return !!diagnostic.messageChain?.some((msg) => msg.code === CONTENT_MAPPER_UNMAPPED_CODE);
}

function getParserErrorDiagnostic(tsDoc: SvelteDocumentSnapshot): Diagnostic | undefined {
    if (!tsDoc.parserError) {
        return;
    }

    return {
        range: tsDoc.parserError.range,
        severity: DiagnosticSeverity.Error,
        source:
            tsDoc.scriptKind === ts.ScriptKind.TSX || tsDoc.scriptKind === ts.ScriptKind.TS
                ? 'ts'
                : 'js',
        message: tsDoc.parserError.message,
        code: tsDoc.parserError.code
    };
}

interface DiagnosticsMappingContext {
    ensureVirtualSpan(diagnostic: tsApiSync.Diagnostic): tsAst.ReadonlyTextRange | null;
    onMapToOriginalRange(diagnostic: tsApiSync.Diagnostic, flattenMessage: string): Range;
    isNotGenerated(sourceText: string): (diagnostic: tsApiSync.Diagnostic) => boolean;
}

function mapAndFilterDiagnostics(
    tsAstModule: typeof tsAst,
    tsApiModule: typeof tsApiSync,
    tsApiProject: tsApiSync.Project,
    diagnostics: tsApiSync.Diagnostic[],
    tsDoc: SourceFileDiagnosticContext,
    mappingContext: DiagnosticsMappingContext
): Diagnostic[] {
    const document = tsDoc.svelteDocument;
    const sourceFile = tsDoc.getSourceFile();
    // For svelte-check tsgo, we called api to get all diagnostics instead of calling getDiagnostics for each file separately. So we also need to check parser error or coffeescript files here.
    if (['coffee', 'coffeescript'].includes(document.getLanguageAttribute('script'))) {
        return [];
    }

    const notGenerated = mappingContext.isNotGenerated(sourceFile.getFullText());

    const additionalStoreDiagnostics: tsApiSync.Diagnostic[] = [];
    for (const diagnostic of diagnostics) {
        if (
            (diagnostic.code === DiagnosticCode.NO_OVERLOAD_MATCHES_CALL ||
                diagnostic.code === DiagnosticCode.ARG_TYPE_X_NOT_ASSIGNABLE_TO_TYPE_Y) &&
            !notGenerated(diagnostic) &&
            diagnostic.fileName
        ) {
            const virtualSpan = mappingContext.ensureVirtualSpan(diagnostic);
            if (!virtualSpan) {
                continue;
            }
            if (isStoreVariableIn$storeDeclaration(sourceFile.getFullText(), virtualSpan.pos)) {
                const storeName = sourceFile
                    .getFullText()
                    .substring(virtualSpan.pos, virtualSpan.end);
                const symbol = tsApiProject.checker.getSymbolAtPosition(
                    diagnostic.fileName,
                    get$storeOffsetOf$storeDeclaration(sourceFile.getFullText(), virtualSpan.pos)
                );
                if (!symbol) {
                    continue;
                }
                const storeUsages = tsApiProject.checker.getReferencesToSymbolInFile(
                    diagnostic.fileName,
                    symbol
                );
                for (const storeUsage of storeUsages) {
                    const node = storeUsage.resolve(tsApiProject);
                    if (!node) {
                        continue;
                    }
                    const span: tsAst.ReadonlyTextRange = {
                        pos: getStartOfNode(tsAstModule, node, sourceFile),
                        end: node.end
                    };
                    additionalStoreDiagnostics.push(
                        markAsNeedMapping({
                            ...diagnostic,
                            text:
                                `Cannot use '${storeName}' as a store. '${storeName}' needs to be an object with a subscribe method on it.\n\n` +
                                diagnostic.text,
                            pos: span.pos,
                            end: span.end
                        })
                    );
                }
            }
        }
    }
    diagnostics.push(...additionalStoreDiagnostics);

    diagnostics = diagnostics
        .filter(notGenerated)
        .filter(
            (diagnostic) =>
                !isUnusedReactiveStatementLabel(
                    tsAstModule,
                    tsApiProject,
                    diagnostic,
                    mappingContext
                )
        )
        .filter(
            (diagnostic) =>
                !expectedTransitionThirdArgument(
                    tsAstModule,
                    diagnostic,
                    sourceFile,
                    tsApiProject,
                    mappingContext
                )
        );

    diagnostics = resolveNoopsInReactiveStatements(
        tsAstModule,
        tsApiProject,
        tsDoc,
        diagnostics,
        mappingContext
    );

    const source =
        sourceFile.scriptKind === ts.ScriptKind.TSX || sourceFile.scriptKind === ts.ScriptKind.TS
            ? 'ts'
            : 'js';
    const noFalsePositive = isNoFalsePositive(document, tsDoc);
    const converted: Diagnostic[] = [];
    const get$$PropsDefWithCache = memoize(() => get$$PropsDef(tsAstModule, sourceFile));
    const get$$PropsAliasInfoWithCache = memoize(() =>
        get$$PropsAliasForInfo(
            tsAstModule,
            tsApiModule,
            tsApiProject,
            get$$PropsDefWithCache,
            document
        )
    );

    for (const tsDiag of diagnostics) {
        const message = flattenDiagnosticMessage(tsDiag);
        const propsErrorRedirect = movePropsErrorRangeBackIfNecessary(
            tsAstModule,
            { message, pos: tsDiag.pos },
            tsDoc,
            get$$PropsDefWithCache,
            get$$PropsAliasInfoWithCache
        );
        let diagnostic: Diagnostic = {
            range: propsErrorRedirect ?? mappingContext.onMapToOriginalRange(tsDiag, message),
            severity: mapSeverity(tsDiag.category),
            source,
            message,
            code: tsDiag.code,
            tags: getDiagnosticTag(tsDiag)
        };

        moveBindingErrorMessage(tsDiag, tsDoc, diagnostic, mappingContext);

        if (!hasNoNegativeLines(diagnostic) || !noFalsePositive(diagnostic)) {
            continue;
        }

        if (isPositionEqual(diagnostic.range.start, diagnostic.range.end)) {
            adjustDirectiveRange(diagnostic, document);
        }

        diagnostic = adjustIfNecessary(diagnostic, document.isSvelte5);
        diagnostic = swapDiagRangeStartEndIfNecessary(diagnostic);
        converted.push(diagnostic);
    }

    return converted;
}

function adjustDirectiveRange(diagnostic: Diagnostic, document: Document) {
    const attributeContext = getAttributeContextAtPosition(document, diagnostic.range.start);
    if (!attributeContext || attributeContext.inValue) {
        return;
    }

    const colonIndex = attributeContext.name.indexOf(':');
    if (colonIndex === -1) {
        return;
    }

    const attributeStart = document
        .getText()
        .lastIndexOf(attributeContext.name, document.offsetAt(diagnostic.range.start));
    const end = attributeStart + attributeContext.name.length;
    const start = attributeStart + colonIndex + 1;

    diagnostic.range.start = document.positionAt(start);
    diagnostic.range.end = document.positionAt(end);
}

function flattenDiagnosticMessage(diag: tsApiSync.Diagnostic, level = 0): string {
    if (!diag.messageChain) {
        return diag.text;
    }

    let messages = [diag.text];
    for (let i = 0; i < diag.messageChain.length; i++) {
        const chainedDiag = diag.messageChain[i];
        if (chainedDiag.code === CONTENT_MAPPER_UNMAPPED_CODE) {
            continue;
        }
        const indent = '  '.repeat(level + 1);
        messages.push(indent + flattenDiagnosticMessage(chainedDiag, level + 1));
    }
    return messages.join('\n');
}

function moveBindingErrorMessage(
    tsDiag: tsApiSync.Diagnostic,
    tsDoc: SourceFileDiagnosticContext,
    diagnostic: Diagnostic,
    mappingContext: DiagnosticsMappingContext
) {
    if (tsDiag.code !== DiagnosticCode.TYPE_X_NOT_ASSIGNABLE_TO_TYPE_Y) {
        return;
    }

    const virtualPos = mappingContext.ensureVirtualSpan(tsDiag);
    if (virtualPos && tsDoc.getText(virtualPos.pos, virtualPos.end).endsWith('.$$bindings')) {
        let node = tsDoc.svelteNodeAt(diagnostic.range.start);
        while (node && node.type !== 'InlineComponent') {
            node = node.parent!;
        }
        if (node) {
            let name = tsDoc.getText(virtualPos.pos, virtualPos.end + 100);
            const quoteIdx = name.indexOf("'");
            name = name.substring(quoteIdx + 1, name.indexOf("'", quoteIdx + 1));
            const binding: any = node.attributes.find(
                (attr: any) => attr.type === 'Binding' && attr.name === name
            );
            if (binding) {
                // try to make the error more readable for english users
                if (
                    diagnostic.message.startsWith("Type '") &&
                    diagnostic.message.includes("is not assignable to type '")
                ) {
                    const idx = diagnostic.message.indexOf(`Type '"`) + `Type '"`.length;
                    const propName = diagnostic.message.substring(
                        idx,
                        diagnostic.message.indexOf('"', idx)
                    );
                    diagnostic.message =
                        "Cannot use 'bind:' with this property. It is declared as non-bindable inside the component.\n" +
                        `To mark a property as bindable: 'let { ${propName} = $bindable() } = $props()'`;
                } else {
                    diagnostic.message =
                        "Cannot use 'bind:' with this property. It is declared as non-bindable inside the component.\n" +
                        `To mark a property as bindable: 'let { prop = $bindable() } = $props()'\n\n` +
                        diagnostic.message;
                }
                diagnostic.range = {
                    start: tsDoc.svelteDocument.positionAt(binding.start),
                    end: tsDoc.svelteDocument.positionAt(binding.end)
                };
            }
        }
    }
}

function findDiagnosticNode(
    tsAstModule: typeof tsAst,
    diagnostic: tsApiSync.Diagnostic,
    sourceFile: tsAst.SourceFile,
    mappingContext: DiagnosticsMappingContext
) {
    const virtualPos = mappingContext.ensureVirtualSpan(diagnostic);
    if (!virtualPos) {
        return undefined;
    }
    const touchingNode = tsAstModule.getTouchingToken(sourceFile, virtualPos.pos);
    if (touchingNode.end === virtualPos.end) {
        return touchingNode;
    }
    if (!touchingNode.parent) {
        return undefined;
    }
    let current: tsAst.Node | undefined = touchingNode.parent;
    while (current.pos === touchingNode.pos) {
        if (current.end === virtualPos.end) {
            return current;
        }
        current = current.parent;
    }
}

function markAsNeedMapping(diagnostic: tsApiSync.Diagnostic): tsApiSync.Diagnostic {
    const fakeNonExactMapping: tsApiSync.Diagnostic = {
        code: CONTENT_MAPPER_UNMAPPED_CODE,
        text: '',
        pos: 0,
        end: 0,
        category: ts.DiagnosticCategory.Error
    };
    if (diagnostic.messageChain) {
        diagnostic.messageChain.unshift(fakeNonExactMapping);
    } else {
        diagnostic.messageChain = [fakeNonExactMapping];
    }
    return diagnostic;
}

function copyDiagnosticAndChangeNode(
    tsAstModule: typeof tsAst,
    diagnostic: tsApiSync.Diagnostic,
    tsDoc: SourceFileDiagnosticContext
) {
    return (node: tsAst.Node): tsApiSync.Diagnostic => {
        const start = getStartOfNode(tsAstModule, node, tsDoc.getSourceFile());

        return markAsNeedMapping({
            ...diagnostic,
            startPosition: undefined,
            endPosition: undefined,
            pos: start,
            end: node.end
        });
    };
}

/**
 * In some rare cases mapping of diagnostics does not work and produces negative lines.
 * We filter out these diagnostics with negative lines because else the LSP
 * apparently has a hickup and does not show any diagnostics at all.
 */
function hasNoNegativeLines(diagnostic: Diagnostic): boolean {
    return diagnostic.range.start.line >= 0 && diagnostic.range.end.line >= 0;
}

const generatedVarRegex = /'\$\$_\w+(\.\$on)?'/;

function isNoFalsePositive(document: Document, tsDoc: SourceFileDiagnosticContext) {
    const usesPug = document.getLanguageAttribute('template') === 'pug';

    return (diagnostic: Diagnostic) => {
        if (
            [DiagnosticCode.MULTIPLE_PROPS_SAME_NAME, DiagnosticCode.DUPLICATE_IDENTIFIER].includes(
                diagnostic.code as number
            )
        ) {
            const node = tsDoc.svelteNodeAt(diagnostic.range.start);
            if (isAttributeName(node, 'Element') || isEventHandler(node, 'Element')) {
                return false;
            }
        }

        if (
            diagnostic.code === DiagnosticCode.DEPRECATED_SIGNATURE &&
            generatedVarRegex.test(diagnostic.message)
        ) {
            // Svelte 5: $on and constructor is deprecated, but we don't want to show this warning for generated code
            return false;
        }

        return !usesPug || isNoPugFalsePositive(diagnostic, document);
    };
}

/**
 * All diagnostics inside the template tag and the unused import/variable diagnostics
 * are marked as false positive.
 */
function isNoPugFalsePositive(diagnostic: Diagnostic, document: Document): boolean {
    return (
        !isRangeInTag(diagnostic.range, document.templateInfo) &&
        diagnostic.code !== DiagnosticCode.NEVER_READ &&
        diagnostic.code !== DiagnosticCode.ALL_IMPORTS_UNUSED
    );
}

/**
 * Some diagnostics have JSX-specific or confusing nomenclature. Enhance/adjust them for more clarity.
 */
function adjustIfNecessary(diagnostic: Diagnostic, isSvelte5Plus: boolean): Diagnostic {
    if (
        diagnostic.code === DiagnosticCode.ARG_TYPE_X_NOT_ASSIGNABLE_TO_TYPE_Y &&
        diagnostic.message.includes('ConstructorOfATypedSvelteComponent')
    ) {
        return {
            ...diagnostic,
            message:
                diagnostic.message +
                '\n\nPossible causes:\n' +
                '- You use the instance type of a component where you should use the constructor type\n' +
                '- Type definitions are missing for this Svelte Component. ' +
                (isSvelte5Plus
                    ? ''
                    : 'If you are using Svelte 3.31+, use SvelteComponentTyped to add a definition:\n' +
                      '  import type { SvelteComponentTyped } from "svelte";\n' +
                      '  class ComponentName extends SvelteComponentTyped<{propertyName: string;}> {}')
        };
    }

    if (diagnostic.code === DiagnosticCode.MODIFIERS_CANNOT_APPEAR_HERE) {
        return {
            ...diagnostic,
            message:
                diagnostic.message +
                '\nIf this is a declare statement, move it into <script context="module">..</script>'
        };
    }

    return diagnostic;
}

/**
 * Due to source mapping, some ranges may be swapped: Start is end. Swap back in this case.
 */
function swapDiagRangeStartEndIfNecessary(diag: Diagnostic): Diagnostic {
    diag.range = swapRangeStartEndIfNecessary(diag.range);
    return diag;
}

/**
 * Checks if diagnostic is not within a section that should be completely ignored
 * because it's purely generated.
 */
function isNotGeneratedVirtualSpan(text: string) {
    return (diagnostic: tsApiSync.Diagnostic) => {
        return !isInGeneratedCode(text, diagnostic.pos, diagnostic.end);
    };
}

function isNotGeneratedContentMapper(text: string) {
    return (diagnostic: tsApiSync.Diagnostic) => {
        const hasUnMappableError = diagnostic.messageChain?.find(
            (message) => message.code === CONTENT_MAPPER_UNMAPPED_CODE
        );
        if (!hasUnMappableError) {
            return true;
        }

        return !isInGeneratedCode(text, diagnostic.pos, diagnostic.end);
    };
}

function isUnusedReactiveStatementLabel(
    tsApiModule: typeof tsAst,
    project: tsApiSync.Project,
    diagnostic: tsApiSync.Diagnostic,
    mappingContext: DiagnosticsMappingContext
) {
    if (diagnostic.code !== DiagnosticCode.UNUSED_LABEL) {
        return false;
    }

    const sourceFile = diagnostic.fileName && project.program.getSourceFile(diagnostic.fileName);
    if (!sourceFile) {
        return false;
    }
    const diagNode = findDiagnosticNode(tsApiModule, diagnostic, sourceFile, mappingContext);
    if (!diagNode) {
        return false;
    }

    // TS warning targets the identifier
    if (!tsApiModule.isIdentifier(diagNode)) {
        return false;
    }

    if (!diagNode.parent) {
        return false;
    }
    return isReactiveStatement(tsApiModule, diagNode.parent);
}

/**
 * Checks if diagnostics should be ignored because they report an unused expression* in
 * a reactive statement, and those actually have side effects in Svelte (hinting deps).
 *
 *     $: x, update()
 *
 * Only `let` (i.e. reactive) variables are ignored. For the others, new diagnostics are
 * emitted, centered on the (non reactive) identifiers in the initial warning.
 */
function resolveNoopsInReactiveStatements(
    tsAstModule: typeof tsAst,
    project: tsApiSync.Project,
    tsDoc: SourceFileDiagnosticContext,
    diagnostics: tsApiSync.Diagnostic[],
    mappingContext: DiagnosticsMappingContext
) {
    const notLet = (node: tsAst.Node) => {
        const declaration = project.checker.getSymbolAtLocation(node)?.valueDeclaration;
        if (!declaration || declaration.kind !== tsAstModule.SyntaxKind.VariableDeclaration) {
            return true;
        }

        const declarationNode = declaration.resolve(project);
        if (!declarationNode || !tsAstModule.isVariableDeclarationList(declarationNode.parent)) {
            return true;
        }
        return (declarationNode.parent.flags & tsAstModule.NodeFlags.Let) === 0;
    };

    const expandRemainingNoopWarnings = (
        diagnostic: tsApiSync.Diagnostic
    ): void | tsApiSync.Diagnostic[] => {
        const { code, fileName } = diagnostic;

        // guard: not target error
        const isNoopDiag = code === DiagnosticCode.NOOP_IN_COMMAS;
        if (!isNoopDiag) {
            return;
        }

        const sourceFile = tsDoc.getSourceFile();
        const diagNode = findDiagnosticNode(tsAstModule, diagnostic, sourceFile, mappingContext);
        if (!diagNode) {
            return;
        }

        if (!isInReactiveStatement(tsAstModule, diagNode)) {
            return;
        }

        const copyWorker = copyDiagnosticAndChangeNode(tsAstModule, diagnostic, tsDoc);
        return (
            // for all identifiers in diagnostic node
            gatherIdentifiers(tsAstModule, diagNode)
                // ignore `let` (i.e. reactive) variables
                .filter(notLet)
                // and create targeted diagnostics just for the remaining ids
                .map(copyWorker)
        );
    };

    const expandedDiagnostics = passMap(diagnostics, expandRemainingNoopWarnings).flat();
    return expandedDiagnostics.length === diagnostics.length
        ? expandedDiagnostics
        : // This can generate duplicate diagnostics
          expandedDiagnostics.filter(dedupDiagnostics());
}

function dedupDiagnostics() {
    const hashDiagnostic = (diag: tsApiSync.Diagnostic) =>
        [diag.pos, diag.end, diag.category, diag.fileName, diag.code]
            .map((x) => JSON.stringify(x))
            .join(':');

    const known = new Set();

    return (diag: tsApiSync.Diagnostic) => {
        const key = hashDiagnostic(diag);
        if (known.has(key)) {
            return false;
        } else {
            known.add(key);
            return true;
        }
    };
}

function get$$PropsAliasForInfo(
    tsAstModule: typeof tsAst,
    tsApiModule: typeof tsApiSync,
    project: tsApiSync.Project,
    get$$PropsDefWithCache: () => ReturnType<typeof get$$PropsDef>,
    document: Document
) {
    if (!/type\s+\$\$Props[\s\n]+=/.test(document.getText())) {
        return;
    }

    const propsDef = get$$PropsDefWithCache();
    if (!propsDef || !tsAstModule.isTypeAliasDeclaration(propsDef)) {
        return;
    }

    const type = project.checker.getTypeAtLocation(propsDef.name);
    if (!type) {
        return;
    }

    // TS says symbol is always defined but it's not
    // TODO no API for getting the aliased symbol?
    // const rootSymbolName = (type.aliasSymbol ?? type.symbol)?.name;
    const rootSymbol = type.getSymbol();
    if (!rootSymbol) {
        return;
    }
    if (rootSymbol.flags & tsApiModule.SymbolFlags.TypeLiteral) {
        const node = rootSymbol.declarations?.[0]?.resolve(project);
        if (!node || !tsAstModule.isTypeAliasDeclaration(node.parent) || !node.parent.name) {
            return;
        }
        return [node.parent.name.text, propsDef] as const;
    }
    const rootSymbolName = type.getSymbol()?.name;
    if (!rootSymbolName) {
        return;
    }

    return [rootSymbolName, propsDef] as const;
}

function get$$PropsDef(tsAstModule: typeof tsAst, sourceFile: tsAst.SourceFile) {
    const renderFunction = sourceFile.statements.find(
        (statement): statement is tsAst.FunctionDeclaration =>
            tsAstModule.isFunctionDeclaration(statement) &&
            statement.name?.text === internalHelpers.renderName
    );
    return renderFunction?.body?.statements.find(
        (node): node is tsAst.TypeAliasDeclaration | tsAst.InterfaceDeclaration =>
            (tsAstModule.isTypeAliasDeclaration(node) ||
                tsAstModule.isInterfaceDeclaration(node)) &&
            node.name.text === '$$Props'
    );
}

function movePropsErrorRangeBackIfNecessary(
    tsAstModule: typeof tsAst,
    diagnostic: { message: string; pos: number },
    tsDoc: SourceFileDiagnosticContext,
    get$$PropsDefWithCache: () => ReturnType<typeof get$$PropsDef>,
    get$$PropsAliasForWithCache: () => ReturnType<typeof get$$PropsAliasForInfo>
): Range | undefined {
    const fullText = tsDoc.getFullText();
    if (!fullText.includes('$$Props')) {
        return;
    }
    const possibly$$PropsError = isAfterSvelte2TsxPropsReturn(fullText, diagnostic.pos);
    if (!possibly$$PropsError) {
        return;
    }

    if (diagnostic.message.includes('$$Props')) {
        const propsDef = get$$PropsDefWithCache();
        if (!propsDef) {
            return;
        }
        const generatedPropsStart = getStartOfNode(
            tsAstModule,
            propsDef.name,
            propsDef.getSourceFile()
        );
        const propsStart = tsDoc.mapToOriginalPos(generatedPropsStart);

        return {
            start: propsStart.position,
            end: {
                ...propsStart.position,
                character: propsStart.position.character + '$$Props'.length
            }
        };
    }

    const aliasForInfo = get$$PropsAliasForWithCache();
    if (!aliasForInfo) {
        return;
    }

    const [aliasFor, propsDef] = aliasForInfo;
    if (diagnostic.message.includes(aliasFor)) {
        const start = getStartOfNode(tsAstModule, propsDef.name, propsDef.getSourceFile());
        const end = propsDef.name.end;
        const mapped = tsDoc.mapToOriginalRange({ pos: start, end });
        return mapped.range;
    }
}

function expectedTransitionThirdArgument(
    tsAstModule: typeof tsAst,
    diagnostic: tsApiSync.Diagnostic,
    sourceFile: tsAst.SourceFile,
    project: tsApiSync.Project,
    mappingContext: DiagnosticsMappingContext
) {
    if (diagnostic.code !== DiagnosticCode.EXPECTED_N_ARGUMENTS) {
        return false;
    }

    const virtualPos = mappingContext.ensureVirtualSpan(diagnostic);
    if (
        !virtualPos ||
        !sourceFile.text.slice(0, virtualPos.pos).endsWith('__sveltets_2_ensureTransition(')
    ) {
        return false;
    }

    const node = findDiagnosticNode(tsAstModule, diagnostic, sourceFile, mappingContext);
    if (!node || !tsAstModule.isIdentifier(node)) {
        return false;
    }
    if (!node.parent || !tsAstModule.isCallExpression(node.parent)) {
        return false;
    }
    const callExpression = node.parent;
    const signature = callExpression && project.checker.getResolvedSignature(callExpression);

    if (!signature) {
        return false;
    }

    // TypeScript 7 rc and older nightly have parameters field instead of getParameters method
    const parameters: tsApiSync.Symbol[] =
        'getParameters' in signature ? signature.getParameters() : (signature as any).parameters;

    return (
        parameters?.filter((parameter) => !(parameter.flags & ts.SymbolFlags.Optional)).length === 3
    );
}
function getDiagnosticTag(tsDiag: tsApiSync.Diagnostic): DiagnosticTag[] | undefined {
    const tags: DiagnosticTag[] = [];
    if (tsDiag.reportsUnnecessary) {
        tags.push(DiagnosticTag.Unnecessary);
    }
    if (tsDiag.reportsDeprecated) {
        tags.push(DiagnosticTag.Deprecated);
    }
    return tags;
}
