import {
    getLanguageService,
    HTMLDocument,
    TokenType,
    ScannerState,
    Scanner,
    Node,
    Position
} from 'vscode-html-languageservice';
import { Document } from './Document';
import ts from 'typescript';
import { memoize } from '../../utils';

const parser = getLanguageService();

/**
 * Parses text as HTML
 */
export function parseHtml(text: string): HTMLDocument {
    const preprocessed = preprocess(text);

    // We can safely only set getText because only this is used for parsing
    const parsedDoc = parser.parseHTMLDocument(<any>{ getText: () => preprocessed });

    return parsedDoc;
}

const createScanner = parser.createScanner as (
    input: string,
    initialOffset?: number,
    initialState?: ScannerState
) => Scanner;

function createTsScanner() {
    return ts.createScanner(ts.ScriptTarget.Latest, false);
}

/**
 * scan the text and remove any `>` or `<` that cause the tag to end short,
 */
function preprocess(text: string) {
    let scanner = createScanner(text);
    let token = scanner.scan();
    let currentAttributeValueStart: number | null = null;
    const createTsScannerWithCache = memoize(createTsScanner);

    while (token !== TokenType.EOS) {
        const offset = scanner.getTokenOffset();

        if (token === TokenType.StartTagOpen) {
            if (shouldBlankStartOrEndTagLike(offset)) {
                blankStartOrEndTagLike(offset);
            }
        }

        if (token === TokenType.StartTagClose) {
            if (shouldBlankStartOrEndTagLike(offset)) {
                blankStartOrEndTagLike(offset);
            }
        }

        if (token === TokenType.AttributeValue) {
            currentAttributeValueStart = offset;
        }

        // <Foo checked={a < 1}>
        // https://github.com/microsoft/vscode-html-languageservice/blob/71806ef57be07e1068ee40900ef8b0899c80e68a/src/parser/htmlScanner.ts#L327
        if (
            token === TokenType.Unknown &&
            scanner.getScannerState() === ScannerState.WithinTag &&
            scanner.getTokenText() === '<' &&
            shouldBlankStartOrEndTagLike(offset)
        ) {
            blankStartOrEndTagLike(offset);
        }

        token = scanner.scan();
    }

    return text;

    function shouldBlankStartOrEndTagLike(offset: number) {
        return isInsideMoustacheTag(
            text,
            offset,
            { attributeValueStart: currentAttributeValueStart ?? undefined },
            createTsScannerWithCache
        );
    }

    function blankStartOrEndTagLike(offset: number) {
        text = text.substring(0, offset) + ' ' + text.substring(offset + 1);
        scanner = createScanner(text, offset, ScannerState.WithinTag);
    }
}

export interface AttributeContext {
    name: string;
    inValue: boolean;
    elementTag: Node;
    valueRange?: [number, number];
}

export function getAttributeContextAtPosition(
    document: Document,
    position: Position
): AttributeContext | null {
    const offset = document.offsetAt(position);
    const { html } = document;
    const tag = html.findNodeAt(offset);

    if (!inStartTag(offset, tag) || !tag.attributes) {
        return null;
    }

    const text = document.getText();
    const beforeStartTagEnd =
        text.substring(0, tag.start) + preprocess(text.substring(tag.start, tag.startTagEnd));

    const scanner = createScanner(beforeStartTagEnd, tag.start);

    let token = scanner.scan();
    let currentAttributeName: string | undefined;
    const inTokenRange = () =>
        scanner.getTokenOffset() <= offset && offset <= scanner.getTokenEnd();
    while (token != TokenType.EOS) {
        // adopted from https://github.com/microsoft/vscode-html-languageservice/blob/2f7ae4df298ac2c299a40e9024d118f4a9dc0c68/src/services/htmlCompletion.ts#L402
        if (token === TokenType.AttributeName) {
            currentAttributeName = scanner.getTokenText();

            if (inTokenRange()) {
                return {
                    elementTag: tag,
                    name: currentAttributeName,
                    inValue: false
                };
            }
        } else if (token === TokenType.DelimiterAssign) {
            if (scanner.getTokenEnd() === offset && currentAttributeName) {
                const nextToken = scanner.scan();

                return {
                    elementTag: tag,
                    name: currentAttributeName,
                    inValue: true,
                    valueRange: [
                        offset,
                        nextToken === TokenType.AttributeValue ? scanner.getTokenEnd() : offset
                    ]
                };
            }
        } else if (token === TokenType.AttributeValue) {
            if (inTokenRange() && currentAttributeName) {
                let start = scanner.getTokenOffset();
                let end = scanner.getTokenEnd();
                const char = text[start];

                if (char === '"' || char === "'") {
                    start++;
                    end--;
                }

                return {
                    elementTag: tag,
                    name: currentAttributeName,
                    inValue: true,
                    valueRange: [start, end]
                };
            }
            currentAttributeName = undefined;
        }
        token = scanner.scan();
    }

    return null;
}

function inStartTag(offset: number, node: Node) {
    const end = node.startTagEnd ?? node.end;
    return offset > node.start && end && offset < end;
}

/**
 * Checks whether given position is inside a moustache tag (which includes control flow tags)
 * using a simple bracket matching heuristic which might fail under conditions like
 * `{#if {a: true}.a}`
 */
export function isInsideMoustacheTag(
    html: string,
    position: number,
    checkStart: { attributeValueStart?: number; tagStart?: number },
    createScanner = () => ts.createScanner(ts.ScriptTarget.Latest, false)
) {
    if (checkStart.attributeValueStart == null && checkStart.tagStart == null) {
        // Not inside <tag ... >
        const charactersBeforePosition = html.substring(0, position);
        return (
            Math.max(
                // TODO make this just check for '{'?
                // Theoretically, someone could do {a < b} in a simple moustache tag
                charactersBeforePosition.lastIndexOf('{#'),
                charactersBeforePosition.lastIndexOf('{:'),
                charactersBeforePosition.lastIndexOf('{@')
            ) > charactersBeforePosition.lastIndexOf('}')
        );
    }

    const attributeValueStart =
        checkStart.attributeValueStart ??
        (checkStart.tagStart != null
            ? getNearestAttributeStart(html, checkStart.tagStart, position)
            : null);

    if (!attributeValueStart) {
        return false;
    }

    const attributeValue = html.substring(attributeValueStart, position);
    if (!attributeValue.includes('{')) {
        return false;
    }

    let startBracketCounts = 0;
    let endBracketCounts = 0;

    const tsScanner = createScanner();
    tsScanner.setText(attributeValue);
    while (tsScanner.scan() !== ts.SyntaxKind.EndOfFileToken) {
        switch (tsScanner.getToken()) {
            case ts.SyntaxKind.OpenBraceToken:
                startBracketCounts++;
                break;
            case ts.SyntaxKind.CloseBraceToken:
                endBracketCounts++;
                break;
        }
    }

    return startBracketCounts > endBracketCounts;
}

function getNearestAttributeStart(html: string, tagStart: number, position: number) {
    const scanner = createScanner(html.slice(0, position), tagStart);
    let token = scanner.scan();
    let lastAttributeStart: number | undefined;
    while (token !== TokenType.EOS) {
        const offset = scanner.getTokenOffset();

        if (token === TokenType.AttributeValue) {
            lastAttributeStart = offset;
        }

        token = scanner.scan();
    }

    return lastAttributeStart;
}
