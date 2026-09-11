import { Logger } from '../../logger';
import { tsApiAsync, tsAst } from './types';

export class TsApiService {
    private readonly tsApi: tsApiAsync.API;
    astModule: typeof tsAst;

    private constructor(pipe: string, apiModule: typeof tsApiAsync, astModule: typeof tsAst) {
        this.tsApi = new apiModule.API({ pipe });
        this.astModule = astModule;
    }

    static async create(pipe: string): Promise<TsApiService | null> {
        try {
            const pkgPath = require.resolve('@typescript/native/package.json');
            const pkg = require(pkgPath);
            if (pkg.name !== 'typescript') {
                return null;
            }
            const tsApiAsync = await import('@typescript/native/unstable/async');

            const tsAst = await import('@typescript/native/unstable/ast');
            return new TsApiService(pipe, tsApiAsync, tsAst);
        } catch (error) {
            Logger.error('Failed to create LspApiService', error);
            return null;
        }
    }

    async fileProjectStatus(uri: string) {
        using snapshot = await this.tsApi.updateSnapshot();
        const project = await snapshot.getDefaultProjectForFile({
            uri
        });
        return project?.configFileName;
    }

    async getProject(uri: string) {
        const snapshot = await this.tsApi.updateSnapshot();
        return snapshot.getDefaultProjectForFile({ uri });
    }
}
