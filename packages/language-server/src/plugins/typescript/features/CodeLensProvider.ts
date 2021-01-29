import ts from 'typescript';
import { CodeLens, Position, Range } from 'vscode-languageserver';
import { Document, DocumentMapper } from '../../../lib/documents';
import { AppCodeLens, CodeLensProvider } from '../../interfaces';
import { SvelteSnapshotFragment } from '../DocumentSnapshot';
import { LSAndTSDocResolver } from '../LSAndTSDocResolver';
import { convertToLocationRange } from '../utils';

export class CodeLensProviderImpl implements CodeLensProvider {
    constructor(private readonly lsAndTsDocResolver: LSAndTSDocResolver) { }
    async getCodeLens(document: Document): Promise<AppCodeLens[] | null> {
        const { lang, tsDoc } = this.lsAndTsDocResolver.getLSAndTSDoc(document);

        const program = lang.getProgram();

        if (!program) {
            return null;
        }

        const sourceFile = program.getSourceFile(tsDoc.filePath);

        if (!sourceFile) {
            return null;
        }

        const fragment = await tsDoc.getFragment();
        if (tsDoc.parserError) {
            return this.getCodeLensRangeWhenError(sourceFile, fragment)
                .map(range => this.toCodeLens(range, document));
        }

        const typeChecker = program.getTypeChecker();

        return [];
    }

    private getCodeLensRangeWhenError(
        sourceFile: ts.SourceFile,
        fragment: SvelteSnapshotFragment
    ) {
        const declarations = sourceFile.statements.filter(statement => {
            const isValidDeclaration = ts.isVariableStatement(statement) ||
                ts.isClassDeclaration(statement) ||
                ts.isFunctionDeclaration(statement);

            if (!isValidDeclaration) {
                return false;
            }

            return !!findExportKeyword(statement);
        });

        return declarations.map(declaration => convertToLocationRange(fragment, {
            start: declaration.getStart(),
            length: declaration.getFullWidth()
        }));
    }

    private toCodeLens(range: Range, doc: Document): CodeLens {
        return {
            range,
            data: {
                uri: doc.uri
            },
            // command: {
            //     command: 'vscode.executeReferenceProvider',
            //     title: '0 References',
            //     arguments: [doc.uri, range.start]
            // }
        };
    }

    async resolveCodeLens(
        textDocument: Document,
        codeLensToResolve: AppCodeLens
    ): Promise<AppCodeLens<any>> {
        return codeLensToResolve;
    }
}
function findExportKeyword(node: ts.Node) {
    return node.modifiers?.find((x) => x.kind == ts.SyntaxKind.ExportKeyword);
}
