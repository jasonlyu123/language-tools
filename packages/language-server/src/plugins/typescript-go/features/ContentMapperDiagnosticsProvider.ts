import type { FileSystem } from '@typescript/native/unstable/fs' with { 'resolution-mode': 'import' };
import fs from 'node:fs';
import { dirname } from 'node:path';
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
import { getPackageInfo, importSvelte } from '../../../importPackage';
import {
    Document,
    getLineOffsets,
    getNodeIfIsInStartTag,
    getTextInRange,
    isRangeInTag,
    mapRangeToOriginal,
    positionAt
} from '../../../lib/documents';
import { configLoader } from '../../../lib/documents/configLoader';
import { FileMap } from '../../../lib/documents/fileCollection';
import { Logger } from '../../../logger';
import {
    clamp,
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
    SvelteSnapshotOptions
} from '../../typescript/DocumentSnapshot';
import { DiagnosticCode } from '../../typescript/features/DiagnosticsProvider';
import {
    get$storeOffsetOf$storeDeclaration,
    isAfterSvelte2TsxPropsReturn,
    isInGeneratedCode,
    isStoreVariableIn$storeDeclaration
} from '../../typescript/features/utils';
import { isAttributeName, isEventHandler } from '../../typescript/svelte-ast-utils';
import { hasNonZeroRange, isSvelteFilePath, mapSeverity } from '../../typescript/utils';
import { tsApiSync, tsAst } from '../types';
import {
    gatherIdentifiers,
    getStartOfNode,
    isInReactiveStatement,
    isReactiveStatement
} from './utils';
import { SvelteSourceFileDocument } from '../SvelteSourceFileDocument';

const CONTENT_MAPPER_UNMAPPED_CODE = 100030;

export class ContentMapperDiagnosticsProvider implements DiagnosticsProvider {
    private readonly api: tsApiSync.API;
    private readonly tsApiModule: typeof tsApiSync;
    private readonly files: FileMap<DocumentSnapshot> = new FileMap();
    private readonly tsAstModule: typeof tsAst;
    private readonly tsconfigPath: string;
    /**
     * files is currently empty
     */
    private projectConfig: ts.ParsedCommandLine;
    private pendingConfigLoading: Promise<void> | undefined;

    private createDocument: (filePath: string, content: string) => Document;

    private pendingChanges = {
        created: new Set<string>(),
        changed: new Set<string>(),
        deleted: new Set<string>()
    };

    constructor(
        apiModule: typeof tsApiSync,
        tsAstModule: typeof tsAst,
        tsconfigPath: string,
        createDocument: (filePath: string, content: string) => Document
    ) {
        this.tsApiModule = apiModule;
        this.tsAstModule = tsAstModule;
        this.tsconfigPath = tsconfigPath;
        this.createDocument = createDocument;

        this.api = new apiModule.API({
            fs: this.createFsProxy(),
            runExternalCode: true
        });
        this.projectConfig = this.parseConfig();
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

        const sourceFile = project.program.getSourceFile(filePath);
        if (!sourceFile) {
            return [];
        }

        // const tsDoc = this.files.get(normalizePath(filePath));

        // if (!tsDoc || !(tsDoc instanceof SvelteDocumentSnapshot)) {
        //     return [];
        // }

        if (
            ['coffee', 'coffeescript'].includes(document.getLanguageAttribute('script')) ||
            cancellationToken?.isCancellationRequested
        ) {
            return [];
        }

        // // Document preprocessing failed, show parser error instead
        // const parserErrorDiag = getParserErrorDiagnostic(tsDoc);
        // if (parserErrorDiag) {
        //     return [parserErrorDiag];
        // }

        const diagnostics: tsApiSync.Diagnostic[] = [];
        const program = project.program;
        const batchedDiagnostics = this.api.batch(
            program.getSyntacticDiagnostics.gen(filePath),
            program.getSuggestionDiagnostics.gen(filePath),
            program.getSemanticDiagnostics.gen(filePath)
        );
        for (const diag of batchedDiagnostics) {
            diagnostics.push(...diag);
        }

        return mapAndFilterDiagnostics(
            this.tsAstModule,
            this.tsApiModule,
            project,
            diagnostics,
            new SvelteSourceFileDocument(this.tsAstModule, sourceFile, document)
        );
    }

    async getProject() {
        if (this.pendingConfigLoading) {
            await this.pendingConfigLoading;
            this.pendingConfigLoading = undefined;
        }
        const snapshot = this.api.updateSnapshot({
            openProject: this.tsconfigPath,
            fileChanges: {
                created: Array.from(this.pendingChanges.created),
                changed: Array.from(this.pendingChanges.changed),
                deleted: Array.from(this.pendingChanges.deleted)
            }
        });
        this.pendingChanges.created.clear();
        this.pendingChanges.changed.clear();
        this.pendingChanges.deleted.clear();
        const project = snapshot.getProject(this.tsconfigPath);
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
            const key = diag.fileName ?? this.tsconfigPath;
            let bucket = byFile.get(key);
            if (!bucket) {
                bucket = [];
                byFile.set(key, bucket);
            }
            bucket.push(diag);
        }

        const result: { filePath: string; diagnostics: Diagnostic[]; text: string }[] = [];
        for (const [fileName, diags] of byFile) {
            const tsDoc = this.files.get(normalizePath(fileName));

            if (tsDoc instanceof JSOrTSDocumentSnapshot) {
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
                continue;
            }

            const sourceFile = project.program.getSourceFile(fileName);
            if (!sourceFile?.spanMap) {
                result.push(this.covertDiagnosticsForUnopenedFile(sourceFile, fileName, diags));
                continue;
            }
            const sourceFileDoc = new SvelteSourceFileDocument(
                this.tsAstModule,
                sourceFile,
                this.createDocument(fileName, sourceFile.originalText)
            );
            const mappedDiags = mapAndFilterDiagnostics(
                this.tsAstModule,
                this.tsApiModule,
                project,
                diags,
                sourceFileDoc
            );
            result.push({
                filePath: fileName,
                text: sourceFile.getText(),
                diagnostics: mappedDiags
            });
        }

        return result;
    }

    async getDiagnosticsForPullMode(document: Document): Promise<DocumentDiagnosticReport> {
        return {
            items: await this.getDiagnostics(document),
            kind: 'full'
        };
    }

    watchUpdate(doc: { text: string; uri: string }, kind: 'created' | 'changed' | 'deleted') {
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

    getProjectConfig() {
        return this.projectConfig;
    }

    private createFsProxy(): Required<Pick<FileSystem, 'readFile'>> {
        const service = this;
        const kitFiles: Parameters<typeof internalHelpers.isKitFile>[1] = {
            serverHooksPath: 'src/hooks.client',
            clientHooksPath: 'src/hooks.client',
            universalHooksPath: 'src/hooks',
            paramsPath: 'src/params'
        };

        return {
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

                // undefined to signal api to read from disk by itself
                return undefined;
            }

            // If we can redirect .svelte.d.ts to .d.svelte.ts in LSP then add a fileExists proxy.
        };
    }

    private parseConfig() {
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
        sourceFile: tsAst.SourceFile | undefined,
        filePath: string,
        diagnostics: tsApiSync.Diagnostic[]
    ): { filePath: string; diagnostics: Diagnostic[]; text: string } {
        const text = sourceFile?.text ?? ts.sys.readFile(filePath) ?? '';
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

    dispose() {
        this.api.close();
    }
}

// function getParserErrorDiagnostic(tsDoc: SvelteDocumentSnapshot): Diagnostic | undefined {
//     if (!tsDoc.parserError) {
//         return;
//     }

//     return {
//         range: tsDoc.parserError.range,
//         severity: DiagnosticSeverity.Error,
//         source:
//             tsDoc.scriptKind === ts.ScriptKind.TSX || tsDoc.scriptKind === ts.ScriptKind.TS
//                 ? 'ts'
//                 : 'js',
//         message: tsDoc.parserError.message,
//         code: tsDoc.parserError.code
//     };
// }

type MapToVirtual = (diag: tsApiSync.Diagnostic) => tsAst.ReadonlyTextRange | undefined;

function mapAndFilterDiagnostics(
    tsAstModule: typeof tsAst,
    tsApiModule: typeof tsApiSync,
    tsApiProject: tsApiSync.Project,
    diagnostics: tsApiSync.Diagnostic[],
    tsDoc: SvelteSourceFileDocument
): Diagnostic[] {
    const document = tsDoc.svelteDocument;
    const sourceFile = tsDoc.getSourceFile();
    // For svelte-check tsgo, we called api to get all diagnostics instead of calling getDiagnostics for each file separately. So we also need to check parser error or coffeescript files here.
    if (['coffee', 'coffeescript'].includes(document.getLanguageAttribute('script'))) {
        return [];
    }

    // Document preprocessing failed, show parser error instead
    // const parserErrorDiag = getParserErrorDiagnostic(sourceFile);
    // if (parserErrorDiag) {
    //     return [parserErrorDiag];
    // }

    const notGenerated = isNotGenerated(sourceFile.getFullText());

    const mapToVirtual = (diag: tsApiSync.Diagnostic) =>
        mapToVirtualSpan(tsAstModule, diag, sourceFile);

    const additionalStoreDiagnostics: tsApiSync.Diagnostic[] = [];
    for (const diagnostic of diagnostics) {
        if (
            (diagnostic.code === DiagnosticCode.NO_OVERLOAD_MATCHES_CALL ||
                diagnostic.code === DiagnosticCode.ARG_TYPE_X_NOT_ASSIGNABLE_TO_TYPE_Y) &&
            !notGenerated(diagnostic) &&
            diagnostic.fileName
        ) {
            const virtualSpan = mapToVirtual(diagnostic);
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
                        pos: node.getStart(sourceFile),
                        end: node.end
                    };
                    const mapped = sourceFile.spanMap?.virtualToOriginalSpan(span);
                    if (mapped?.fidelity !== tsAstModule.SpanMapFidelity.Exact) {
                        continue;
                    }
                    additionalStoreDiagnostics.push({
                        ...diagnostic,
                        text:
                            `Cannot use '${storeName}' as a store. '${storeName}' needs to be an object with a subscribe method on it.\n\n` +
                            diagnostic.text,
                        pos: mapped.range.pos,
                        end: mapped.range.end,
                        startPosition: undefined,
                        endPosition: undefined
                    });
                }
            }
        }
    }
    diagnostics.push(...additionalStoreDiagnostics);

    diagnostics = diagnostics
        // .filter(notGenerated)
        .filter(
            (diagnostic) =>
                !isUnusedReactiveStatementLabel(tsAstModule, tsApiProject, diagnostic, mapToVirtual)
        )
        .filter(
            (diagnostic) =>
                !expectedTransitionThirdArgument(
                    tsAstModule,
                    diagnostic,
                    sourceFile,
                    tsApiProject,
                    mapToVirtual
                )
        );

    diagnostics = resolveNoopsInReactiveStatements(
        tsAstModule,
        tsApiProject,
        diagnostics,
        mapToVirtual
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
            { message, pos: tsDiag.pos },
            document,
            sourceFile,
            get$$PropsDefWithCache,
            get$$PropsAliasInfoWithCache
        );
        let diagnostic: Diagnostic = {
            range: propsErrorRedirect ?? {
                start: tsDiag.startPosition ?? document.positionAt(tsDiag.pos),
                end: tsDiag.endPosition ?? document.positionAt(tsDiag.end)
            },
            severity: mapSeverity(tsDiag.category),
            source,
            message,
            code: tsDiag.code,
            tags: getDiagnosticTag(tsDiag)
        };

        moveBindingErrorMessage(tsDiag, tsDoc, diagnostic, mapToVirtual);

        if (!hasNoNegativeLines(diagnostic) || !noFalsePositive(diagnostic)) {
            continue;
        }

        diagnostic = adjustIfNecessary(diagnostic, document.isSvelte5);
        diagnostic = swapDiagRangeStartEndIfNecessary(diagnostic);
        converted.push(diagnostic);
    }

    return converted;
}

function mapToVirtualSpan(
    tsAstModule: typeof tsAst,
    diag: tsApiSync.Diagnostic,
    sourceFile: tsAst.SourceFile
): tsAst.ReadonlyTextRange | undefined {
    const posIsVirtual = diag.messageChain?.some((v) => v.code == CONTENT_MAPPER_UNMAPPED_CODE);
    if (posIsVirtual) {
        return {
            pos: diag.pos,
            end: diag.end
        };
    }

    const virtualSpans = sourceFile.spanMap?.originalToVirtualSpans(
        diag,
        tsAstModule.SpanMapFeature.All
    );
    if (!virtualSpans || virtualSpans.length === 0) {
        return undefined;
    }

    if (virtualSpans.length === 1) {
        return virtualSpans[0].range;
    }
    return Array.from(virtualSpans).sort((a, b) => a.fidelity - b.fidelity)[0].range;
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
    tsDoc: SvelteSourceFileDocument,
    diagnostic: Diagnostic,
    mapToVirtual: MapToVirtual
) {
    if (tsDiag.code !== DiagnosticCode.TYPE_X_NOT_ASSIGNABLE_TO_TYPE_Y) {
        return;
    }

    const virtualPos = mapToVirtual(tsDiag);
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
    mapToVirtual: MapToVirtual
) {
    const virtualPos = mapToVirtual(diagnostic);
    if (!virtualPos) {
        return undefined;
    }
    const touchingNode = tsAstModule.getTouchingToken(sourceFile, virtualPos.pos);
    if (touchingNode.end === virtualPos.end) {
        return touchingNode;
    }
    let current: tsAst.Node | undefined = touchingNode.parent;
    while (current.pos === touchingNode.pos) {
        if (current.end === virtualPos.end) {
            return current;
        }
        current = current.parent;
    }
}

function copyDiagnosticAndChangeNode(
    diagnostic: tsApiSync.Diagnostic,
    sourceFile: tsAst.SourceFile
) {
    return (node: tsAst.Node): tsApiSync.Diagnostic => {
        const start = node.getStart(sourceFile);
        const end = node.end;
        const mapped = sourceFile.spanMap?.virtualToOriginalSpan({ pos: start, end }).range ?? {
            pos: start,
            end
        };
        return {
            ...diagnostic,
            startPosition: undefined,
            endPosition: undefined,
            pos: mapped.pos,
            end: mapped.end
        };
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

function isNoFalsePositive(document: Document, tsDoc: SvelteSourceFileDocument) {
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
function isNotGenerated(text: string) {
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
    mapToVirtual: (diag: tsApiSync.Diagnostic) => tsAst.ReadonlyTextRange | undefined
) {
    if (diagnostic.code !== DiagnosticCode.UNUSED_LABEL) {
        return false;
    }

    const sourceFile = diagnostic.fileName && project.program.getSourceFile(diagnostic.fileName);
    if (!sourceFile) {
        return false;
    }
    const diagNode = findDiagnosticNode(tsApiModule, diagnostic, sourceFile, mapToVirtual);
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
    diagnostics: tsApiSync.Diagnostic[],
    mapToVirtual: (diag: tsApiSync.Diagnostic) => tsAst.ReadonlyTextRange | undefined
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

        const sourceFile = fileName && project.program.getSourceFile(fileName);
        if (!sourceFile) {
            return;
        }
        const diagNode = findDiagnosticNode(tsAstModule, diagnostic, sourceFile, mapToVirtual);
        if (!diagNode) {
            return;
        }

        if (!isInReactiveStatement(tsAstModule, diagNode)) {
            return;
        }

        const copyWorker = copyDiagnosticAndChangeNode(diagnostic, sourceFile);
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
    diagnostic: { message: string; pos: number },
    document: Document,
    sourceFile: tsAst.SourceFile,
    get$$PropsDefWithCache: () => ReturnType<typeof get$$PropsDef>,
    get$$PropsAliasForWithCache: () => ReturnType<typeof get$$PropsAliasForInfo>
): Range | undefined {
    const possibly$$PropsError = isAfterSvelte2TsxPropsReturn(
        sourceFile.getFullText(),
        diagnostic.pos
    );
    if (!possibly$$PropsError || !sourceFile.spanMap) {
        return;
    }

    if (diagnostic.message.includes('$$Props')) {
        const propsDef = get$$PropsDefWithCache();
        if (!propsDef) {
            return;
        }
        const generatedPropsStart = propsDef.name.getStart(sourceFile);
        const propStartOffset =
            sourceFile.spanMap?.virtualToOriginalPosition(generatedPropsStart).position;
        const propsStart =
            propStartOffset != null ? document.positionAt(propStartOffset) : undefined;

        if (propsStart) {
            return {
                start: propsStart,
                end: { ...propsStart, character: propsStart.character + '$$Props'.length }
            };
        }

        return;
    }

    const aliasForInfo = get$$PropsAliasForWithCache();
    if (!aliasForInfo) {
        return;
    }

    const [aliasFor, propsDef] = aliasForInfo;
    if (diagnostic.message.includes(aliasFor)) {
        const start = propsDef.name.getStart(sourceFile);
        const end = propsDef.name.end;
        const mapped = sourceFile.spanMap.virtualToOriginalSpan({ pos: start, end });
        return {
            start: document.positionAt(mapped.range.pos),
            end: document.positionAt(mapped.range.end)
        };
    }
}

function expectedTransitionThirdArgument(
    tsAstModule: typeof tsAst,
    diagnostic: tsApiSync.Diagnostic,
    sourceFile: tsAst.SourceFile,
    project: tsApiSync.Project,
    mapToVirtual: (diag: tsApiSync.Diagnostic) => tsAst.ReadonlyTextRange | undefined
) {
    if (diagnostic.code !== DiagnosticCode.EXPECTED_N_ARGUMENTS) {
        return false;
    }

    const virtualPos = mapToVirtual(diagnostic);
    if (
        !virtualPos ||
        !sourceFile.text.slice(0, virtualPos.pos).endsWith('__sveltets_2_ensureTransition(')
    ) {
        return false;
    }

    const node = findDiagnosticNode(tsAstModule, diagnostic, sourceFile, mapToVirtual);
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
