import * as assert from 'assert';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import ts from 'typescript';
import { InlayHint } from 'vscode-languageserver-types';
import { Document, DocumentManager } from '../../../../../src/lib/documents';
import { LSConfigManager, TsInlayHintsConfig } from '../../../../../src/ls-config';
import { InlayHintProvider, LSAndTSDocResolver } from '../../../../../src/plugins';
import { TsGoInlayHintProvider } from '../../../../../src/plugins/typescript-go/features/InlayHintProvider';
import { InlayHintProviderImpl } from '../../../../../src/plugins/typescript/features/InlayHintProvider';
import { pathToUrl } from '../../../../../src/utils';
import {
    createSnapshotTesterForTsGo,
    TsGoServiceSetupResult
} from '../../../typescript-go/test-utils';
import {
    createJsonSnapshotFormatter,
    createSnapshotTester,
    updateSnapshotIfFailedOrEmpty
} from '../../test-utils';

function setup(workspaceDir: string, filePath: string) {
    const docManager = new DocumentManager((textDocument) =>
        Document.createForTest(textDocument.uri, textDocument.text)
    );
    const configManager = new LSConfigManager();
    setupConfigManager(configManager);
    const lsAndTsDocResolver = new LSAndTSDocResolver(
        docManager,
        [pathToUrl(workspaceDir)],
        configManager
    );
    const plugin = new InlayHintProviderImpl(lsAndTsDocResolver);
    const document = docManager.openClientDocument(<any>{
        uri: pathToUrl(filePath),
        text: ts.sys.readFile(filePath) || ''
    });
    return { plugin, document, docManager };
}

function setupConfigManager(configManager: LSConfigManager) {
    const allEnable: TsInlayHintsConfig = {
        enumMemberValues: { enabled: true },
        functionLikeReturnTypes: { enabled: true },
        parameterNames: { enabled: 'all', suppressWhenArgumentMatchesName: false },
        parameterTypes: { enabled: true },
        propertyDeclarationTypes: { enabled: true },
        variableTypes: { enabled: true, suppressWhenTypeMatchesName: false }
    };
    configManager.updateTsJsUserPreferences({
        typescript: {
            inlayHints: allEnable
        },
        javascript: {
            inlayHints: allEnable
        }
    });
}

function setupForTsGo(filePath: string, services: TsGoServiceSetupResult) {
    const plugin = new TsGoInlayHintProvider(services.service);
    setupConfigManager(services.lsConfigManager);
    const document = services.docManager.openClientDocument(<any>{
        uri: pathToUrl(filePath),
        text: ts.sys.readFile(filePath) || ''
    });
    return { plugin, document, docManager: services.docManager };
}

async function executeTest({
    plugin,
    document,
    workspaceDir,
    dir,
    expected
}: {
    workspaceDir: string;
    dir: string;
    plugin: InlayHintProvider;
    document: Document;
    expected: string;
}) {
    const workspaceUri = pathToUrl(workspaceDir);
    const inlayHints = sanitizeUri(
        await plugin.getInlayHints(document, {
            start: { line: 0, character: 0 },
            end: document.positionAt(document.getTextLength())
        })
    );

    const expectedFile = join(dir, expected);
    if (process.argv.includes('--debug')) {
        writeFileSync(join(dir, 'debug.svelte'), appendInlayHintAsComment());
    }

    const snapshotFormatter = await createJsonSnapshotFormatter(dir);

    await updateSnapshotIfFailedOrEmpty({
        assertion() {
            assert.deepStrictEqual(
                JSON.parse(JSON.stringify(inlayHints)),
                JSON.parse(readFileSync(expectedFile, 'utf-8'))
            );
        },
        expectedFile,
        getFileContent() {
            return snapshotFormatter(inlayHints);
        },
        rootDir: __dirname
    });

    function sanitizeUri(inlayHints: InlayHint[] | null) {
        if (!inlayHints) {
            return null;
        }

        for (const inlayHint of inlayHints) {
            if (!Array.isArray(inlayHint.label)) {
                continue;
            }

            for (const label of inlayHint.label) {
                if (label.location) {
                    if (
                        label.location.uri.endsWith('lib.dom.d.ts') &&
                        label.location.range.start.line > 0
                    ) {
                        label.location.uri = '<typescript_lib>/lib.dom.d.ts';
                        label.location.range = {
                            start: { line: -1, character: -1 },
                            end: { line: -1, character: -1 }
                        };
                    }
                    label.location.uri = label.location.uri.replace(workspaceUri, '<workspaceUri>');

                    const indexOfNodeModules = label.location.uri.lastIndexOf('node_modules');
                    if (indexOfNodeModules !== -1) {
                        label.location.uri =
                            '<node_modules>' +
                            label.location.uri.slice(indexOfNodeModules + 'node_modules'.length);
                    }
                }
            }
        }

        return inlayHints;
    }

    function appendInlayHintAsComment() {
        if (!inlayHints) {
            return document.getText();
        }

        const offsetMap = new Map<number, string[]>();
        for (const inlayHint of inlayHints) {
            const offset = document.offsetAt(inlayHint.position);
            const text = Array.isArray(inlayHint.label)
                ? inlayHint.label.map((l) => l.value).join('')
                : inlayHint.label;

            const comment = `/*${inlayHint.paddingLeft ? ' ' : ''}${text}${
                inlayHint.paddingRight ? ' ' : ''
            }*/`;
            offsetMap.set(offset, (offsetMap.get(offset) ?? []).concat(comment));
        }

        const offsets = Array.from(offsetMap.keys()).sort((a, b) => a - b);
        const parts: string[] = [];

        for (let index = 0; index < offsets.length; index++) {
            const offset = offsets[index];
            parts.push(
                document.getText().slice(offsets[index - 1], offset),
                ...(offsetMap.get(offset) ?? [])
            );
        }

        parts.push(document.getText().slice(offsets[offsets.length - 1]));

        return parts.join('');
    }
}

const executeTs6Tests = createSnapshotTester(async (inputFile, testOptions) => {
    const { plugin, document } = setup(testOptions.workspaceDir, inputFile);
    await executeTest({
        plugin,
        document,
        workspaceDir: testOptions.workspaceDir,
        dir: testOptions.dir,
        expected: 'expectedv2.json'
    });
});
const executeTsGoTests = createSnapshotTesterForTsGo(async (inputFile, testOptions, services) => {
    const { plugin, document } = setupForTsGo(inputFile, services);
    // ensure configuration is synced before running
    await services.service.syncConfiguration();
    await executeTest({
        plugin,
        document,
        workspaceDir: testOptions.workspaceDir,
        dir: testOptions.dir,
        expected: existsSync(join(testOptions.dir, 'expected_tsgo.json'))
            ? 'expected_tsgo.json'
            : 'expectedv2.json'
    });
});

describe('InlayHintProvider', function () {
    executeTs6Tests({
        dir: join(__dirname, 'fixtures'),
        workspaceDir: join(__dirname, 'fixtures'),
        context: this
    });
});

describe.only('InlayHintProvider (TS Go)', function () {
    executeTsGoTests({
        dir: join(__dirname, 'fixtures'),
        workspaceDir: join(__dirname, 'fixtures'),
        context: this
    });
});
