import { ConfigLoader, FSProvider } from '../../../src/lib/documents/configLoader';
import path from 'path';
import { pathToFileURL, URL } from 'url';
import assert from 'assert';
import { spy } from 'sinon';
import _fs from 'fs';

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

    function mockFs(files: string[], fs: Partial<FSProvider>): FSProvider {
        const filesNormalized = files.map(normalizePath);
        const statMock = {
            isDirectory: () => false,
            isFile: () => false,
            isSymbolicLink: () => false
        };

        return {
            existsSync: () => true,
            realpathSync: (p) => p,
            readdirSync,
            lstatSync,
            ...fs
        };

        function readdirSync(dir: string, _options?: { withFileTypes?: boolean }) {
            let normalizedDir = normalizePath(dir);
            if (!normalizedDir.endsWith('/')) {
                normalizedDir += path.sep;
            }
            const resultFiles: string[] = [];
            const resultDirs: string[] = [];

            for (const file of filesNormalized) {
                if (!file.startsWith(normalizedDir)) {
                    continue;
                }

                const relative = file.slice(normalizedDir.length);
                const parts = relative.split(path.sep);

                if (parts.length === 1) {
                    resultFiles.push(relative);
                } else {
                    resultDirs.push(parts[0]);
                }
            }

            return resultFiles
                .map((f) => ({ ...statMock, name: f, isFile: () => true }) as _fs.Dirent)
                .concat(
                    resultDirs.map(
                        (d) => ({ ...statMock, name: d, isDirectory: () => true }) as _fs.Dirent
                    )
                );
        }

        function lstatSync(p: string) {
            const file = readdirSync(path.dirname(p)).find((f) => f.name === path.basename(p));

            return {
                isFile: () => file?.isFile() || false,
                isDirectory: () => file?.isDirectory() || false,
                isSymbolicLink: () => file?.isSymbolicLink() || false
            } as _fs.Stats;
        }
    }

    it('should load all config files below and the one inside/above given directory', async () => {
        const configLoader = new ConfigLoader(
            mockFs(['/some/path/svelte.config.js', '/some/path/below/svelte.config.js'], {
                existsSync: () => true
            }),
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

    it('finds first above if none found inside/below directory', async () => {
        const configLoader = new ConfigLoader(
            mockFs([], {
                existsSync: (p) =>
                    typeof p === 'string' && p.endsWith(path.join('some', 'svelte.config.js'))
            }),
            path,
            (module: URL) => Promise.resolve({ default: { preprocess: module.toString() } })
        );
        await configLoader.loadConfigs(normalizePath('/some/path'));

        await assertFindsConfig(configLoader, '/some/path/comp.svelte', '/some/svelte.config.js');
    });

    it('adds fallback if no config found', async () => {
        const configLoader = new ConfigLoader(
            mockFs([], { existsSync: () => false }),
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
        let nrImportCalls = 0;
        const configLoader = new ConfigLoader(
            mockFs(['/some/path/svelte.config.js'], {
                existsSync: (p) =>
                    typeof p === 'string' &&
                    p.endsWith(path.join('some', 'path', 'svelte.config.js'))
            }),
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
        const configLoader = new ConfigLoader(mockFs([], { existsSync: () => false }), path, () =>
            Promise.resolve('unimportant')
        );
        assert.deepStrictEqual(
            configLoader.getConfig(normalizePath('/some/file.svelte')),
            undefined
        );
    });

    it('should await config', async () => {
        const configLoader = new ConfigLoader(
            mockFs([], { existsSync: () => true }),
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
            mockFs([], { existsSync: () => true }),
            path,
            moduleLoader
        );
        configLoader.setDisabled(true);
        await configLoader.awaitConfig(normalizePath('some/file.svelte'));
        assert.deepStrictEqual(moduleLoader.notCalled, true);
    });

    it('follows symlink but not circular', async () => {
        const fsMock = mockFs(
            [
                '/some/path/svelte.config.js',
                '/some/path/symlink/svelte.config.js',
                '/some/path/file-symlink/svelte.config.js'
            ],
            {
                existsSync: () => false
            }
        );
        const configLoader = new ConfigLoader(
            {
                ...fsMock,
                readdirSync(path, options) {
                    const result = fsMock.readdirSync(path, options);

                    return result.map((entry) => {
                        if (entry.name === 'symlink') {
                            return {
                                name: entry.name,
                                isSymbolicLink: () => true,
                                isDirectory: () => false,
                                isFile: () => false
                            } as _fs.Dirent;
                        }

                        if (entry.name === 'svelte.config.js' && path.endsWith('file-symlink')) {
                            return {
                                name: entry.name,
                                isSymbolicLink: () => true,
                                isDirectory: () => false,
                                isFile: () => false
                            } as _fs.Dirent;
                        }

                        return entry;
                    });
                },
                realpathSync(p) {
                    if (p.endsWith('symlink')) {
                        return normalizePath('/some/path');
                    }

                    if (p.endsWith(normalizePath('file-symlink/svelte.config.js'))) {
                        return '/some/path/svelte.config.js';
                    }

                    return p;
                }
            },
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
            '/some/path/symlink/comp.svelte',
            '/some/path/svelte.config.js'
        );

        await assertFindsConfig(
            configLoader,
            '/some/path/file-symlink/comp.svelte',
            '/some/path/file-symlink/svelte.config.js'
        );
    });
});
