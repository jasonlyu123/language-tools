import * as assert from 'assert';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import ts from 'typescript';
import { Document, DocumentManager } from '../../../../../src/lib/documents';
import { LSConfigManager } from '../../../../../src/ls-config';
import { FoldingRangeProvider, LSAndTSDocResolver } from '../../../../../src/plugins';
import { FoldingRangeProviderImpl } from '../../../../../src/plugins/typescript/features/FoldingRangeProvider';
import { pathToUrl } from '../../../../../src/utils';
import {
    createJsonSnapshotFormatter,
    createSnapshotTester,
    updateSnapshotIfFailedOrEmpty
} from '../../test-utils';
import {
    createSnapshotTesterForTsGo,
    TsGoServiceSetupResult
} from '../../../typescript-go/test-utils';
import { TsGoFoldingRangeProvider } from '../../../../../src/plugins/typescript-go/features/FoldingRangeProvider';

function setupTs6(workspaceDir: string, filePath: string) {
    const docManager = new DocumentManager((textDocument) =>
        Document.createForTest(textDocument.uri, textDocument.text)
    );
    const configManager = new LSConfigManager();
    configManager.updateClientCapabilities({
        textDocument: { foldingRange: { lineFoldingOnly: true } }
    });
    const lsAndTsDocResolver = new LSAndTSDocResolver(
        docManager,
        [pathToUrl(workspaceDir)],
        configManager
    );
    const plugin = new FoldingRangeProviderImpl(lsAndTsDocResolver, configManager);
    const document = docManager.openClientDocument(<any>{
        uri: pathToUrl(filePath),
        text: ts.sys.readFile(filePath) || ''
    });
    return { plugin, document, docManager, lsAndTsDocResolver };
}

function setupForTsGo(filePath: string, services: TsGoServiceSetupResult) {
    const { docManager, lsConfigManager } = services;
    const plugin = new TsGoFoldingRangeProvider(services.service, lsConfigManager);
    const document = docManager.openClientDocument(<any>{
        uri: pathToUrl(filePath),
        text: ts.sys.readFile(filePath) || ''
    });
    return { plugin, document, docManager, lsConfigManager };
}

async function executeTest({
    dir,
    plugin,
    document,
    expected
}: {
    dir: string;
    plugin: FoldingRangeProvider;
    document: Document;
    expected: string;
}) {
    const folding = await plugin.getFoldingRanges(document);

    const expectedFile = join(dir, expected);
    if (process.argv.includes('--debug')) {
        writeFileSync(join(dir, 'debug.svelte'), appendFoldingAsComment());
    }

    const snapshotFormatter = await createJsonSnapshotFormatter(dir);

    await updateSnapshotIfFailedOrEmpty({
        assertion() {
            assert.deepStrictEqual(
                JSON.parse(JSON.stringify(folding)),
                JSON.parse(readFileSync(expectedFile, 'utf-8'))
            );
        },
        expectedFile,
        getFileContent() {
            return snapshotFormatter(folding);
        },
        rootDir: __dirname
    });

    function appendFoldingAsComment() {
        if (!folding) {
            return document.getText();
        }

        const offsetMap = new Map<number, string[]>();
        const lineLength = document
            .getText()
            .split('\n')
            .map((line) => (line[line.length - 1] === '\r' ? line.length - 1 : line.length));

        for (const fold of folding) {
            const startOffset = document.offsetAt({
                line: fold.startLine,
                character: lineLength[fold.startLine]
            });
            const endOffset = document.offsetAt({
                line: fold.endLine,
                character: lineLength[fold.endLine]
            });

            offsetMap.set(startOffset, (offsetMap.get(startOffset) ?? []).concat(`/*s*/`));
            offsetMap.set(endOffset, (offsetMap.get(endOffset) ?? []).concat(`/*e*/`));
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

const executeTestsTs6 = createSnapshotTester(async (inputFile: string, testOptions) => {
    const { plugin, document } = setupTs6(testOptions.workspaceDir, inputFile);
    await executeTest({
        plugin,
        document,
        dir: testOptions.dir,
        expected: 'expectedv2.json'
    });
});

const executeTestsTsGo = createSnapshotTesterForTsGo(
    async (inputFile, testOptions, services) => {
        const { plugin, document } = setupForTsGo(inputFile, services);
        await executeTest({
            plugin,
            document,
            dir: testOptions.dir,
            expected: existsSync(join(testOptions.dir, 'expected_tsgo.json'))
                ? 'expected_tsgo.json'
                : 'expectedv2.json'
        });
    },
    {
        textDocument: { foldingRange: { lineFoldingOnly: true } }
    }
);

describe('FoldingRangeProvider', function () {
    executeTestsTs6({
        dir: join(__dirname, 'fixtures'),
        workspaceDir: join(__dirname, 'fixtures'),
        context: this
    });
});

describe('FoldingRangeProvider TsGo', function () {
    executeTestsTsGo({
        dir: join(__dirname, 'fixtures'),
        workspaceDir: join(__dirname, 'fixtures'),
        context: this
    });
});
