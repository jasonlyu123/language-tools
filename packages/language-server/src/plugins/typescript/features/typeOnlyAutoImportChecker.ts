import ts, { SourceFile } from 'typescript';
import { isNotNullOrUndefined } from '../../../utils';
import { findContainingNode } from './utils';

export function createTypeOnlyAutoImportChecker(
    lang: ts.LanguageService,
    filePath: string
): (change: ts.TextChange[]) => ts.TextChange[] {
    const identity = (v: ts.TextChange[]) => v;

    const program = lang.getProgram();
    const sourceFile = program?.getSourceFile(filePath);

    if (!program || !sourceFile) {
        return identity;
    }

    const compilerOption = program.getCompilerOptions();
    if (compilerOption.importsNotUsedAsValues !== ts.ImportsNotUsedAsValues.Error) {
        return identity;
    }

    const typeChecker = program.getTypeChecker();
    return (changes: ts.TextChange[]): ts.TextChange[] => {
        if (changes.find((c) => c.newText.includes('import'))) {
            return changes;
        }

        const addChange = changes.find((f) => f.newText);

        if (!addChange) {
            return changes;
        }

        const importDeclaration = findContainingNode(
            sourceFile,
            addChange.span,
            ts.isImportDeclaration
        );
        const moduleSpecifier = importDeclaration?.moduleSpecifier;

        if (!moduleSpecifier || !ts.isStringLiteral(moduleSpecifier)) {
            return changes;
        }

        const def = lang.getDefinitionAtPosition(filePath, moduleSpecifier.pos)?.[0];

        if (!def) {
            return changes;
        }

        const importingSourceFile = program.getSourceFile(def.fileName);

        if (!importingSourceFile) {
            return changes;
        }

        const importingModule = typeChecker.getSymbolAtLocation(importingSourceFile);

        if (!importingModule) {
            return changes;
        }

        const exports = typeChecker.getExportsOfModule(importingModule);
        const newImportName = addChange.newText.replace(',', '').trim();
        const symbol = exports.find((identifier) => identifier.getEscapedName() === newImportName);

        if (!symbol) {
            return changes;
        }

        const isTypeOnly = !!(
            symbol.flags & ts.SymbolFlags.TypeAlias || symbol.flags & ts.SymbolFlags.Interface
        );

        const existingImports = findImportDeclarationsForModule(
            lang,
            moduleSpecifier,
            importingSourceFile.fileName,
            sourceFile
        )
            .map((declare) => declare.importClause)
            .filter(isNotNullOrUndefined);

        const existingNamedImports = existingImports
            .filter((clause) => clause.isTypeOnly === isTypeOnly)
            .map((clause) => clause.namedBindings)
            .filter(
                (binding): binding is ts.NamedImports => !!binding && ts.isNamedImports(binding)
            );

        const [first] = existingNamedImports;

        if (!first) {
            const start = sourceFile.getFullText().indexOf('\n', existingImports[0].getEnd()) + 1;
            const newText =
                `import ${isTypeOnly ? 'type ' : ''}` +
                `{ ${newImportName} } from "${moduleSpecifier.text}";${ts.sys.newLine}`;
            return [
                {
                    newText,
                    span: {
                        start,
                        length: 0
                    }
                }
            ];
        }

        const hasElement = first.elements.length > 0;
        const newText = (hasElement ? ', ' : '') + newImportName;
        const start = hasElement
            ? first.elements[first.elements.length - 1].getEnd()
            : first.getStart();

        return [
            {
                newText,
                span: {
                    start,
                    length: 0
                }
            }
        ];
    };
}

function findImportDeclarationsForModule(
    lang: ts.LanguageService,
    originalActionModuleSpecifier: ts.StringLiteral,
    importingModulePath: string,
    sourceFile: SourceFile
) {
    return sourceFile.statements
        .filter(ts.isImportDeclaration)
        .filter(
            (f) =>
                ts.isStringLiteral(f.moduleSpecifier) &&
                (f.moduleSpecifier === originalActionModuleSpecifier ||
                    f.moduleSpecifier.text === originalActionModuleSpecifier.text ||
                    lang.getDefinitionAtPosition(sourceFile.fileName, f.moduleSpecifier.pos)?.[0]
                        .fileName === importingModulePath)
        );
}
