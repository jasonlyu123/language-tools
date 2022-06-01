import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import analyze from 'rollup-plugin-analyzer';
import typescript from '@rollup/plugin-typescript';
import fs from 'fs';
import glob from 'fast-glob';
import { dirname, join } from 'path';

/**@type {import('rollup').Plugin}*/
const copyLibPlugin = {
    async buildEnd() {
        const tsLib = dirname(require.resolve('typescript'));
        const tsLibFiles = await glob('lib.*.d.ts', {
            cwd: tsLib
        });
        /**
         * @type {Record<string, string>}
         */
        const record = {};
        for (const file of tsLibFiles) {
            record['/' + file] = fs.readFileSync(join(tsLib, file)).toString();
        }

        const svelteTsLibFileNames = [
            'svelte-shims.d.ts',
            'svelte-jsx.d.ts',
            'svelte-native-jsx.d.ts'
        ];
        const svelte2tsxPath = dirname(require.resolve('svelte2tsx'));
        for (const file of svelteTsLibFileNames) {
            record['/' + file] = fs.readFileSync(join(svelte2tsxPath, file)).toString();
        }

        fs.writeFileSync(join('dist', 'lib.json'), JSON.stringify(record));
    }
};

export default {
    input: './src/webServer.ts',
    plugins: [
        /**@type {import('rollup').Plugin}*/({
            resolveId(source, importer) {
                if (source === 'path') {
                    return this.resolve('path-browserify', importer);
                }

                if (source === 'vscode-html-languageservice/lib/umd/languageFacts/data/webCustomData') {
                    return this.resolve('vscode-html-languageservice/lib/esm/languageFacts/data/webCustomData');
                }
            }
        }),
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
        copyLibPlugin
    ],

    external: [
        // 'typescript',
        // 'monaco-editor',
        // '@typescript/vfs',
        // 'prettier_ts'
    ],
    //
    output: [
        {
            sourcemap: false,
            file: 'dist/browser.js',
            format: 'iife'
        }
    ]
};
