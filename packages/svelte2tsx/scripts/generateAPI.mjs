/// <reference types="node" />
// @ts-check

import fs from 'node:fs';
import module from 'node:module';
import path from 'node:path';
import ts from 'typescript'

const require = module.createRequire(import.meta.url);
const ts7Path = path.dirname(require.resolve('@typescript/native/package.json'));

const content = fs.readFileSync(path.join(ts7Path, 'dist', 'ast', 'is.generated.d.ts'));
const source = ts.createSourceFile('is.generated.d.ts', content.toString(), ts.ScriptTarget.Latest);

const result = [];
const tsAstImportStatement = ts.factory.createImportDeclaration(
    undefined,
    ts.factory.createImportClause(
        ts.SyntaxKind.TypeKeyword,
        undefined,
        ts.factory.createNamespaceImport(ts.factory.createIdentifier("tsAst"))
    ),
    ts.factory.createStringLiteral("@typescript/native/ast"),
    ts.factory.createImportAttributes(
        ts.factory.createNodeArray([
            ts.factory.createImportAttribute(ts.factory.createStringLiteral('resolution-mode'), ts.factory.createStringLiteral('import'))
        ]),
        false
    )
)
const tsImport = ts.factory.createImportDeclaration(
    undefined,
    ts.factory.createImportClause(
        ts.SyntaxKind.TypeKeyword,
        ts.factory.createIdentifier("ts"),
        undefined
    ),
    ts.factory.createStringLiteral("typescript")
);

/**
 * @type {Array<string>}
 */
const referencesType = [];
for (const element of source.statements) {
    if (ts.isFunctionDeclaration(element) && element.name) {
        let type = '';
        if (element.type && ts.isTypePredicateNode(element.type) && element.type.type && ts.isTypeReferenceNode(element.type.type) && element.type.type.typeName && ts.isIdentifier(element.type.type.typeName)) {
            type = element.type.type.typeName.text;
            referencesType.push(type);
        }

        result.push(ts.factory.createMethodSignature(
            undefined,
            element.name.text,
            undefined,
            undefined,
            element.parameters.map(v => {
                const type = v.type && ts.isTypeReferenceNode(v.type) && ts.isIdentifier(v.type.typeName) ? v.type.typeName.text : (/** @type {ts.Identifier} */(v.name)).text
                return ts.factory.createParameterDeclaration(
                    undefined,
                    undefined,
                    ts.factory.createIdentifier("node"),
                    undefined,
                    ts.factory.createUnionTypeNode([
                        ts.factory.createTypeReferenceNode(
                            ts.factory.createQualifiedName(
                                ts.factory.createIdentifier("ts"),
                                type
                            ),
                            undefined
                        ),
                        ts.factory.createTypeReferenceNode(
                            ts.factory.createQualifiedName(
                                ts.factory.createIdentifier("tsAst"),
                                type
                            ),
                            undefined
                        )
                    ]),
                    undefined
                )
            }),
            type ?
                // ts.factory.createTypeReferenceNode(
                //     ts.factory.createQualifiedName(
                //         ts.factory.createIdentifier("ts"),
                //         ts.factory.createIdentifier("Node")
                //     ),
                //     undefined
                // ) 
                ts.factory.createUnionTypeNode([
                    ts.factory.createTypeReferenceNode(
                        ts.factory.createQualifiedName(
                            ts.factory.createIdentifier("ts"),
                            type
                        ),
                        undefined
                    ),
                    ts.factory.createTypeReferenceNode(
                        ts.factory.createQualifiedName(
                            ts.factory.createIdentifier("tsAst"),
                            type
                        ),
                        undefined
                    )
                ])
                : element.type
        ));
    }
}

const unions = referencesType.map(type => ts.factory.createTypeAliasDeclaration(
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    type,
    undefined,
    ts.factory.createUnionTypeNode([
        ts.factory.createTypeReferenceNode(
            ts.factory.createQualifiedName(
                ts.factory.createIdentifier("ts"),
                type
            ),
            undefined
        ),
        ts.factory.createTypeReferenceNode(
            ts.factory.createQualifiedName(
                ts.factory.createIdentifier("tsAst"),
                type
            ),
            undefined
        )
    ])
));
let resultFile = ts.createSourceFile('result.ts', '', ts.ScriptTarget.Latest);
resultFile = ts.factory.updateSourceFile(resultFile, [
    tsAstImportStatement,
    tsImport,
    ts.factory.createInterfaceDeclaration(
        undefined,
        'Is',
        undefined,
        undefined,
        result
    ),
    ...unions
]);
const printer = ts.createPrinter();
const resultText = printer.printFile(resultFile);
fs.writeFileSync('result.ts', resultText);