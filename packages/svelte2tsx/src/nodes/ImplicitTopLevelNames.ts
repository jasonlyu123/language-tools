import ts from 'typescript';
import MagicString from 'magic-string';
import { extractIdentifiers, isMember } from '../utils/tsAst';

export class ImplicitTopLevelNames {
    private map = new Map<string, ts.LabeledStatement>();

    add(
        binaryExpr: ts.BinaryExpression,
        node: ts.LabeledStatement,
        rootVariables: Set<string>,
        astOffset: number,
        str: MagicString,
    ) {
        if (ts.isIdentifier(binaryExpr.left)) {
            this.addSingle(binaryExpr.left, node);
        } else if (!isMember(binaryExpr.left)) {
            extractIdentifiers(binaryExpr.left).map((name) =>
                this.addSingle(name, node),
            );

            if (
                ts.isExpressionStatement(node.statement) &&
                ts.isParenthesizedExpression(node.statement.expression) &&
                this.extractNamesContainsNoTopLevelNames(binaryExpr.left, rootVariables)
            ) {
                const start = node.statement.expression.getStart() + astOffset;
                str.remove(start, start + 1);
                const end = node.statement.expression.getEnd() + astOffset - 1;
                str.remove(end, end + 1);
            }
        }
    }

    private addSingle(identifier: ts.Identifier, node: ts.LabeledStatement) {
        const name = identifier.text;

        // svelte won't let you create a variable with $ prefix anyway
        const isPotentialStore = name.startsWith('$');

        if (!this.map.has(name) && !isPotentialStore) {
            this.map.set(name, node);
        }
    }

    modifyCode(rootVariables: Set<string>, astOffset: number, str: MagicString) {
        for (const [name, node] of this.map.entries()) {
            if (!rootVariables.has(name)) {
                const pos = node.label.getStart();
                // remove '$:' label
                str.remove(pos + astOffset, pos + astOffset + 2);
                str.prependRight(pos + astOffset, `let `);
            }
        }
    }

    private extractNamesContainsNoTopLevelNames(
        node: ts.Expression,
        rootVariables: Set<string>,
    ) {
        return extractIdentifiers(node).every(
            (prop) => !rootVariables.has(prop.text),
        );
    }
}
