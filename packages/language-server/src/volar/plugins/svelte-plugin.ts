import { LanguageServicePlugin } from '@volar/language-server';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { URI } from 'vscode-uri';
import { SvelteVirtualDocument } from '../languagePlugin';
import { SveltePlugin } from '../../plugins';
import { LSConfigManager } from '../../ls-config';

export const create = (): LanguageServicePlugin => {
    return {
        name: 'svelte',
        capabilities: {},
        create(context) {
            const lsConfigManager = new LSConfigManager();

            const sveltePlugin = new SveltePlugin(lsConfigManager);

            return {
                provideDiagnostics(textDocument, cancellationToken) {
                    const document = getDocument(textDocument);

                    if (!document) {
                        return [];
                    }

                    return sveltePlugin.getDiagnostics(document, cancellationToken);
                },

                provideCompletionItems(textDocument, position, context, cancellationToken) {
                    const document = getDocument(textDocument);

                    if (!document) {
                        return;
                    }

                    return sveltePlugin.getCompletions(document, position);
                },

                provideCodeActions(textDocument, range, context, cancellationToken) {
                    const document = getDocument(textDocument);

                    if (!document) {
                        return [];
                    }

                    return sveltePlugin.getCodeActions(document, range, context, cancellationToken);
                },

                provideDocumentFormattingEdits(textDocument, _, options) {
                    const document = getDocument(textDocument);

                    if (!document) {
                        return [];
                    }

                    return sveltePlugin.formatDocument(document, options);
                },

                // provideSelectionRanges(textDocument, positions) {
                //     const document = getDocument(textDocument);

                //     if (!document) {
                //         return [];
                //     }

                //     return sveltePlugin.getSelectionRange(document, positions);
                // }
            };

            function getDocument(document: TextDocument) {
                const decoded = context.decodeEmbeddedDocumentUri(URI.parse(document.uri));
                if (decoded?.[1] !== 'svelte') {
                    return;
                }
                const virtualCode =
                    decoded && context.language.scripts.get(decoded[0])?.generated?.root;

                return virtualCode instanceof SvelteVirtualDocument ? virtualCode : undefined;
            }
        }
    };
};
