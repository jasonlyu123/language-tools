import { TsApiService } from '../TsApiService';
import { FindComponentReferencesProvider } from '../../interfaces';
import { Location } from 'vscode-languageserver-types';
import { tsApiAsync, tsAst } from '../types';
import { pathToUrl } from '../../../utils';
import { SpanMapDocument } from '../SpanMapDocument';

export class TsGoComponentReferenceProvider implements FindComponentReferencesProvider {
    private readonly tsApiService: TsApiService;

    constructor(tsApiService: TsApiService) {
        this.tsApiService = tsApiService;
    }

    async findComponentReferences(uri: string): Promise<Location[] | null> {
        return this.findComponentReferencesWorker(uri, { includeImports: true });
    }

    async findComponentReferencesForCodeLens(uri: string): Promise<Location[] | null> {
        return this.findComponentReferencesWorker(uri, { includeImports: false });
    }

    private async findComponentReferencesWorker(
        uri: string,
        options: {
            includeImports: boolean;
        }
    ): Promise<Location[] | null> {
        const project = await this.tsApiService.getProject(uri);
        if (!project) {
            return null;
        }

        const file = await project.program.getSourceFile({ uri });
        if (!file) {
            return null;
        }

        const node = this.findDefinitionNode(file);
        if (!node) {
            return null;
        }

        const refs = await project.languageService.getReferencedSymbolsForNode(
            node,
            node.getStart()
        );
        const locationPromises: Promise<Location | null>[] = [];
        const documents = new Map<string, SpanMapDocument>();
        for (const entry of refs) {
            for (const ref of entry.references) {
                locationPromises.push(this.toLocation(ref, documents, options.includeImports)); 
            }
        }
        return Promise.all(locationPromises).then((locations) =>
            locations.filter((loc): loc is Location => loc !== null)
        );
    }

    private findDefinitionNode(file: tsAst.SourceFile) {
        const astModule = this.tsApiService.astModule;
        for (const statement of file?.statements || []) {
            if (
                astModule.isClassDeclaration(statement) &&
                statement.modifierFlags & astModule.ModifierFlags.Default
            ) {
                return statement.name;
            }

            if (
                astModule.isExportAssignment(statement) &&
                astModule.isIdentifier(statement.expression)
            ) {
                return statement.expression;
            }
        }
        return null;
    }

    private async toLocation(
        nodeHandle: tsApiAsync.NodeHandle,
        documents: Map<string, SpanMapDocument>,
        includeImports: boolean
    ) {
        const node = await nodeHandle.resolve();
        if (!node) {
            return null;
        }
        const sourceFile = node.getSourceFile();
        if (!sourceFile) {
            return null;
        }
        const startOffset = node.getStart();
        const endOffset = node.getEnd();
        const uri = pathToUrl(sourceFile.fileName);
        if (!sourceFile.spanMap) {
            const start = sourceFile.getLineAndCharacterOfPosition(startOffset);
            const end = sourceFile.getLineAndCharacterOfPosition(endOffset);
            return {
                uri,
                range: {
                    start,
                    end
                }
            };
        }

        const originRange = sourceFile.spanMap?.virtualToOriginalSpan({
            pos: startOffset,
            end: endOffset
        });
        if (!originRange) {
            return null;
        }

        const isComponentDef = originRange.range.pos === 0;
        if (isComponentDef) {
            return null;
        }

        const isEndTag =
            sourceFile.originalText.charCodeAt(startOffset - 1) === 47 /* '/' */ &&
            sourceFile.originalText.charCodeAt(startOffset - 2) === 60; /* '<' */

        if (isEndTag) {
            return null;
        }
        let spanMapDocument = documents.get(sourceFile.fileName);
        if (!spanMapDocument) {
            spanMapDocument = new SpanMapDocument(sourceFile);
            documents.set(sourceFile.fileName, spanMapDocument);
        }

        const start = spanMapDocument.positionAt(originRange.range.pos);
        const end = spanMapDocument.positionAt(originRange.range.end);

        return {
            uri,
            range: {
                start,
                end
            }
        };
    }
}
