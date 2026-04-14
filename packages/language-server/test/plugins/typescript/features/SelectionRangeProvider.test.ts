import path from 'path';
import ts from 'typescript';
import assert from 'assert';
import { Position, SelectionRange } from 'vscode-languageserver';
import { Document, DocumentManager } from '../../../../src/lib/documents';
import { SelectionRangeProviderImpl } from '../../../../src/plugins/typescript/features/SelectionRangeProvider';
import { LSAndTSDocResolver } from '../../../../src/plugins/typescript/LSAndTSDocResolver';
import { pathToUrl } from '../../../../src/utils';
import { LSConfigManager } from '../../../../src/ls-config';
import { serviceWarmup } from '../test-utils';
import { SelectionRangeProvider } from '../../../../src/plugins';
import { setupSharedServices } from '../../typescript-go/test-utils';
import { TsGoSelectionRangeProvider } from '../../../../src/plugins/typescript-go/features/SelectionRangeProvider';

const testDir = path.join(__dirname, '..');
const selectionRangeTestDir = path.join(testDir, 'testfiles', 'selection-range');

describe('SelectionRangeProvider', function () {
    serviceWarmup(this, selectionRangeTestDir, pathToUrl(testDir));
    test(setup);

    function setup(fileName: string) {
        const docManager = new DocumentManager((textDocument) =>
            Document.createForTest(textDocument.uri, textDocument.text)
        );
        const filePath = path.join(testDir, 'testfiles', 'selection-range', fileName);
        const lsAndTsDocResolver = new LSAndTSDocResolver(
            docManager,
            [pathToUrl(testDir)],
            new LSConfigManager()
        );
        const provider = new SelectionRangeProviderImpl(lsAndTsDocResolver);
        const document = docManager.openClientDocument(<any>{
            uri: pathToUrl(filePath),
            text: ts.sys.readFile(filePath)
        });
        return { provider, document };
    }
});

describe('SelectionRangeProvider (TS GO)', function () {
    const getServices = setupSharedServices(selectionRangeTestDir);
    test(setup);

    function setup(fileName: string) {
        const { docManager, service } = getServices();
        const filePath = path.join(testDir, 'testfiles', 'selection-range', fileName);
        const provider = new TsGoSelectionRangeProvider(service);
        const document = docManager.openClientDocument(<any>{
            uri: pathToUrl(filePath),
            text: ts.sys.readFile(filePath)
        });
        return { provider, document };
    }
});

function test(
    setup: (fileName: string) => { provider: SelectionRangeProvider; document: Document }
) {
    it('provides selection range', async () => {
        const { provider, document } = setup('selection-range.svelte');

        // ts go doesn't provide selection range when cursor is at the end of the identifier
        // TODO: maybe report this later?
        const selectionRange = await provider.getSelectionRange(document, Position.create(1, 8));

        assert.deepStrictEqual(selectionRange, <SelectionRange>{
            parent: {
                parent: undefined,
                // let a;
                range: {
                    end: {
                        character: 10,
                        line: 1
                    },
                    start: {
                        character: 4,
                        line: 1
                    }
                }
            },
            // a
            range: {
                end: {
                    character: 9,
                    line: 1
                },
                start: {
                    character: 8,
                    line: 1
                }
            }
        });
    });

    it('provides selection range for import without semicolon', async () => {
        const { provider, document } = setup('selection-range-import.svelte');

        const selectionRange = await provider.getSelectionRange(document, Position.create(2, 28));
        // TODO: maybe report this later?
        const hasFullImportRange = provider instanceof SelectionRangeProviderImpl;

        assert.deepStrictEqual(selectionRange, <SelectionRange>{
            parent: {
                parent: {
                    parent: hasFullImportRange
                        ? {
                              parent: undefined,
                              range: {
                                  end: {
                                      character: 34,
                                      line: 2
                                  },
                                  start: {
                                      character: 4,
                                      line: 1
                                  }
                              }
                          }
                        : undefined,
                    // import {onMount} from 'svelte';
                    range: {
                        end: {
                            character: 34,
                            line: 2
                        },
                        start: {
                            character: 4,
                            line: 2
                        }
                    }
                },
                // 'svelte';
                range: {
                    end: {
                        character: 34,
                        line: 2
                    },
                    start: {
                        character: 26,
                        line: 2
                    }
                }
            },
            // svelte
            range: {
                end: {
                    character: 33,
                    line: 2
                },
                start: {
                    character: 27,
                    line: 2
                }
            }
        });
    });

    it('return null when in style', async () => {
        const { provider, document } = setup('selection-range.svelte');

        const selectionRange = await provider.getSelectionRange(document, Position.create(5, 0));

        assert.equal(selectionRange, null);
    });
}
