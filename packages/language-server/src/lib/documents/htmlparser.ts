import { getLanguageService, HTMLDocument, Node, TokenType } from 'vscode-html-languageservice';

const parser = getLanguageService();

/**
 * Parses text as HTML
 */
export function parseHtml(text: string): HTMLDocument {
    // We can safely only set getText because only this is used for parsing
    const parsedDoc = parser.parseHTMLDocument(<any>{ getText: () => text });

    const checked = new Set<Node>();

    const start = Date.now();

    for (const child of parsedDoc.roots) {
        // child won't have the same end as its parent unless it's not closed;
        const isClosed = child.end === child.parent?.end;
        if (isClosed) {
            correction(child, text);
            checked.add(child);
        }
    }

    console.log(Date.now() - start);

    return parsedDoc;
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
