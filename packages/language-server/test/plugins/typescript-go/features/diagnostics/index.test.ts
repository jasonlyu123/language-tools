import path from 'path';
import { normalizePath, pathToUrl } from '../../../../../src/utils';
import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { VERSION } from 'svelte/compiler';
import { SvelteCheckTSGoDiagnosticsProvider } from '../../../../../src/plugins/typescript-go/features/DiagnosticsProvider';
import { describe } from 'mocha';
import {
    createJsonSnapshotFormatter,
    updateSnapshotIfFailedOrEmpty
} from '../../../typescript/test-utils';
import { Document } from '../../../../../src/lib/documents';
import ts from 'typescript';
import { getPackageInfo } from '../../../../../src/importPackage';
import assert from 'assert';
import { ContentMapperDiagnosticsProvider } from '../../../../../src/plugins/typescript-go/features/ContentMapperDiagnosticsProvider';

const isSvelte5Plus = Number(VERSION.split('.')[0]) >= 5;

const root = path.join(__dirname, '../../../typescript/features/diagnostics');

const {
    version: { major }
} = getPackageInfo('svelte', __dirname);
const expected = 'expectedv2.json';
const newSvelteMajorExpected = `expected_svelte_${major}.json`;
const expectedTsGo = 'expected_tsgo.json';
const newSvelteMajorExpectedTsGo = `expected_tsgo_svelte_${major}.json`;

const skips = [
    // Has to do with project assignment so not related to svelte-check --tsconfig support.
    '/fixtures/project-reference/nested',
    '/fixtures/project-reference/paths'
];

const providerPoolLegacy = new Map<string, SvelteCheckTSGoDiagnosticsProvider>();
const providerPool = new Map<string, ContentMapperDiagnosticsProvider>();

describe.skip('SvelteCheckTSGoDiagnosticsProvider', function () {
    const fixturesDir = path.join(root, 'fixtures');
    executeTests({
        dir: fixturesDir,
        workspaceDir: fixturesDir,
        contentMapperMode: false
    });

    after(() => {
        for (const provider of providerPool.values()) {
            provider.dispose();
        }
        providerPool.clear();
    });
});

describe.only('SvelteCheckTSGoDiagnosticsProvider 2', function () {
    const fixturesDir = path.join(root, 'fixtures');
    executeTests({
        dir: fixturesDir,
        workspaceDir: fixturesDir,
        contentMapperMode: true
    });

    after(() => {
        for (const provider of providerPoolLegacy.values()) {
            provider.dispose();
        }
        providerPoolLegacy.clear();
    });
});

function executeTests(testOptions: { dir: string; workspaceDir: string; contentMapperMode: boolean }) {
    const { dir } = testOptions;

    const inputFile = path.join(dir, 'input.svelte');
    const getService = setupService(testOptions.dir, testOptions.contentMapperMode);

    if (existsSync(inputFile)) {
        const name = dir.substring(root.length);
        const _it =
            (dir.endsWith('.v5') && !isSvelte5Plus) || skips.includes(normalizePath(name))
                ? it.skip
                : dir.endsWith('.only')
                  ? it.only
                  : it;

        _it(name, async () => {
            const service = getService(testOptions.dir);
            await executeTest(inputFile, testOptions, service);
        });
    } else {
        const _describe = dir.endsWith('.only') ? describe.only : describe;
        _describe(dir.substring(root.length), function () {
            const subDirs = readdirSync(dir);

            for (const subDir of subDirs) {
                const stat = statSync(path.join(dir, subDir));
                if (stat.isDirectory()) {
                    executeTests({
                        ...testOptions,
                        dir: path.join(dir, subDir)
                    });
                }
            }
        });
    }
}

async function executeTest(
    inputFile: string,
    testOptions: { workspaceDir: string; dir: string },
    plugin: ContentMapperDiagnosticsProvider | SvelteCheckTSGoDiagnosticsProvider
) {
    const { dir } = testOptions;
    const document = new Document(pathToUrl(inputFile), ts.sys.readFile(inputFile) || '');
    const diagnostics = await plugin.getDiagnostics(document);

    const defaultExpectedFile = path.join(dir, expected);
    const expectedFileVariants = [
        path.join(dir, newSvelteMajorExpectedTsGo),
        path.join(dir, newSvelteMajorExpected),
        path.join(dir, expectedTsGo)
    ];
    const expectedFile = expectedFileVariants.find(existsSync) ?? defaultExpectedFile;
    const snapshotFormatter = await createJsonSnapshotFormatter(dir);

    await updateSnapshotIfFailedOrEmpty({
        assertion() {
            assert.deepStrictEqual(diagnostics, JSON.parse(readFileSync(expectedFile, 'utf-8')));
        },
        expectedFile,
        getFileContent() {
            return snapshotFormatter(diagnostics);
        },
        rootDir: __dirname
    });
}

function setupService(dir: string, contentMapperMode: boolean) {
    before(async () => {
        const tsconfig = ts.findConfigFile(dir, ts.sys.fileExists, 'tsconfig.json')!;
        if (providerPool.has(tsconfig)) {
            return;
        }
        const syncApi = await import('@typescript/native/unstable/sync');
        const tsAst = await import('@typescript/native/unstable/ast');
        if (contentMapperMode) {
            const service = new ContentMapperDiagnosticsProvider(
                syncApi,
                tsAst,
                tsconfig,
                (filePath, content) => new Document(pathToUrl(filePath), content)
            );
            providerPool.set(tsconfig, service);
        } else {
            const service = new SvelteCheckTSGoDiagnosticsProvider(
                syncApi,
                tsAst,
                tsconfig,
                'svelte2tsx',
                (filePath, content) => new Document(pathToUrl(filePath), content)
            );
            providerPoolLegacy.set(tsconfig, service);
        }
    });

    return getService;

    function getService(dir: string) {
        const tsconfig = ts.findConfigFile(dir, ts.sys.fileExists, 'tsconfig.json')!;
        const service = contentMapperMode ? providerPool.get(tsconfig) : providerPoolLegacy.get(tsconfig);
        if (!service) {
            throw new Error(`Service for ${tsconfig} not found`);
        }
        return service;
    }
}
