import {
    getLanguageService,
    HTMLDocument,
    TokenType,
    ScannerState,
    Scanner
} from 'vscode-html-languageservice';
import { isInsideMoustacheTag } from './utils';

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

function preprocess(text: string) {
    let scanner = createScanner(text);
    let result = text;
    let token = scanner.scan();
    let currentStartTagStart: number | null = null;

    while (token !== TokenType.EOS) {
        const offset = scanner.getTokenOffset();

        if (token === TokenType.StartTagOpen) {
            currentStartTagStart = offset;
        }

        if (token === TokenType.StartTagClose) {
            if (
                currentStartTagStart !== null &&
                isInsideMoustacheTag(text, currentStartTagStart, offset)
            ) {
                removeTagEndLike(offset);
                scanner = createScanner(text, offset, ScannerState.AfterAttributeName);
                scanner.scan();
            }
        }

        token = scanner.scan();
    }

    return result;

    function removeTagEndLike(offset: number) {
        if (currentStartTagStart === null) {
            return;
        }

        result = result.substring(0, offset) + ' ' + result.substring(offset + 1);
    }
}
