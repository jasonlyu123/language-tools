import { Document } from '../../lib/documents';
import { Logger } from '../../logger';
import { LSConfigManager, TSUserConfig, TsUserConfigLang } from '../../ls-config';
import { SpanMapDocument } from './SpanMapDocument';
import { tsApiAsync, tsAst } from './types';

export class TsApiService {
    private readonly tsApi: tsApiAsync.API;
    astModule: typeof tsAst;
    private readonly configManager: LSConfigManager;

    private constructor(
        pipe: string,
        apiModule: typeof tsApiAsync,
        astModule: typeof tsAst,
        configManager: LSConfigManager
    ) {
        this.tsApi = new apiModule.API({ pipe });
        this.astModule = astModule;
        this.configManager = configManager;
    }

    static async create(
        pipe: string,
        configManager: LSConfigManager
    ): Promise<TsApiService | null> {
        try {
            const tsApiAsync = await import('@typescript/native/unstable/async');
            const tsAst = await import('@typescript/native/unstable/ast');

            return new TsApiService(pipe, tsApiAsync, tsAst, configManager);
        } catch (error) {
            Logger.error('Failed to create TsApiService', error);
            return null;
        }
    }

    async fileProjectStatus(uri: string): Promise<string | undefined> {
        using snapshot = await this.tsApi.updateSnapshot();
        const project = await snapshot.getDefaultProjectForFile({
            uri
        });
        return project?.configFileName;
    }

    async getProject(uri: string): Promise<tsApiAsync.Project | undefined> {
        const snapshot = await this.tsApi.updateSnapshot();
        return snapshot.getDefaultProjectForFile({ uri });
    }

    async getProjectAndTsDoc(document: Document): Promise<
        | {
              project: tsApiAsync.Project;
              userPreferences: TSUserConfig;
              tsDoc: SpanMapDocument;
          }
        | undefined
    > {
        const uri = document.uri;
        const project = await this.getProject(uri);
        if (!project) {
            return undefined;
        }

        const sourceFile = await project?.program.getSourceFile({ uri });
        if (!sourceFile) {
            return undefined;
        }
        const tsDoc = new SpanMapDocument(sourceFile);

        return {
            project,
            userPreferences: this.configManager.getClientTsUserConfig(
                sourceFile.scriptKind == this.astModule.ScriptKind.TS ? 'typescript' : 'javascript'
            ),
            tsDoc
        };
    }
}
