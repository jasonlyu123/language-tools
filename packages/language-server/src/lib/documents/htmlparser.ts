import { getLanguageService, HTMLDocument, Node, TokenType } from 'vscode-html-languageservice';

const parser = getLanguageService();

/**
 * Parses text as HTML
 */
export function parseHtml(text: string): HTMLDocument {
    const preprocessed = preprocess(text);

    // We can safely only set getText because only this is used for parsing
    const parsedDoc = parser.parseHTMLDocument(<any>{ getText: () => preprocessed });

    // const checked = new Set<Node>();

    // const start = Date.now();

    // for (const child of parsedDoc.roots) {
    //     // child won't have the same end as its parent unless it's not closed;
    //     const isClosed = child.end === child.parent?.end;
    //     if (isClosed) {
    //         correction(child, text);
    //         checked.add(child);
    //     }
    // }

    // console.log(Date.now() - start);

    return parsedDoc;
}

interface Tag {
    start: number;
    tag: string;
    endShort: boolean;
}

function preprocess(text: string) {
    const scanner = parser.createScanner(text);
    let result = text;
    let token = scanner.scan();
    let currentStartTag: Tag | undefined;
    let closed: number | undefined;

    while (token !== TokenType.EOS) {
        const offset = scanner.getTokenOffset();

        if (token === TokenType.StartTag) {
            const lastTag = currentStartTag;
            currentStartTag = {
                tag: scanner.getTokenText(),
                endShort: false,
                start: offset
            };

            if (lastTag) {
                const contentWithin = text.substring(lastTag.start, closed ?? offset);
                if (lastTag.endShort && contentWithin.includes('/>')) {
                    result = result.substr(0, lastTag.start) +
                        contentWithin
                            .split('/>').map(s => s.replace(/>/g, ' '))
                            .join('/>') +
                        result.substring(offset);
                }
            }

            closed = undefined;
        }

        if (token === TokenType.EndTagOpen) {
            closed = offset;
        }

        if (token === TokenType.StartTagClose) {
            if (currentStartTag && isInsideMoustacheTag(text, currentStartTag.start, offset)) {
                currentStartTag.endShort = true;
            }
        }

        token = scanner.scan();
    }

    return result;
}

function correction(nonClosed: Node, text: string) {
    if (!nonClosed.startTagEnd ||
        !isInsideMoustacheTag(text, nonClosed.start, nonClosed.startTagEnd)
    ) {
        return;
    }

    const replaced = prepareForCorrectionScan(text, nonClosed);
    if (!replaced) {
        return;
    }


    const scanner = parser.createScanner(replaced.substring(nonClosed.start));
    let token = scanner.scan();

    while (token !== TokenType.EOS) {

        if (
            token === TokenType.StartTag &&
            scanner.getTokenOffset() > 1
        ) {
            break;
        }
        else if (token === TokenType.StartTagSelfClose) {
            nonClosed.end = nonClosed.startTagEnd = scanner.getTokenOffset();
            const { children } = nonClosed;
            children.forEach(c => c.parent = nonClosed.parent);
            nonClosed.parent?.children.push(...children);
            nonClosed.children = [];
            break;
        }

        token = scanner.scan();
    }

}

function prepareForCorrectionScan(text: string, nonClosed: Node) {
    const scanner = parser.createScanner(text.substring(nonClosed.start, nonClosed.end));
    let token = scanner.scan();

    while (token !== TokenType.EOS) {
        const offset = scanner.getTokenOffset();

        if (token === TokenType.StartTag && offset > 1) {
            const contentWithin = text.substring(nonClosed.start, offset + nonClosed.start);
            if (!contentWithin.includes('/>')) {
                return null;
            }

            return text.substr(0, nonClosed.start) +
                contentWithin
                    .split('/>').map(s => s.replace(/>/g, ' '))
                    .join('/>') +
                text.substring(offset);
        }

        token = scanner.scan();
    }

    return null;
}

export function isInsideMoustacheTag(html: string, tagStart: number, position: number) {
    const charactersInNode = html.substring(tagStart, position);
    return charactersInNode.lastIndexOf('{') > charactersInNode.lastIndexOf('}');
}
