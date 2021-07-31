import path from 'path';
import ts from 'typescript';
import assert from 'assert';
import { Document, DocumentManager } from '../../../../src/lib/documents';
import { pathToUrl } from '../../../../src/utils';
import { Position, CompletionTriggerKind, TextEdit } from 'vscode-languageserver';
import { CompletionsProviderImpl } from '../../../../src/plugins/typescript/features/CompletionProvider';
import { LSAndTSDocResolver } from '../../../../src/plugins';
import { LSConfigManager } from '../../../../src/ls-config';

const testDir = path.join(__dirname, '..');
const testFilesDir = path.join(testDir, 'testfiles', 'completions', 'type-only');

describe.only('auto import type only', () => {
    async function setup(filename: string, position: Position, label: string) {
        const docManager = new DocumentManager(
            (textDocument) => new Document(textDocument.uri, textDocument.text)
        );
        const lsAndTsDocResolver = new LSAndTSDocResolver(
            docManager,
            [pathToUrl(testDir)],
            new LSConfigManager()
        );
        const completionProvider = new CompletionsProviderImpl(lsAndTsDocResolver);
        const filePath = path.join(testFilesDir, filename);
        const document = docManager.openDocument(<any>{
            uri: pathToUrl(filePath),
            text: ts.sys.readFile(filePath) || ''
        });

        const items = await completionProvider.getCompletions(document, position, {
            triggerKind: CompletionTriggerKind.Invoked
        });

        const item = items!.items.find((item) => item.label === label);

        return completionProvider.resolveCompletion(document, item!);
    }

    it('add new type-only import when the exist is normal import', async () => {
        const item = await setup(
            'exist-value.svelte',
            {
                line: 3,
                character: 15
            },
            'Type'
        );

        assert.deepStrictEqual(item.additionalTextEdits, <TextEdit[]>[
            {
                newText: `import type { Type } from "./to-import";${ts.sys.newLine}`,
                range: {
                    start: {
                        line: 2,
                        character: 0
                    },
                    end: {
                        line: 2,
                        character: 0
                    }
                }
            }
        ]);
    });

    it('add new normal import when the exist is type-only import', async () => {
        const item = await setup(
            'exist-type.svelte',
            {
                line: 4,
                character: 25
            },
            'Value'
        );

        assert.deepStrictEqual(item.additionalTextEdits, <TextEdit[]>[
            {
                newText: `import { Value } from "./to-import";${ts.sys.newLine}`,
                range: {
                    start: {
                        line: 2,
                        character: 0
                    },
                    end: {
                        line: 2,
                        character: 0
                    }
                }
            }
        ]);
    });

    it('add to type-only import when both exists and value is on top', async () => {
        const item = await setup(
            'exist-both-value-top.svelte',
            {
                line: 7,
                character: 17
            },
            'Type2'
        );

        assert.deepStrictEqual(item.additionalTextEdits, <TextEdit[]>[
            {
                newText: ', Type2',
                range: {
                    start: {
                        line: 2,
                        character: 22
                    },
                    end: {
                        line: 2,
                        character: 22
                    }
                }
            }
        ]);
    });

    it('add to normal import when both exists and type is on top', async () => {
        const item = await setup(
            'exist-both-type-top.svelte',
            {
                line: 7,
                character: 23
            },
            'Value2'
        );

        assert.deepStrictEqual(item.additionalTextEdits, <TextEdit[]>[
            {
                newText: ', Value2',
                range: {
                    start: {
                        line: 2,
                        character: 18
                    },
                    end: {
                        line: 2,
                        character: 18
                    }
                }
            }
        ]);
    });
});
