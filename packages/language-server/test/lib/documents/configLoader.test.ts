import { ConfigLoader, FSProvider } from '../../../src/lib/documents/configLoader';
import path from 'path';
import { pathToFileURL, URL } from 'url';
import assert from 'assert';
import { spy } from 'sinon';
import _fs, { Dirent } from 'fs';
import fastGlob from 'fast-glob';

describe('ConfigLoader', () => {
    function configFrom(path: string) {
        return {
            compilerOptions: {
                dev: true,
                generate: false
            },
            preprocess: pathToFileURL(path).toString()
        };
    }

    function normalizePath(filePath: string): string {
        return path.join(...filePath.split('/'));
    }

    async function assertFindsConfig(
        configLoader: ConfigLoader,
        filePath: string,
        configPath: string
    ) {
        filePath = normalizePath(filePath);
        configPath = normalizePath(configPath);
        assert.deepStrictEqual(configLoader.getConfig(filePath), configFrom(configPath));
        assert.deepStrictEqual(await configLoader.awaitConfig(filePath), configFrom(configPath));
    }

    const defaultFsMock: FSProvider = {
        existsSync: () => true,
        readdirSync: () => [],
        realpathSync: (p) => p.toString()
    };

    it('should load all config files below and the one inside/above given directory', async () => {
        const configLoader = new ConfigLoader(
            (() => ['svelte.config.js', 'below/svelte.config.js']) as any,
            { ...defaultFsMock, existsSync: () => true },
            path,
            (module: URL) => Promise.resolve({ default: { preprocess: module.toString() } })
        );
        await configLoader.loadConfigs(normalizePath('/some/path'));

        await assertFindsConfig(
            configLoader,
            '/some/path/comp.svelte',
            '/some/path/svelte.config.js'
        );
        await assertFindsConfig(
            configLoader,
            '/some/path/aside/comp.svelte',
            '/some/path/svelte.config.js'
        );
        await assertFindsConfig(
            configLoader,
            '/some/path/below/comp.svelte',
            '/some/path/below/svelte.config.js'
        );
        await assertFindsConfig(
            configLoader,
            '/some/path/below/further/comp.svelte',
            '/some/path/below/svelte.config.js'
        );
    });

    it('skip circular symlink', async () => {
        const configLoader = new ConfigLoader(
            fastGlob.sync,
            { readdirSync, existsSync: () => true, realpathSync },
            path,
            (module: URL) => Promise.resolve({ default: { preprocess: module.toString() } })
        );
        await configLoader.loadConfigs(normalizePath('/some/path'));

        await assertFindsConfig(
            configLoader,
            '/some/path/comp.svelte',
            '/some/path/svelte.config.js'
        );

        await assertFindsConfig(
            configLoader,
            '/some/path/circular/comp.svelte',
            '/some/path/svelte.config.js'
        );

        function readdirSync(dir: string): string[];
        function readdirSync(dir: string, options: { withFileTypes: true }): Dirent[];
        function readdirSync(dir: string, options?: { withFileTypes: true }): Dirent[] | string[] {
            const loopsMoreThanOnce = dir.replace('circular', '').includes('circular');
            if (loopsMoreThanOnce) {
                return [];
            }

            const names = ['svelte.config.js', 'circular'];
            return options?.withFileTypes
                ? names.map(
                      (name) =>
                          ({
                              isSymbolicLink() {
                                  return name === 'circular' || dir.includes('circular');
                              },
                              isDirectory() {
                                  return name === 'circular';
                              },
                              isFile() {
                                  return name === 'svelte.config.js';
                              },
                              name
                          }) as Dirent
                  )
                : names;
        }

        function realpathSync(p: string) {
            let result = p;
            if (p.endsWith('circular')) {
                result = '/some/path';
            }
            if (p.endsWith('svelte.config.js')) {
                result = '/some/path/svelte.config.js';
            }

            return normalizePath(result);
        }
    });

    it('finds first above if none found inside/below directory', async () => {
        const configLoader = new ConfigLoader(
            () => [],
            {
                ...defaultFsMock,
                existsSync: (p) =>
                    typeof p === 'string' && p.endsWith(path.join('some', 'svelte.config.js'))
            },
            path,
            (module: URL) => Promise.resolve({ default: { preprocess: module.toString() } })
        );
        await configLoader.loadConfigs(normalizePath('/some/path'));

        await assertFindsConfig(configLoader, '/some/path/comp.svelte', '/some/svelte.config.js');
    });

    it('adds fallback if no config found', async () => {
        const configLoader = new ConfigLoader(
            () => [],
            { ...defaultFsMock, existsSync: () => false },
            path,
            (module: URL) => Promise.resolve({ default: { preprocess: module.toString() } })
        );
        await configLoader.loadConfigs(normalizePath('/some/path'));

        assert.deepStrictEqual(
            // Can't do the equal-check directly, instead check if it's the expected object props
            // of svelte-preprocess
            Object.keys(
                configLoader.getConfig(normalizePath('/some/path/comp.svelte'))?.preprocess || {}
            ).sort(),
            ['markup', 'script', 'style'].sort()
        );
    });

    it('will not load config multiple times if config loading started in parallel', async () => {
        let firstGlobCall = true;
        let nrImportCalls = 0;
        const configLoader = new ConfigLoader(
            (() => {
                if (firstGlobCall) {
                    firstGlobCall = false;
                    return ['svelte.config.js'];
                } else {
                    return [];
                }
            }) as any,
            {
                ...defaultFsMock,
                existsSync: (p) =>
                    typeof p === 'string' &&
                    p.endsWith(path.join('some', 'path', 'svelte.config.js'))
            },
            path,
            (module: URL) => {
                nrImportCalls++;
                return new Promise((resolve) => {
                    setTimeout(() => resolve({ default: { preprocess: module.toString() } }), 500);
                });
            }
        );
        await Promise.all([
            configLoader.loadConfigs(normalizePath('/some/path')),
            configLoader.loadConfigs(normalizePath('/some/path/sub')),
            configLoader.awaitConfig(normalizePath('/some/path/file.svelte'))
        ]);

        await assertFindsConfig(
            configLoader,
            '/some/path/comp.svelte',
            '/some/path/svelte.config.js'
        );
        await assertFindsConfig(
            configLoader,
            '/some/path/sub/comp.svelte',
            '/some/path/svelte.config.js'
        );
        assert.deepStrictEqual(nrImportCalls, 1);
    });

    it('can deal with missing config', () => {
        const configLoader = new ConfigLoader(
            () => [],
            { ...defaultFsMock, existsSync: () => false },
            path,
            () => Promise.resolve('unimportant')
        );
        assert.deepStrictEqual(
            configLoader.getConfig(normalizePath('/some/file.svelte')),
            undefined
        );
    });

    it('should await config', async () => {
        const configLoader = new ConfigLoader(
            () => [],
            { ...defaultFsMock, existsSync: () => true },
            path,
            (module: URL) => Promise.resolve({ default: { preprocess: module.toString() } })
        );
        assert.deepStrictEqual(
            await configLoader.awaitConfig(normalizePath('some/file.svelte')),
            configFrom(normalizePath('some/svelte.config.js'))
        );
    });

    it('should not load config when disabled', async () => {
        const moduleLoader = spy();
        const configLoader = new ConfigLoader(
            () => [],
            { ...defaultFsMock, existsSync: () => true },
            path,
            moduleLoader
        );
        configLoader.setDisabled(true);
        await configLoader.awaitConfig(normalizePath('some/file.svelte'));
        assert.deepStrictEqual(moduleLoader.notCalled, true);
    });
});
