import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import analyze from 'rollup-plugin-analyzer';
import typescript from '@rollup/plugin-typescript';

export default {
    input: './src/webServer.ts',
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
        })
    ],

    external: [
        'typescript',
        // 'monaco-editor',
        '@typescript/vfs',
        'prettier_ts'
    ],
    //
    output: [
        {
            sourcemap: false,
            file: 'dist/browser.mjs',
            format: 'esm'
        }
    ]
};
