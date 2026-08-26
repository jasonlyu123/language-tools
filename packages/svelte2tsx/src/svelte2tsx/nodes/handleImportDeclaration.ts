import MagicString from 'magic-string';
import ts from 'typescript';
import { /*getTopLevelImports, isNewGroup,*/ moveNode } from '../utils/tsAst';

/**
 * move imports to top of script so they appear outside our render function
 */
export function handleImportDeclaration(
    node: ts.ImportDeclaration,
    str: MagicString,
    astOffset: number,
    scriptStart: number,
    sourceFile: ts.SourceFile
) {
    return moveNode(node, str, astOffset, scriptStart, sourceFile);
}

/**
 * ensure it's in a newline.
 * if file has module script ensure an empty line to separate imports
 */
export function handleFirstInstanceImport(
    tsAst: ts.SourceFile,
    astOffset: number,
    hasModuleScript: boolean,
    scriptStart: number,
    str: MagicString
) {
    // const imports = getTopLevelImports(tsAst);
    // const firstImport = imports[0];
    // if (!firstImport) {
    //     return;
    // }

    // const firstComment = Array.from(
    //     ts.getLeadingCommentRanges(firstImport.getFullText(), 0) ?? []
    // ).sort((a, b) => a.pos - b.pos)[0];

    // const start =
    //     firstComment && firstComment.kind === ts.SyntaxKind.MultiLineCommentTrivia
    //         ? firstComment.pos + firstImport.getFullStart()
    //         : firstImport.getStart();

    // str.appendRight(start + astOffset, '\n' + (hasModuleScript ? '\n' : ''));
    if (hasModuleScript) {
        str.appendRight(scriptStart + 1, '\n');
    }

    const pending: ts.ImportDeclaration[] = [];
    const imports: ts.ImportDeclaration[] = [];
    for (const statement of tsAst.statements) {
        if (ts.isImportDeclaration(statement)) {
            pending.push(statement);
            imports.push(statement);
            continue;
        }
        if (pending.length) {
            moveImportGroup(pending, str, astOffset, scriptStart /*, tsAst*/);
            pending.length = 0;
        }
    }
    if (pending.length) {
        moveImportGroup(pending, str, astOffset, scriptStart /*, tsAst*/);
        pending.length = 0;
    }

    if (!imports.length) {
        return;
    }
    // Add a semi-colon to the last import if it doesn't have one, to prevent auto completion
    // and imports from being added at the wrong position
    const lastImport = imports[imports.length - 1];
    const end = lastImport.end + astOffset - 1;
    if (str.original[end] !== ';') {
        str.overwrite(end, lastImport.end + astOffset, str.original[end] + ';\n');
    }
}

function moveImportGroup(
    imports: ts.ImportDeclaration[],
    str: MagicString,
    astOffset: number,
    scriptStart: number
    // sourceFile: ts.SourceFile
) {
    let end = imports[imports.length - 1].end + astOffset;
    let nextCharCode = str.original.charCodeAt(end + 1);
    if (nextCharCode === /*\r*/ 13) {
        end++;
        nextCharCode = str.original.charCodeAt(end + 1);
    }
    if (nextCharCode === /*\n*/ 10) {
        end++;
    }
    str.move(imports[0].pos + astOffset, end, scriptStart + 1);
}
