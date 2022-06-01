import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import analyze from 'rollup-plugin-analyzer';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';

export default {
    input: './src/webExtension.ts',
    plugins: [
        {
            resolveId(source, importer) {
                if (source === 'path') {
                    return this.resolve('path-browserify', importer);
                }
            }
        },
        typescript({ include: ['src/**/*'], outDir: undefined, declaration: false, composite: false }),
        resolve({
            browser: true,
            preferBuiltins: false
            // moduleDirectories: ['node_modules']
        }),
        commonjs({
            ignoreDynamicRequires: true,
            sourceMap: false
        }),
        json(),
        analyze({
            // summaryOnly: true,
            limit: 20
        }),
        copy({
            targets: [
                { src: require.resolve('svelte-language-server/dist/browser.js').replace(/\\/g, '/'), dest: 'dist/web', rename: 'server.js' },
                { src: require.resolve('svelte-language-server/dist/lib.json').replace(/\\/g, '/'), dest: 'dist/web' }
            ]
        }),
        /**@type {import('rollup').Plugin}*/({
            buildStart() {
                this.addWatchFile(require.resolve('svelte-language-server/dist/browser.js').replace(/\\/g, '/'));
            }
        })
    ],

    external: [
        'vscode'
    ],
    //
    output: [
        {
            sourcemap: true,
            file: 'dist/web/index.js',
            format: 'cjs'
        }
    ]
};
