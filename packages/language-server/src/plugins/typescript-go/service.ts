// import { PublishDiagnosticsParams } from 'vscode-languageserver-protocol';
// import { createGetCanonicalFileName, normalizePath } from '../../utils';
// import type tsApi from '@typescript/api' with { 'resolution-mode': 'import' };
// import type tsFsApi from '@typescript/api/fs' with { 'resolution-mode': 'import' };
// import type tsProto from '@typescript/api/proto' with { 'resolution-mode': 'import' };
// import fs from 'node:fs';
// import path from 'path';
// import { getNearestWorkspaceUri } from '../typescript/utils';

// // export interface TsGoLSContext {
// //     isSvelteCheck: boolean;
// //     ambientTypesSource: string;
// //     transformOnTemplateError: boolean;
// //     reportConfigError: ((diagnostics: PublishDiagnosticsParams) => void) | undefined;
// //     nonRecursiveWatchPattern: string | undefined;
// //     tsModule: typeof tsApi
// //     useCaseSensitiveFileNames: boolean;
// //     tsFileSystem: tsFS.FileSystem;
// // }

// export interface TsApiOptions {
//     tsModule: typeof tsApi;
//     tsFsModule: typeof tsFsApi;
//     tsserverPath: string;
// }

// export interface ProjectContainer {
//     project: tsApi.Project;
//     config: tsProto.ConfigResponse;
// }

// export class TsApiService {
//     tsAPI: tsApi.API;
//     tsFileSystem: tsFsApi.FileSystem;

//     private readonly getCanonicalFileName: (fileName: string) => string;
//     private readonly useCaseSensitiveFileNames: boolean;
//     private readonly projects = new Map<string, ProjectContainer>();
//     private readonly parsedTsConfigFiles = new Map<string, tsProto.ConfigResponse>();
//     private readonly configFileForOpenFiles = new Map<string, string>();

//     constructor(options: TsApiOptions) {
//         this.useCaseSensitiveFileNames = !fs.existsSync(__filename.toUpperCase());
//         this.getCanonicalFileName = createGetCanonicalFileName(this.useCaseSensitiveFileNames);
//         this.tsFileSystem = TsApiService.#createFs();
//         this.tsAPI = new options.tsModule.API({
//             tsserverPath: options.tsserverPath,
//             fs: this.tsFileSystem
//         });
//     }

//     getOrCreateProject(path: string): ProjectContainer {
//         const canonicalPath = this.getCanonicalFileName(path);
//         let project = this.projects.get(canonicalPath);
//         if (project) {
//             return project;
//         }

//         let tsconfigPath =
//             this.#findTsConfigFile(canonicalPath, 'tsconfig.json') ||
//             this.#findTsConfigFile(canonicalPath, 'jsconfig.json');

//         if (tsconfigPath) {
//             /**
//              * Prevent infinite loop when the project reference is circular
//              */
//             const triedTsConfig = new Set<string>();
//             const needAssign = !this.configFileForOpenFiles.has(path);
//             let project = this.#getConfiguredService(tsconfigPath);
//             if (!needAssign) {
//                 return project;
//             }

//             // First try to find a service whose includes config matches our file
//             const defaultService = this.#findDefaultServiceForFile(path, project, triedTsConfig);
//             if (defaultService) {
//                 this.configFileForOpenFiles.set(path, defaultService.project.configFileName);
//                 return defaultService;
//             }

//             // If no such service found, see if the file is part of any existing service indirectly.
//             // This can happen if the includes doesn't match the file but it was imported from one of the included files.
//             for (const configPath of triedTsConfig) {
//                 const service = this.#getConfiguredService(configPath);
//                 if (service.project.getSourceFile(path)) {
//                     return service;
//                 }
//             }

//             tsconfigPath = '';
//         }

//         // Find closer boundary: workspace uri or node_modules
//         // const nearestWorkspaceUri = getNearestWorkspaceUri(
//         //     workspaceUris,
//         //     path,
//         //     this.getCanonicalFileName
//         // );
//         // const lastNodeModulesIdx = path.split('/').lastIndexOf('node_modules') + 2;
//         // const nearestNodeModulesBoundary =
//         //     lastNodeModulesIdx === 1
//         //         ? undefined
//         //         : path.split('/').slice(0, lastNodeModulesIdx).join('/');
//         // const nearestBoundary =
//         //     (nearestNodeModulesBoundary?.length ?? 0) > (nearestWorkspaceUri?.length ?? 0)
//         //         ? nearestNodeModulesBoundary
//         //         : nearestWorkspaceUri;

//         return {
//             project: this.tsAPI.loadProject(''),
//             config: {
//                 options: {},
//                 fileNames: []
//             }
//         };
//     }

//     #findDefaultServiceForFile(
//         path: string,
//         service: ProjectContainer,
//         triedTsConfig: Set<string>
//     ) {
//         // service.ensureProjectFileUpdates(path);
//         if (service.project.rootFiles.includes(this.getCanonicalFileName(path))) {
//             return service;
//         }
//         if (triedTsConfig.has(service.project.configFileName)) {
//             return;
//         }

//         triedTsConfig.add(service.project.configFileName);

//         // TODO: maybe add support for ts 5.6's ancestor searching
//         return this.#findDefaultFromProjectReferences(path, service, triedTsConfig);
//     }

//     #findDefaultFromProjectReferences(
//         path: string,
//         service: ProjectContainer,
//         triedTsConfig: Set<string>
//     ) {
//         throw new Error('Method not implemented.');
//     }

//     #findTsConfigFile(filePath: string, configFileName: string): string | undefined {
//         let currentPath = normalizePath(filePath);
//         for (const ancestor of forEachAncestor(currentPath)) {
//             const tsConfigPath = path.join(ancestor, configFileName);
//             if (this.tsFileSystem.fileExists?.(tsConfigPath)) {
//                 return tsConfigPath;
//             }
//         }

//         return undefined;
//     }

//     #getConfiguredService(tsconfigPath: string): ProjectContainer {
//         const canonicalTsConfigPath = this.getCanonicalFileName(tsconfigPath);
//         let container = this.projects.get(canonicalTsConfigPath);
//         if (container) {
//             return container;
//         }

//         const configResponse = this.tsAPI.parseConfigFile(canonicalTsConfigPath);

//         const project = this.tsAPI.loadProject(canonicalTsConfigPath);
//         container = {
//             project: project,
//             config: configResponse
//         };
//         this.projects.set(canonicalTsConfigPath, container);
//         this.parsedTsConfigFiles.set(canonicalTsConfigPath, configResponse);
//         return container;
//     }

//     static #createFs(): tsFsApi.FileSystem {
//         const fileExists = (fileName: string) => {
//             try {
//                 return fs.existsSync(fileName) && fs.statSync(fileName).isFile();
//             } catch (e) {
//                 return false;
//             }
//         };
//         return {
//             // directoryExists: (directoryName: string) => {
//             //     try {
//             //         return fs.existsSync(directoryName) && fs.statSync(directoryName).isDirectory();
//             //     } catch (e) {
//             //         return false;
//             //     }
//             // },
//             fileExists: (fileName: string) => {
//                 return isVirtualSvelteFilePath(fileName)
//                     ? fileExists(toRealSvelteFilePath(fileName))
//                     : fileExists(fileName);
//             },
//             // getAccessibleEntries: (directoryName: string) => {
//             //     const entries = fs.readdirSync(directoryName, { withFileTypes: true });
//             //     const directories: string[] = [];
//             //     const files: string[] = [];
//             //     for (const entry of entries) {
//             //         if (entry.isDirectory()) {
//             //             directories.push(entry.name);
//             //         } else if (entry.isFile()) {
//             //             files.push(entry.name);
//             //         }
//             //     }

//             //     return { directories, files };
//             // },
//             readFile: (fileName: string) => {
//                 if (isVirtualSvelteFilePath(fileName)) {
//                     fileName = toRealSvelteFilePath(fileName);
//                 }
//                 try {
//                     return fs.readFileSync(fileName, 'utf8');
//                 } catch (e) {
//                     return null;
//                 }
//             },
//             realpath(path) {
//                 if (isVirtualSvelteFilePath(path)) {
//                     return fs.realpathSync(toRealSvelteFilePath(path));
//                 }
//                 return fs.realpathSync(path);
//             },
//         };
//     }
// }

// function* forEachAncestor(path: string): Iterable<string> {
//     let currentPath = normalizePath(path);
//     while (currentPath) {
//         yield currentPath;
//         if (currentPath === '/' || currentPath.match(/^[a-zA-Z]:[\\/]/)) {
//             break;
//         }
//         const parentPath = currentPath.split('/').slice(0, -1).join('/');
//         currentPath = parentPath;
//     }
// }

// export function isVirtualSvelteFilePath(filePath: string) {
//     return filePath.endsWith('.d.svelte.ts');
// }
// export function toRealSvelteFilePath(filePath: string) {
//     return filePath.slice(0, -11 /* 'd.svelte.ts'.length */) + 'svelte';
// }
