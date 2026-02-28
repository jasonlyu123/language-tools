import path from 'path';
import { Document } from '../../../src/lib/documents';
import {
    getService,
    LanguageServiceDocumentContext
} from '../../../src/plugins/typescript/service';
import { GlobalSnapshotsManager } from '../../../src/plugins/typescript/SnapshotManager';
import { pathToUrl } from '../../../src/utils';
import { createVirtualTsSystem } from './test-utils';

describe.only('incremental updates benchmark', () => {
    const testDir = path.join(__dirname, 'testfiles');
    function setup() {
        const virtualSystem = createVirtualTsSystem(testDir);

        const rootUris = [pathToUrl(testDir)];
        const lsDocumentContext: LanguageServiceDocumentContext = {
            isSvelteCheck: false,
            ambientTypesSource: 'svelte2tsx',
            createDocument(fileName, content) {
                return new Document(pathToUrl(fileName), content);
            },
            extendedConfigCache: new Map(),
            globalSnapshotsManager: new GlobalSnapshotsManager(virtualSystem),
            transformOnTemplateError: true,
            tsSystem: virtualSystem,
            watchTsConfig: false,
            notifyExceedSizeLimit: undefined,
            onProjectReloaded: undefined,
            projectService: undefined,
            nonRecursiveWatchPattern: undefined,
            watchDirectory: undefined,
            reportConfigError: undefined
        };

        return { virtualSystem, lsDocumentContext, rootUris };
    }

    it('new', async () => {
        benchmark(true);
    });

    it('old', async () => {
        benchmark(false);
    });


    async function benchmark(enableIncrementalUpdates: boolean) {
        const { virtualSystem, lsDocumentContext, rootUris } = setup();
        lsDocumentContext.enableIncrementalUpdates = enableIncrementalUpdates;
        const workspaceDir = path.join(testDir, enableIncrementalUpdates ? 'incremental' : 'non-incremental');

        const tsconfigPath = path.join(workspaceDir, 'tsconfig.json');
        virtualSystem.writeFile(
            tsconfigPath,
            JSON.stringify({ compilerOptions: { allowJs: true } })
        );
        const virtualFileName = path.join(workspaceDir, 'performance.svelte');

        const repeatFunctions: string[] = [];
        for (let i = 0; i < 1000; i++) {
            repeatFunctions.push(`function bar${i}() {}`);
        }
        const initContent = ['<script lang="ts">', 'function foo() {}'].concat(repeatFunctions, '</script>', '', '<div></div>');
        virtualSystem.writeFile(
            virtualFileName,
            initContent.join('\n')
        );
        const virtualFileName2 = path.join(workspaceDir, 'performance2.svelte');
        virtualSystem.writeFile(
            virtualFileName2,
            initContent.join('\n')
        );
        const lsContainer = await getService(virtualFileName, rootUris, lsDocumentContext);
        lsContainer.getService();
        const document = lsDocumentContext.createDocument(
            virtualFileName,
            virtualSystem.readFile(virtualFileName) || ''
        );
        const document2 = lsDocumentContext.createDocument(
            virtualFileName2,
            virtualSystem.readFile(virtualFileName2) || ''
        );
        const doc2InsertLine = 4 + repeatFunctions.length; // after the script tag

        const start = performance.now();
        for (let i = 0; i < 100; i++) {
            const edit = `\nfunction foo${i}() {}\n`;
            document.update([
                {
                    range: { start: { line: 1, character: 0 }, end: { line: 1, character: 0 } },
                    text: edit
                }
            ]);
            lsContainer.updateSnapshot(document);
            const edit2 = '\n<div></div>\n';
            document2.update([
                {
                    range: { start: { line: doc2InsertLine, character: 0 }, end: { line: doc2InsertLine, character: 0 } },
                    text: edit2
                }
            ]);
            lsContainer.updateSnapshot(document2);
            lsContainer.getService();
        }
        const elapse = Math.ceil(performance.now() - start);
        console.log(
            `incremental updates benchmark with enableIncrementalUpdates=${enableIncrementalUpdates} took ${elapse}ms`
        );
    }
});
