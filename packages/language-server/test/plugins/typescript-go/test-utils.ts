import path from 'path';
import { TsApiService } from '../../../src/plugins/typescript-go/lspService';
import { pathToUrl } from '../../../src/utils';
import { existsSync, readdirSync, statSync } from 'fs';
import { VERSION } from 'svelte/compiler';
import { Document, DocumentManager } from '../../../src/lib/documents';
import { LSConfigManager } from '../../../src/ls-config';

let tsserverPath: string | undefined;
const isSvelte5Plus = Number(VERSION.split('.')[0]) >= 5;

export interface TsGoServiceSetupResult {
    service: TsApiService;
    docManager: DocumentManager;
    lsConfigManager: LSConfigManager;
}

export async function createTsGoServiceForTest(
    workspaceDir: string
): Promise<TsGoServiceSetupResult> {
    if (!tsserverPath) {
        const pkgPath = require.resolve('@typescript/native-preview/package.json');

        const getExePathModule = await import(
            pathToUrl(path.join(path.dirname(pkgPath), 'lib', 'getExePath.js'))
        );
        tsserverPath = getExePathModule.default() as string;
    }

    const docManager = new DocumentManager((textDocument) =>
        Document.createForTest(textDocument.uri, textDocument.text)
    );
    const lsConfigManager = new LSConfigManager();

    const service = new TsApiService({
        docManager: docManager,
        lsConfigManager: lsConfigManager,
        tsserverPath: tsserverPath,
        serverInitializationOptions: {
            workspaceFolders: [{ name: '', uri: pathToUrl(workspaceDir) }],
            capabilities: {
                textDocument: {
                    inlayHint: {
                        resolveSupport: {
                            properties: ['data']
                        }
                    }
                }
            }
        }
    });
    await service.start();
    return { service, docManager, lsConfigManager };
}

export function setupSharedServices(workspaceDir: string) {
    let servicePromise: Promise<TsGoServiceSetupResult> | undefined;
    before(getOrCreateServices);
    after(async () => {
        const services = await getOrCreateServices();
        services.service.dispose();
    });

    return getOrCreateServices;

    function getOrCreateServices() {
        if (!servicePromise) {
            servicePromise = createTsGoServiceForTest(workspaceDir);
        }
        return servicePromise;
    }
}

export function createSnapshotTesterForTsGo<
    TestOptions extends {
        dir: string;
        workspaceDir: string;
        context: Mocha.Suite;
    }
>(
    executeTest: (
        inputFile: string,
        testOptions: TestOptions,
        services: TsGoServiceSetupResult
    ) => Promise<void>
) {
    return async (testOptions: TestOptions) => {
        const getOrCreateServices = setupSharedServices(testOptions.workspaceDir);
        executeTests(testOptions, getOrCreateServices);
    };

    function executeTests(
        testOptions: TestOptions,
        getOrCreateServices: () => Promise<TsGoServiceSetupResult>
    ) {
        const { dir } = testOptions;

        const inputFile = path.join(dir, 'input.svelte');

        if (existsSync(inputFile)) {
            const _it =
                dir.endsWith('.v5') && !isSvelte5Plus
                    ? it.skip
                    : dir.endsWith('.only')
                      ? it.only
                      : it;
            _it(dir.substring(__dirname.length), async () => {
                const services = await getOrCreateServices();
                await executeTest(inputFile, testOptions, services);
            });
        } else {
            const _describe = dir.endsWith('.only') ? describe.only : describe;
            _describe(dir.substring(__dirname.length), function () {
                const subDirs = readdirSync(dir);

                for (const subDir of subDirs) {
                    const stat = statSync(path.join(dir, subDir));
                    if (stat.isDirectory()) {
                        executeTests(
                            {
                                ...testOptions,
                                context: this,
                                dir: path.join(dir, subDir)
                            },
                            getOrCreateServices
                        );
                    }
                }
            });
        }
    }
}
