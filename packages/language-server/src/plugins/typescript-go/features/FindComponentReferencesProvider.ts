import { TsApiService } from '../TsApiService';
import { FindComponentReferencesProvider } from '../../interfaces';
import { Location } from 'vscode-languageserver-types';
import { tsApiAsync, tsAst } from '../types';

export class TsGoComponentReferenceProvider implements FindComponentReferencesProvider {
    private readonly tsApiService: TsApiService;

    constructor(tsApiService: TsApiService) {
        this.tsApiService = tsApiService;
    }

    async findComponentReferences(uri: string): Promise<Location[] | null> {
        const project = await this.tsApiService.getProject(uri);
        if (!project) {
            return null;
        }

        const file = await project.program.getSourceFile({ uri });
        const astModule = this.tsApiService.astModule;
        if (!file) {
            return null;
        }

        const node = this.findNode(file);
        if (!node) {
            return null;
        }

        const refs = await project.languageService.getReferencedSymbolsForNode(node, node.getStart());
        return refs?.map(ref => ref.references).flat() || null;
    }

    private* toLocation(refs: tsApiAsync.ReferencedSymbolEntry[]) {
        for (const ref of refs) {
            for (const entry of ref.references) {
                yield entry.resolve();
            }
        }
    }

    private findNode(file: tsAst.SourceFile) {
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
}
