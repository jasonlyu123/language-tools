import fs from 'node:fs';
import path from 'node:path';
import { internalHelpers } from 'svelte2tsx';
import ts from 'typescript';
import { Position, Range } from 'vscode-languageserver-types';
import { getPackageInfo, importSvelte } from '../../../importPackage';
import { Document, getNodeIfIsInStartTag, mapRangeToOriginal } from '../../../lib/documents';
import { FileMap } from '../../../lib/documents/fileCollection';
import { Logger } from '../../../logger';
import { normalizePath, urlToPath } from '../../../utils';
import { SvelteNode } from '../../svelte/features/svelte-ast-utils';
import {
    DocumentSnapshot,
    SvelteDocumentSnapshot,
    SvelteSnapshotOptions
} from '../../typescript/DocumentSnapshot';
import { SourceFileDiagnosticContext } from '../SvelteSourceFileDocument';
import { tsApiSync, tsAst, tsFs } from '../types';
import { hasNonZeroRange, isSvelteFilePath } from '../../typescript/utils';
import { DiagnosticCode } from '../../typescript/features/DiagnosticsProvider';

export interface TS7_0_FileSystemEntries {
    files: string[];
    directories: string[];
}
export interface TS7_0_FileSystem {
    directoryExists?: (directoryName: string) => boolean | undefined;
    fileExists?: (fileName: string) => boolean | undefined;
    getAccessibleEntries?: (directoryName: string) => TS7_0_FileSystemEntries | undefined;
    /**
     * Read a file's content.
     * - Return the file content as a `string` (including `""` for empty files).
     * - Return `null` to indicate the file does not exist (without falling back to the real FS).
     * - Return `undefined` to fall back to the real filesystem.
     */
    readFile?: (fileName: string) => string | null | undefined;
    realpath?: (path: string) => string | undefined;
    writeFile?: (path: string, content: string) => void;
    removeFile?: (path: string) => void;
}

export class SvelteSnapshotDiagnosticsContext implements SourceFileDiagnosticContext {
    private tsAstModule: typeof tsAst;
    private tsDoc: SvelteDocumentSnapshot;
    private sourceFile: tsAst.SourceFile;

    constructor(
        tsAstModule: typeof tsAst,
        snapshot: SvelteDocumentSnapshot,
        sourceFile: tsAst.SourceFile
    ) {
        this.tsAstModule = tsAstModule;
        this.tsDoc = snapshot;
        this.sourceFile = sourceFile;
    }
    get svelteDocument() {
        return this.tsDoc.parent;
    }

    getSourceFile(): tsAst.SourceFile {
        return this.sourceFile;
    }

    getText(start: number, end: number): string {
        return this.tsDoc.getText(start, end);
    }

    getFullText(): string {
        return this.tsDoc.getFullText();
    }

    svelteNodeAt(positionOrOffset: number | Position): SvelteNode | null {
        return this.tsDoc.svelteNodeAt(positionOrOffset);
    }

    mapToOriginalRange(span: tsAst.ReadonlyTextRange) {
        const range = mapRangeToOriginal(
            this.tsDoc,
            Range.create(this.tsDoc.positionAt(span.pos), this.tsDoc.positionAt(span.end))
        );

        return {
            range,
            fidelity:
                range.start.line < 0
                    ? this.tsAstModule.SpanMapFidelity.None
                    : this.tsAstModule.SpanMapFidelity.Exact
        };
    }

    mapToOriginalPos(position: number) {
        const originalPos = this.tsDoc.getOriginalPosition(this.tsDoc.positionAt(position));
        return {
            position: originalPos,
            fidelity:
                originalPos.line < 0
                    ? this.tsAstModule.SpanMapFidelity.None
                    : this.tsAstModule.SpanMapFidelity.Exact
        };
    }
}

const VIRTUAL_SUFFIX = '_virtual__';
const SVELTE_EXT_LENGTH = '.svelte'.length;
const D_SVELTE_TS_EXTENSION = '.d.svelte.ts';
const D_SVELTE_TS_LENGTH = D_SVELTE_TS_EXTENSION.length;
const SVELTE_DTS_EXTENSION = '.svelte.d.ts';

export class LegacyDiagnosticApiService {
    private readonly virtualFiles: FileMap<string> = new FileMap();
    private readonly ambientTypesSource: string;
    private readonly snapshotOptions: SvelteSnapshotOptions;
    private createDocument: (filePath: string, content: string) => Document;
    private readonly projectConfig: ts.ParsedCommandLine;
    private readonly tsconfigPath: string;
    private readonly files: FileMap<DocumentSnapshot>;

    public readonly virtualTsconfigPath: string;

    constructor(
        projectConfig: ts.ParsedCommandLine,
        tsconfigPath: string,
        ambientTypesSource: string,
        createDocument: (filePath: string, content: string) => Document,
        files: FileMap<DocumentSnapshot>
    ) {
        this.tsconfigPath = tsconfigPath;
        this.virtualTsconfigPath = path.join(
            path.dirname(tsconfigPath),
            `tsconfig_virtual_config.json`
        );
        this.createDocument = createDocument;
        this.ambientTypesSource = ambientTypesSource;
        this.files = files;
        const sveltePackage = importSvelte(tsconfigPath);
        this.snapshotOptions = {
            parse: sveltePackage.parse,
            transformOnTemplateError: false,
            typingsNamespace: 'svelteHTML',
            version: sveltePackage.VERSION,
            emitJsDoc: true
        };

        this.projectConfig = projectConfig;
        if (this.projectConfig?.raw.svelteOptions?.namespace) {
            this.snapshotOptions.typingsNamespace = this.projectConfig.raw.svelteOptions.namespace;
        }
        this.writeVirtualTsconfig();
    }

    createFsProxy(
        serverFS: typeof tsFs.serverFS
    ): Required<
        Pick<tsFs.FileSystemCallbacks, 'readFile' | 'fileExists' | 'getAccessibleEntries'>
    > {
        const service = this;
        const kitFiles: Parameters<typeof internalHelpers.isKitFile>[1] = {
            serverHooksPath: 'src/hooks.client',
            clientHooksPath: 'src/hooks.client',
            universalHooksPath: 'src/hooks',
            paramsPath: 'src/params'
        };

        return {
            getAccessibleEntries(directory: string) {
                const realFiles: string[] = [];
                const directories: string[] = [];
                const resultFiles: string[] = [];
                const symlinks: string[] = [];
                try {
                    const entries = fs.readdirSync(directory, { withFileTypes: true });
                    for (const entry of entries) {
                        if (entry.isFile()) {
                            realFiles.push(entry.name);
                        } else if (entry.isDirectory()) {
                            directories.push(entry.name);
                        } else if (entry.isSymbolicLink()) {
                            symlinks.push(entry.name);
                        }
                    }
                    for (const file of realFiles) {
                        addFileEntry(path.join(directory, file), realFiles, resultFiles);
                    }
                    return {
                        files: resultFiles,
                        directories,
                        symlinks
                    };
                } catch (error) {
                    Logger.error(`Error reading directory ${directory}:`, error);
                    return serverFS.error;
                }
            },
            readFile(path: string) {
                const normalizedPath = normalizePath(path);
                const virtualEntry = service.virtualFiles.get(normalizedPath);
                if (virtualEntry !== undefined) {
                    return virtualEntry;
                }

                if (normalizedPath.endsWith('node_modules/svelte/types/ambient.d.ts')) {
                    return '';
                }

                if (
                    normalizedPath.endsWith('node_modules/svelte/types/index.d.ts') ||
                    internalHelpers.isKitFile(normalizedPath, kitFiles)
                ) {
                    const snapshot = DocumentSnapshot.fromFilePath(
                        normalizedPath,
                        service.createDocument,
                        service.snapshotOptions,
                        ts.sys
                    );
                    service.files.set(normalizedPath, snapshot);
                    return snapshot.getFullText();
                }

                return serverFS?.useOS;
            },
            fileExists(filePath: string) {
                const virtualFiles = service.virtualFiles;

                if (
                    filePath.includes(VIRTUAL_SUFFIX) &&
                    virtualFiles.has(normalizePath(filePath))
                ) {
                    return true;
                }

                if (filePath.endsWith(D_SVELTE_TS_EXTENSION)) {
                    if (virtualFiles.has(normalizePath(filePath)) || fs.existsSync(filePath)) {
                        return true;
                    }

                    const withoutExtension = filePath.slice(0, -D_SVELTE_TS_LENGTH);
                    const svelteDtsPath = withoutExtension + SVELTE_DTS_EXTENSION;
                    if (fs.existsSync(svelteDtsPath)) {
                        service.addDtsRedirect(filePath, path.basename(svelteDtsPath));
                        return true;
                    }
                    const targetSvelteFile = withoutExtension + '.svelte';
                    if (fs.existsSync(targetSvelteFile)) {
                        const virtualBaseName = service.addVirtualSvelteFile(targetSvelteFile);
                        service.addDtsRedirect(filePath, virtualBaseName);
                        return true;
                    }
                }

                return serverFS?.useOS;
            }
        };

        function addFileEntry(fullPath: string, realFiles: string[], resultFiles: string[]) {
            const name = path.basename(fullPath);
            if (!fullPath.endsWith('.svelte')) {
                resultFiles.push(name);
                return;
            }

            const virtualBaseName = service.addVirtualSvelteFile(fullPath);
            resultFiles.push(virtualBaseName);
            const dSvelteTsPath = changeExtension(fullPath, D_SVELTE_TS_EXTENSION);
            const dSvelteTsName = path.basename(dSvelteTsPath);
            if (realFiles.includes(dSvelteTsName)) {
                return;
            }
            const svelteDtsName = changeExtension(name, SVELTE_DTS_EXTENSION);
            const dSvelteTsTarget = realFiles.includes(svelteDtsName)
                ? svelteDtsName
                : virtualBaseName;
            service.addDtsRedirect(dSvelteTsPath, dSvelteTsTarget);
            resultFiles.push(dSvelteTsName);
        }
    }

    private writeVirtualTsconfig() {
        const commandLine = this.projectConfig;
        const tsconfigPath = this.tsconfigPath;
        const sveltePackageInfo = getPackageInfo('svelte', this.virtualTsconfigPath);

        let svelteTsPath: string;
        try {
            // For when svelte2tsx/svelte-check is part of node_modules, for example VS Code extension
            svelteTsPath = path.dirname(require.resolve(this.ambientTypesSource));
        } catch (e) {
            // Fall back to dirname
            svelteTsPath = __dirname;
        }

        const svelteTsxFiles = internalHelpers.get_global_types(
            ts.sys,
            sveltePackageInfo.version.major === 3,
            sveltePackageInfo.path,
            svelteTsPath,
            undefined
        );

        const filesConfig = commandLine.raw.files;
        const rebasedFiles: string[] = [];
        if (filesConfig) {
            for (const file of filesConfig) {
                if (file.endsWith('.svelte')) {
                    const virtualBaseName = this.addVirtualSvelteFile(
                        path.join(path.dirname(tsconfigPath), file)
                    );
                    rebasedFiles.push(virtualBaseName);
                    // let fileExists handle the .d.svelte.ts redirection
                } else {
                    rebasedFiles.push(file);
                }
            }
        }
        const virtualTsConfigContent = JSON.stringify({
            extends: './' + path.basename(tsconfigPath),
            compilerOptions: { allowArbitraryExtensions: true, noEmit: true },
            files: rebasedFiles.concat(svelteTsxFiles),
            // otherwise only "files" will be included and not the default "everything"
            include: commandLine.raw.include ? undefined : ['**/*']
        });
        this.virtualFiles.set(normalizePath(this.virtualTsconfigPath), virtualTsConfigContent);
    }

    private addVirtualSvelteFile(filePath: string) {
        const svelteFile = DocumentSnapshot.fromFilePath(
            filePath,
            this.createDocument,
            this.snapshotOptions,
            ts.sys
        );
        const normalizedPath = normalizePath(filePath);
        this.files.set(normalizedPath, svelteFile);

        const virtualPath = toVirtualPath(svelteFile);
        this.virtualFiles.set(virtualPath, svelteFile.getFullText());
        const virtualBasename = path.basename(virtualPath);

        return virtualBasename;
    }

    private addDtsRedirect(dSvelteTsPath: string, targetFileName: string) {
        const specifierFileName = targetFileName.endsWith(SVELTE_DTS_EXTENSION)
            ? targetFileName.replace(SVELTE_DTS_EXTENSION, '.svelte.js')
            : changeExtension(targetFileName, '.js');
        const dtsImportPath = './' + specifierFileName;
        const dtsContent = `export { default } from "${dtsImportPath}";\nexport * from "${dtsImportPath}";\n`;
        this.virtualFiles.set(normalizePath(dSvelteTsPath), dtsContent);
    }

    watchUpdate(
        doc: { text: string; uri: string },
        kind: 'created' | 'changed' | 'deleted',
        pendingChanges: {
            created: Set<string>;
            changed: Set<string>;
            deleted: Set<string>;
        }
    ) {
        const filePath = urlToPath(doc.uri) || '';
        const normalizedPath = normalizePath(filePath);
        if (kind === 'created') {
            if (isSvelteFilePath(normalizedPath)) {
                // trigger project files invalidation should be enough
                pendingChanges.created.add(changeExtension(normalizedPath, D_SVELTE_TS_EXTENSION));
            } else {
                pendingChanges.created.add(normalizedPath);
            }
        } else if (kind === 'deleted') {
            pendingChanges.deleted.add(normalizedPath);
        } else if (kind === 'changed') {
            let changedPath = normalizedPath;
            if (this.files.has(normalizedPath)) {
                const newSnapshot = DocumentSnapshot.fromFilePath(
                    filePath,
                    this.createDocument,
                    this.snapshotOptions,
                    ts.sys
                );
                if (newSnapshot instanceof SvelteDocumentSnapshot) {
                    changedPath = toVirtualPath(newSnapshot);
                }
                this.virtualFiles.set(changedPath, newSnapshot.getFullText());
                this.files.set(normalizedPath, newSnapshot);
            }
            pendingChanges.changed.add(changedPath);
        }
    }

    onMapToOriginalRange(
        file: SourceFileDiagnosticContext,
        diagnostic: tsApiSync.Diagnostic,
        flattenMessage: string
    ) {
        const result = file.mapToOriginalRange({
            pos: diagnostic.pos,
            end: diagnostic.end
        }).range;
        const document = file.svelteDocument;

        if (
            ([DiagnosticCode.MISSING_PROP, DiagnosticCode.MISSING_PROPS].includes(
                diagnostic.code as number
            ) ||
                (DiagnosticCode.TYPE_X_NOT_ASSIGNABLE_TO_TYPE_Y &&
                    flattenMessage.includes("'Properties<"))) &&
            !hasNonZeroRange({ range: result })
        ) {
            const node = getNodeIfIsInStartTag(document.html, document.offsetAt(result.start));
            if (node) {
                // This is a "some prop missing" error on a component -> remap
                result.start = document.positionAt(node.start + 1);
                result.end = document.positionAt(node.start + 1 + (node.tag?.length || 1));
            }
        }

        return result;
    }
}

function changeExtension(path: string, newExtension: string) {
    return path.slice(0, path.lastIndexOf('.')) + newExtension;
}

export function toVirtualPath(snapshot: DocumentSnapshot) {
    const ext = snapshot.scriptKind === ts.ScriptKind.TS ? '.ts' : '.js';
    return normalizePath(snapshot.filePath.slice(0, -SVELTE_EXT_LENGTH) + VIRTUAL_SUFFIX + ext);
}

export function toRealPath(path: string) {
    if (!path.includes(VIRTUAL_SUFFIX)) {
        return path;
    }
    return path.slice(0, -3).replace(VIRTUAL_SUFFIX, '') + '.svelte';
}
