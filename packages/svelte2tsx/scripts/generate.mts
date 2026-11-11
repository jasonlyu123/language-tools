/// <reference types="node" />
// @ts-check

import fs from 'node:fs';
import module from 'node:module';
import path from 'node:path';
import ts from 'typescript';

const require = module.createRequire(import.meta.url);
const ts6Path = path.dirname(require.resolve('typescript/package.json'));

const content = fs.readFileSync(path.join(ts6Path, 'lib', 'typescript.d.ts'));
const source = ts.createSourceFile('is.generated.d.ts', content.toString(), ts.ScriptTarget.Latest);

const exports: ts.Statement[] = [];
const tsAstImportStatement = ts.factory.createImportDeclaration(
    undefined,
    ts.factory.createImportClause(
        ts.SyntaxKind.TypeKeyword,
        undefined,
        ts.factory.createNamespaceImport(ts.factory.createIdentifier('tsAst'))
    ),
    ts.factory.createStringLiteral('@typescript/native/ast'),
    ts.factory.createImportAttributes(
        ts.factory.createNodeArray([
            ts.factory.createImportAttribute(
                ts.factory.createStringLiteral('resolution-mode'),
                ts.factory.createStringLiteral('import')
            )
        ]),
        false
    )
);
const tsImport = ts.factory.createImportDeclaration(
    undefined,
    ts.factory.createImportClause(
        ts.SyntaxKind.TypeKeyword,
        ts.factory.createIdentifier('ts'),
        undefined
    ),
    ts.factory.createStringLiteral('typescript')
);

const others = [
    'SyntaxKind',
    'NodeFlags',
    'ScriptKind',
    'ScriptTarget',
    'createSourceFile',
    'createScanner',
    'forEachChild',
    'forEachLeadingCommentRange',
    'getLeadingCommentRanges',
    'getAllJSDocTagsOfKind',
    'getJSDocTags',
    'getJSDocParameterTags',
    'getJSDocType',
    'getModifiers',
    'canHaveModifiers',
    'isWhiteSpaceLike',
    'isWhiteSpaceSingleLine',
    'NodeArray',
    'ReadonlyTextRange',
    'FileReference'
];

const referencesType = new Set<string>(['Node']);
const namespace = source.statements.find((v) => ts.isModuleDeclaration(v));
if (!namespace?.body || !ts.isModuleBlock(namespace.body)) {
    throw new Error('Expected module block');
}
const statements = namespace?.body.statements || [];
for (const element of statements) {
    if (ts.isFunctionDeclaration(element) && element.name) {
        let isTypePredicate = false;
        if (
            element.type &&
            ts.isTypePredicateNode(element.type) &&
            element.type.type &&
            ts.isTypeReferenceNode(element.type.type) &&
            element.type.type.typeName &&
            ts.isIdentifier(element.type.type.typeName)
        ) {
            isTypePredicate = true;
            const type = element.type.type.typeName.text;
            referencesType.add(type);
        } 
        if (isTypePredicate || others.includes(element.name.text)) {
            exports.push(
                ts.factory.createFunctionDeclaration(
                    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword), ts.factory.createModifier(ts.SyntaxKind.DeclareKeyword)],
                    undefined,
                    element.name,
                    undefined,
                    element.parameters,
                    element.type,
                    undefined
                )
            );
        }
    } else if (
        ts.isEnumDeclaration(element) &&
        element.name &&
        others.includes(element.name.text)
    ) {
        exports.push(
            ts.factory.createEnumDeclaration(
                [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
                element.name,
                element.members
            )
        );
    } else if (ts.isTypeAliasDeclaration(element) && element.name && others.includes(element.name.text)) {
        exports.push(
            ts.factory.createTypeAliasDeclaration(
                [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
                element.name,
                element.typeParameters,
                element.type
            )
        );
    } else if (ts.isInterfaceDeclaration(element) && element.name && others.includes(element.name.text)) {
        exports.push(
            ts.factory.createInterfaceDeclaration(
                [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
                element.name,
                element.typeParameters,
                element.heritageClauses,
                element.members
            )
        );
    }
}

const unions = Array.from(referencesType).map((type) =>
    ts.factory.createTypeAliasDeclaration(
        [
            ts.factory.createModifier(ts.SyntaxKind.ExportKeyword),
        ],
        type,
        undefined,
        ts.factory.createUnionTypeNode([
            ts.factory.createTypeReferenceNode(
                ts.factory.createQualifiedName(ts.factory.createIdentifier('ts'), type),
                undefined
            ),
            ts.factory.createTypeReferenceNode(
                ts.factory.createQualifiedName(ts.factory.createIdentifier('tsAst'), type),
                undefined
            )
        ])
    )
);
let resultFile = ts.createSourceFile('result.ts', '', ts.ScriptTarget.Latest);
resultFile = ts.factory.updateSourceFile(resultFile, [
    tsAstImportStatement,
    tsImport,
    ...exports,
    ...unions
]);
const printer = ts.createPrinter();
const resultText = printer.printFile(resultFile);
fs.writeFileSync('src/facade.generate.ts', resultText);
