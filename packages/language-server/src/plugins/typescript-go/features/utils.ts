import { internalHelpers } from 'svelte2tsx';
import { Range } from 'vscode-languageserver-types';
import { DocumentSnapshot } from '../../typescript/DocumentSnapshot';
import type { tsAst } from '../types';
import { isInGeneratedCode } from '../../typescript/features/utils';

export function rangeHasNegativeLines(range: Range): boolean {
    return range.start.line < 0 || range.end.line < 0;
}

export function locationHasNegativeLines(location: { range: Range }): boolean {
    return rangeHasNegativeLines(location.range);
}

export function hasNonNegativeRange(location: { range: Range }): boolean {
    return !locationHasNegativeLines(location);
}

export function isSvelteFilePath(filePath: string): boolean {
    return filePath.endsWith('.svelte');
}

export function mapToGeneratedRange(tsDoc: DocumentSnapshot, originalRange: Range): Range | null {
    const generatedStart = tsDoc.getGeneratedPosition(originalRange.start);
    const generatedEnd = tsDoc.getGeneratedPosition(originalRange.end);
    const result = {
        start: generatedStart,
        end: generatedEnd
    };

    if (rangeHasNegativeLines(result)) {
        return null;
    }
    return result;
}

type NodePredicate = (tsAstModule: typeof tsAst, node: tsAst.Node) => boolean;
type NodeTypePredicate<T extends tsAst.Node> = (
    tsAstModule: typeof tsAst,
    node: tsAst.Node
) => node is T;

/**
 * Tests a node then its parent and successive ancestors for some respective predicates.
 */
function nodeAndParentsSatisfyRespectivePredicates<T extends tsAst.Node>(
    selfPredicate: NodePredicate | NodeTypePredicate<T>,
    ...predicates: NodePredicate[]
) {
    return (tsAstModule: typeof tsAst, node: tsAst.Node | undefined | void | null): node is T => {
        let next = node;
        return [selfPredicate, ...predicates].every((predicate) => {
            if (!next) {
                return false;
            }
            const current = next;
            next = next.parent;
            return predicate(tsAstModule, current);
        });
    };
}

const isRenderFunction = nodeAndParentsSatisfyRespectivePredicates<
    tsAst.FunctionDeclaration & { name: tsAst.Identifier }
>(
    (tsAstModule, node) =>
        tsAstModule.isFunctionDeclaration(node) && node?.name?.text === internalHelpers.renderName,
    (tsAstModule, node) => tsAstModule.isSourceFile(node)
);

// const isRenderFunctionBody = nodeAndParentsSatisfyRespectivePredicates(
//     (tsAstModule, node) => tsAstModule.isBlock(node),
//     isRenderFunction
// );

export function findRenderFunction(tsAstModule: typeof tsAst, sourceFile: tsAst.SourceFile) {
    // only search top level
    for (const child of sourceFile.statements) {
        if (isRenderFunction(tsAstModule, child)) {
            return child;
        }
    }
}

export function findContainingNode<T extends tsAst.Node>(
    node: tsAst.Node,
    range: Range,
    tsDoc: DocumentSnapshot,
    predicate: (node: tsAst.Node) => node is T
): T | undefined {
    const end = tsDoc.offsetAt(range.end);
    const start = tsDoc.offsetAt(range.start);
    return findContainingNodeOffsetRange(node, { start, end }, tsDoc, predicate);
}

function findContainingNodeOffsetRange<T extends tsAst.Node>(
    node: tsAst.Node,
    offsetRange: { start: number; end: number },
    tsDoc: DocumentSnapshot,
    predicate: (node: tsAst.Node) => node is T
): T | undefined {
    return node.forEachChild((child) => {
        if (child.pos <= offsetRange.start && child.end >= offsetRange.end) {
            if (predicate(child)) {
                return child;
            }
            const foundInChildren = findContainingNodeOffsetRange(
                child,
                offsetRange,
                tsDoc,
                predicate
            );
            if (foundInChildren) {
                return foundInChildren;
            }
        }
    });
}

export function getScannerForSourceFile(
    tsAstModule: typeof tsAst,
    sourceFile: tsAst.SourceFile,
    pos: number
) {
    const scanner = tsAstModule.createScanner(
        /*skipTrivia*/ true,
        sourceFile.languageVariant,
        sourceFile.text
    );
    scanner.resetTokenState(pos);
    scanner.scan();
    return scanner;
}

export function scanSyntaxNode(
    node: tsAst.Node,
    scanner: tsAst.Scanner,
    pos: number,
    kind: tsAst.SyntaxKind
) {
    scanner.resetTokenState(pos);
    while (scanner.getTokenEnd() <= node.end) {
        let tokenKind = scanner.scan();
        if (tokenKind === kind) {
            return {
                start: scanner.getTokenStart(),
                end: scanner.getTokenEnd()
            };
        }
    }
}

/**
 * https://github.com/microsoft/typescript-go/blob/2a5e1cf9fe2261f2ad56871a6d2ed12d6ac34083/internal/scanner/scanner.go#L2473
 * TODO: check if it's added to the ast package
 */
export function getStartOfNode(
    tsAstModule: typeof tsAst,
    node: tsAst.Node,
    sourceFile: tsAst.SourceFile
): number {
    if (nodeIsMissing(tsAstModule, node)) {
        return node.pos;
    }

    if (tsAstModule.isJSDoc(node) || node.kind === tsAstModule.SyntaxKind.JSDocText) {
        return tsAstModule.skipTrivia(
            sourceFile.text,
            node.pos,
            /*stopAfterLineBreak*/ false,
            /*stopAtComments*/ true
        );
    }

    return tsAstModule.skipTrivia(
        sourceFile.text,
        node.pos,
        /*stopAfterLineBreak*/ false,
        /*stopAtComments*/ false,
        /*inJSDoc*/ (node.flags & tsAstModule.NodeFlags.JSDoc) !== 0
    );
}

function nodeIsMissing(tsAstModule: typeof tsAst, node: tsAst.Node): boolean {
    return (
        !node ||
        (node.pos === node.end && node.pos >= 0 && node.kind !== tsAstModule.SyntaxKind.EndOfFile)
    );
}

export function isRangeInGeneratedCode(tsDoc: DocumentSnapshot, range: Range): boolean {
    const start = tsDoc.offsetAt(range.start);
    const end = tsDoc.offsetAt(range.end);
    return isInGeneratedCode(tsDoc.getFullText(), start, end);
}