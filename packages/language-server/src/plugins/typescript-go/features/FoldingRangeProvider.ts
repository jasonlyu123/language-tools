import { FoldingRangeRequest, Range } from 'vscode-languageserver';
import { FoldingRange } from 'vscode-languageserver-types';
import { Document, isInTag, mapRangeToOriginal, toRange } from '../../../lib/documents';
import { LineRange, indentBasedFoldingRange } from '../../../lib/foldingRange/indentFolding';
import { LSConfigManager } from '../../../ls-config';
import { isNotNullOrUndefined } from '../../../utils';
import { FoldingRangeProvider } from '../../interfaces';
import { SvelteDocumentSnapshot } from '../../typescript/DocumentSnapshot';
import {
    SvelteNode,
    SvelteNodeWalker,
    findElseBlockTagStart,
    findIfBlockEndTagStart,
    hasElseBlock,
    isAwaitBlock,
    isEachBlock,
    isElseBlockWithElseIf
} from '../../typescript/svelte-ast-utils';
import { TsApiService } from '../lspService';
import { isRangeInGeneratedCode } from './utils';

const foldEndPairCharacters = ['}', ']', ')', '`', '>'];

export class TsGoFoldingRangeProvider implements FoldingRangeProvider {
    constructor(tsApiService: TsApiService, configManager: LSConfigManager) {
        this.configManager = configManager;
        this.tsApiService = tsApiService;
    }
    private readonly configManager: LSConfigManager;
    private readonly tsApiService: TsApiService;

    async getFoldingRanges(document: Document): Promise<FoldingRange[]> {
        const tsDoc = this.tsApiService.getDocumentSnapshot(document);
        if (!tsDoc) {
            return [];
        }

        const foldingRanges =
            tsDoc.parserError && !document.moduleScriptInfo && !document.scriptInfo
                ? []
                : await this.tsApiService.sendRequest(FoldingRangeRequest.type, {
                      textDocument: { uri: document.uri }
                  });

        if (!foldingRanges) {
            return [];
        }

        const lineFoldingOnly =
            !!this.configManager.getClientCapabilities()?.textDocument?.foldingRange
                ?.lineFoldingOnly;

        const result = foldingRanges
            .map((span) => [span, this.toRange(span)] as const)
            .filter(([, range]) => !isRangeInGeneratedCode(tsDoc, range))
            .map(([span, range]) => ({
                originalRange: this.mapToOriginalRange(tsDoc, range, document),
                span
            }))
            .map(({ originalRange, span }) =>
                this.convert(span, document, originalRange, lineFoldingOnly)
            )
            .filter(isNotNullOrUndefined)
            .concat(collectSvelteBlockFolding(document, tsDoc, lineFoldingOnly))
            .concat(getSvelteTagFoldingIfParserError(document, tsDoc))
            .filter((r) => (lineFoldingOnly ? r.startLine < r.endLine : r.startLine <= r.endLine));

        return result;
    }

    private toRange(span: FoldingRange): Range {
        return {
            start: { line: span.startLine, character: span.startCharacter ?? 0 },
            end: { line: span.endLine, character: span.endCharacter ?? 0 }
        };
    }

    private mapToOriginalRange(
        tsDoc: SvelteDocumentSnapshot,
        generatedRange: Range,
        document: Document
    ) {
        const range = mapRangeToOriginal(tsDoc, generatedRange);
        const startOffset = document.offsetAt(range.start);

        if (range.start.line < 0 || range.end.line < 0 || range.start.line > range.end.line) {
            return;
        }

        if (
            isInTag(range.start, document.scriptInfo) ||
            isInTag(range.start, document.moduleScriptInfo)
        ) {
            return range;
        }

        const endOffset = document.offsetAt(range.end);
        const originalText = document.getText().slice(startOffset, endOffset);

        if (originalText.length === 0) {
            return;
        }

        const generatedText = tsDoc.getText(tsDoc.offsetAt(range.start), tsDoc.offsetAt(range.end));
        const oneToOne = originalText.trim() === generatedText.trim();

        if (oneToOne) {
            return range;
        }
    }

    private convert(
        span: FoldingRange,
        document: Document,
        originalRange: Range | undefined,
        lineFoldingOnly: boolean
    ): FoldingRange | null {
        if (!originalRange) {
            return null;
        }

        const end = lineFoldingOnly
            ? adjustFoldingEndToNotHideEnd(originalRange, document)
            : originalRange.end;

        const result = {
            startLine: originalRange.start.line,
            endLine: end.line,
            kind: span.kind,
            startCharacter: lineFoldingOnly ? undefined : originalRange.start.character,
            endCharacter: lineFoldingOnly ? undefined : end.character
        };

        return result;
    }
}

/**
 * Doing this here with the svelte2tsx's svelte ast is slightly
 * less prone to error and faster than
 * using the svelte ast in the svelte plugins.
 */
export function collectSvelteBlockFolding(
    document: Document,
    tsDoc: SvelteDocumentSnapshot,
    lineFoldingOnly: boolean
) {
    if (tsDoc.parserError) {
        return [];
    }

    const ranges: FoldingRange[] = [];

    const enter: SvelteNodeWalker['enter'] = function (node, parent, key) {
        if (key === 'attributes') {
            this.skip();
        }

        // use sub-block for await block
        if (!node.type.endsWith('Block') || node.type === 'AwaitBlock') {
            return;
        }

        if (node.type === 'IfBlock') {
            getIfBlockFolding(node, document, ranges);
            return;
        }

        if (isElseBlockWithElseIf(node)) {
            return;
        }

        if ((node.type === 'CatchBlock' || node.type === 'ThenBlock') && isAwaitBlock(parent)) {
            const expressionEnd =
                (node.type === 'CatchBlock' ? parent.error?.end : parent.value?.end) ??
                document.getText().indexOf('}', node.start);

            const beforeBlockStartTagEnd = document.getText().indexOf('}', expressionEnd);
            if (beforeBlockStartTagEnd == -1) {
                return;
            }
            ranges.push(createFoldingRange(document, beforeBlockStartTagEnd + 1, node.end));

            return;
        }

        if (isEachBlock(node)) {
            const start = document.getText().indexOf('}', (node.key ?? node.expression).end);
            const elseStart = node.else ? findElseBlockTagStart(document.getText(), node.else) : -1;

            ranges.push(
                createFoldingRange(document, start, elseStart === -1 ? node.end : elseStart)
            );

            return;
        }

        if ('expression' in node && node.expression && typeof node.expression === 'object') {
            const start = getStartForNodeWithExpression(
                node as SvelteNode & { expression: SvelteNode },
                document
            );
            const end = node.end;

            ranges.push(createFoldingRange(document, start, end));
            return;
        }

        if (node.start != null && node.end != null) {
            const start = node.start;
            const end = node.end;

            ranges.push(createFoldingRange(document, start, end));
        }
    };

    tsDoc.walkSvelteAst({
        enter
    });

    if (lineFoldingOnly) {
        return ranges.map((r) => ({
            startLine: r.startLine,
            endLine: previousLineOfEndLine(r.startLine, r.endLine)
        }));
    }

    return ranges;
}

function getIfBlockFolding(node: SvelteNode, document: Document, ranges: FoldingRange[]) {
    const typed = node as SvelteNode & {
        else?: SvelteNode;
        expression: SvelteNode;
    };

    const documentText = document.getText();
    const start = getStartForNodeWithExpression(typed, document);
    const end = hasElseBlock(typed)
        ? findElseBlockTagStart(documentText, typed.else)
        : findIfBlockEndTagStart(documentText, typed);

    ranges.push(createFoldingRange(document, start, end));
}

function getStartForNodeWithExpression(
    node: SvelteNode & { expression: SvelteNode },
    document: Document
) {
    return document.getText().indexOf('}', node.expression.end) + 1;
}

function createFoldingRange(document: Document, start: number, end: number) {
    const range = toRange(document, start, end);
    return {
        startLine: range.start.line,
        startCharacter: range.start.character,
        endLine: range.end.line,
        endCharacter: range.end.character
    };
}

export function getSvelteTagFoldingIfParserError(
    document: Document,
    tsDoc: SvelteDocumentSnapshot
) {
    if (!tsDoc.parserError) {
        return [];
    }

    const htmlTemplateRanges = getHtmlTemplateRangesForChecking(document);

    return indentBasedFoldingRange({
        document,
        skipFold: (_, lineContent) => {
            return !/{\s*(#|\/|:)/.test(lineContent);
        },
        ranges: htmlTemplateRanges
    });
}

function getHtmlTemplateRangesForChecking(document: Document) {
    const ranges: LineRange[] = [];

    const excludeTags = [
        document.templateInfo,
        document.moduleScriptInfo,
        document.scriptInfo,
        document.styleInfo
    ]
        .filter(isNotNullOrUndefined)
        .map((info) => ({
            startLine: document.positionAt(info.container.start).line,
            endLine: document.positionAt(info.container.end).line
        }))
        .sort((a, b) => a.startLine - b.startLine);

    if (excludeTags.length === 0) {
        return [{ startLine: 0, endLine: document.lineCount - 1 }];
    }

    if (excludeTags[0].startLine > 0) {
        ranges.push({
            startLine: 0,
            endLine: excludeTags[0].startLine - 1
        });
    }

    for (let index = 0; index < excludeTags.length; index++) {
        const element = excludeTags[index];
        const next = excludeTags[index + 1];

        ranges.push({
            startLine: element.endLine + 1,
            endLine: next ? next.startLine - 1 : document.lineCount - 1
        });
    }

    return ranges;
}

function previousLineOfEndLine(startLine: number, endLine: number) {
    return Math.max(endLine - 1, startLine);
}

export function adjustFoldingEndToNotHideEnd(
    range: Range,
    document: Document
): { line: number; character?: number } {
    // don't fold end bracket, brace...
    if (range.end.character > 0) {
        const text = document.getText();
        const offsetBeforeEnd = document.offsetAt({
            line: range.end.line,
            character: range.end.character - 1
        });
        const foldEndCharacter = text[offsetBeforeEnd];
        if (foldEndPairCharacters.includes(foldEndCharacter)) {
            return { line: previousLineOfEndLine(range.start.line, range.end.line) };
        }
    }

    return range.end;
}
