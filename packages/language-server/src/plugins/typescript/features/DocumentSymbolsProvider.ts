import { CancellationToken } from 'vscode-languageserver-protocol';
import { SymbolInformation, DocumentSymbol, SymbolKind, Range } from 'vscode-languageserver-types';
import { Document, getTextInRange, mapDocumentSymbolToOriginal, mapSymbolInformationToOriginal } from '../../../lib/documents';
import { DocumentSymbolsProvider, Resolvable } from '../../interfaces';
import { NavigationTree } from 'typescript';
import { isNotNullOrUndefined, isZeroLengthRange } from '../../../utils';
import { isAttributeName, isAttributeShorthand, isEventHandler } from '../svelte-ast-utils';
import { isInScript, symbolKindFromString } from '../utils';
import { LSAndTSDocResolver } from '../LSAndTSDocResolver';
import { LSConfigManager } from '../../../ls-config';
import { SvelteDocumentSnapshot } from '../DocumentSnapshot';

export class DocumentSymbolsProviderImpl implements DocumentSymbolsProvider {
    constructor(
        private readonly lsAndTsDocResolver: LSAndTSDocResolver,
        private readonly configManager: LSConfigManager
    ) {}

    async getDocumentSymbols(
        document: Document,
        cancellationToken?: CancellationToken
    ): Promise<SymbolInformation[]> {
        const { lang, tsDoc } = await this.lsAndTsDocResolver.getLsForSyntheticOperations(document);

        if (cancellationToken?.isCancellationRequested) {
            return [];
        }

        const navTree = lang.getNavigationTree(tsDoc.filePath);

        const symbols: SymbolInformation[] = [];
        collectSymbols(navTree, undefined, (symbol) => symbols.push(symbol));

        const topContainerName = symbols[0].name;
        const result: SymbolInformation[] = [];

        for (let symbol of symbols.slice(1)) {
            if (symbol.containerName === topContainerName) {
                symbol.containerName = 'script';
            }

            symbol = mapSymbolInformationToOriginal(tsDoc, symbol);

            if (
                symbol.location.range.start.line < 0 ||
                symbol.location.range.end.line < 0 ||
                isZeroLengthRange(symbol.location.range) ||
                symbol.name.startsWith('__sveltets_')
            ) {
                continue;
            }

            if (
                (symbol.kind === SymbolKind.Property || symbol.kind === SymbolKind.Method) &&
                !isInScript(symbol.location.range.start, document)
            ) {
                if (
                    symbol.name === 'props' &&
                    document.getText().charAt(document.offsetAt(symbol.location.range.start)) !==
                        'p'
                ) {
                    // This is the "props" of a generated component constructor
                    continue;
                }
                const node = tsDoc.svelteNodeAt(symbol.location.range.start);
                if (
                    (node && (isAttributeName(node) || isAttributeShorthand(node))) ||
                    isEventHandler(node)
                ) {
                    // This is a html or component property, they are not treated as a new symbol
                    // in JSX and so we do the same for the new transformation.
                    continue;
                }
            }

            if (symbol.name === '<function>') {
                let name = getTextInRange(symbol.location.range, document.getText()).trimLeft();
                if (name.length > 50) {
                    name = name.substring(0, 50) + '...';
                }
                symbol.name = name;
            }

            if (symbol.name.startsWith('$$_')) {
                if (!symbol.name.includes('$on')) {
                    continue;
                }
                // on:foo={() => ''}   ->   $on("foo") callback
                symbol.name = symbol.name.substring(symbol.name.indexOf('$on'));
            }

            result.push(symbol);
        }

        return result;

        function collectSymbols(
            tree: NavigationTree,
            container: string | undefined,
            cb: (symbol: SymbolInformation) => void
        ) {
            const start = tree.spans[0];
            const end = tree.spans[tree.spans.length - 1];
            if (start && end) {
                cb(
                    SymbolInformation.create(
                        tree.text,
                        symbolKindFromString(tree.kind),
                        Range.create(
                            tsDoc.positionAt(start.start),
                            tsDoc.positionAt(end.start + end.length)
                        ),
                        tsDoc.getURL(),
                        container
                    )
                );
            }
            if (tree.childItems) {
                for (const child of tree.childItems) {
                    collectSymbols(child, tree.text, cb);
                }
            }
        }
    }
    async getHierarchicalDocumentSymbols(
        document: Document,
        cancellationToken?: CancellationToken
    ): Promise<DocumentSymbol[]> {
        const { lang, tsDoc } = await this.lsAndTsDocResolver.getLsForSyntheticOperations(document);

        if (cancellationToken?.isCancellationRequested) {
            return [];
        }

        const navTree = lang.getNavigationTree(tsDoc.filePath);

        const toplevel = this.convertToDocumentSymbol(navTree, tsDoc);
        if (!toplevel) {
            return [];
        }

        toplevel.name = 'script';
        const result = [toplevel].map((symbol) => mapDocumentSymbolToOriginal(tsDoc, symbol));

        return result;
    }

    private convertToDocumentSymbol(
        tree: NavigationTree,
        tsDoc: SvelteDocumentSnapshot
    ): DocumentSymbol | undefined {
        const start = tree.spans[0];
        const end = tree.spans[tree.spans.length - 1];
        if (start && end) {
            return DocumentSymbol.create(
                tree.text,
                '',
                symbolKindFromString(tree.kind),
                Range.create(
                    tsDoc.positionAt(start.start),
                    tsDoc.positionAt(end.start + end.length)
                ),
                Range.create(
                    tsDoc.positionAt(start.start),
                    tsDoc.positionAt(end.start + end.length)
                ),
                tree.childItems
                    ?.map((child) => this.convertToDocumentSymbol(child, tsDoc))
                    .filter(isNotNullOrUndefined)
            );
        }

        return undefined;
    }
}
