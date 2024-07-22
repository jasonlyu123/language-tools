import { LanguageServicePlugin, LanguageServicePluginInstance } from '@volar/language-server';
import { create as createHtmlService, Provide } from 'volar-service-html';
import {
    CompletionItem,
    CompletionItemKind,
    HTMLDocument,
    Position,
    TextDocument,
    TextEdit
} from 'vscode-html-languageservice';
import { isInsideMoustacheTag } from '../../lib/documents';
import { possiblyComponent } from '../../utils';

// TODO: ask if we can wire up the html document already parsed by our parser
// instead of passing preprocessed code

export function createHTMLPlugin(): LanguageServicePlugin {
    const htmlPlugin = createHtmlService();
    const styleScriptTemplate = new Set(['template', 'style', 'script']);

    return {
        ...htmlPlugin,
        create(context): LanguageServicePluginInstance<Provide> {
            const instance = htmlPlugin.create(context) as LanguageServicePluginInstance<Provide>;

            return {
                ...instance,
                async provideCompletionItems(document, position, context, token) {
                    const html = getHTML(document);
                    if (
                        !html || 
                        isInsideMoustacheTagInner(html, document, position)
                    ) {
                        return;
                    }

                    const result = await instance.provideCompletionItems!(document, position, context, token);

                    if (result?.items) {
                        result.items.concat(getLangCompletions(result.items));
                    }

                    return result;
                },

                // what about auto close tag?

                provideRenameRange(document, position, token) {
                    const html = getHTML(document);
                    if (!html) {
                        return;
                    }

                    const offset = document.offsetAt(position);
                    const node = html.findNodeAt(offset);
                    if (!node || possiblyComponent(node) || !node.tag) {
                        return null;
                    }

                    return instance.provideRenameRange!(document, position, token);
                },

                provideHover(document, position, token) {
                    const html = getHTML(document);
                    if (!html) {
                        return;
                    }

                    const offset = document.offsetAt(position);
                    const node = html.findNodeAt(offset);
                    if (!node || possiblyComponent(node)) {
                        return null;
                    }

                    return instance.provideHover!(document, position, token);
                },
            };

            function isInsideMoustacheTagInner(
                html: HTMLDocument,
                document: TextDocument,
                position: Position
            ) {
                const offset = document.offsetAt(position);
                const node = html.findNodeAt(offset);
                return isInsideMoustacheTag(document.getText(), node.start, offset);
            }

            function getHTML(textDocument: TextDocument) {
                return instance.provide!['html/htmlDocument']!(textDocument);
            }

            function getLangCompletions(completions: CompletionItem[]): CompletionItem[] {
                const styleScriptTemplateCompletions = completions.filter(
                    (completion) =>
                        completion.kind === CompletionItemKind.Property &&
                        styleScriptTemplate.has(completion.label)
                );
                const langCompletions: CompletionItem[] = [];
                addLangCompletion('script', ['ts']);
                addLangCompletion('style', ['less', 'scss']);
                addLangCompletion('template', ['pug']);
                return langCompletions;

                function addLangCompletion(tag: string, languages: string[]) {
                    const existingCompletion = styleScriptTemplateCompletions.find(
                        (completion) => completion.label === tag
                    );
                    if (!existingCompletion) {
                        return;
                    }

                    languages.forEach((lang) =>
                        langCompletions.push({
                            ...existingCompletion,
                            label: `${tag} (lang="${lang}")`,
                            insertText:
                                existingCompletion.insertText &&
                                `${existingCompletion.insertText} lang="${lang}"`,
                            textEdit:
                                existingCompletion.textEdit &&
                                TextEdit.is(existingCompletion.textEdit)
                                    ? {
                                          range: existingCompletion.textEdit.range,
                                          newText: `${existingCompletion.textEdit.newText} lang="${lang}"`
                                      }
                                    : undefined
                        })
                    );
                }
            }
        }
    };
}
