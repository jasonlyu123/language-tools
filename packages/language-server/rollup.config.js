import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
// import replace from '@rollup/plugin-replace';
// import { terser } from 'rollup-plugin-terser';
// import nodePolyfills from 'rollup-plugin-polyfill-node/dist/index';
// import virtual from '@rollup/plugin-virtual';
// import alias from '@rollup/plugin-alias';
import analyze from 'rollup-plugin-analyzer';
import typescript from '@rollup/plugin-typescript';


// import * as fs from 'fs';

// const compiled_vfs = fs.readFileSync('./build/ts-out/src/vfs/vfs.js');

// const intro = fs.readFileSync('./src/bundled/intro.js');
// const banner = fs
//     .readFileSync('./src/bundled/banner.js')
//     .toString()
//     .replace('$$COMPILED_VFS$$', compiled_vfs);

export default {
    input: './src/webServer.ts',
    plugins: [
        // nodePolyfills(),
        // alias({
        //     entries: [
        //         // { find: 'lodash', replacement: 'lodash-es' },
        //         // { find: 'monaco-editor-core', replacement: 'monaco-editor' },
        //         // {
        //         //     find: /vscode.html.languageservice.lib.umd.*webCustomData/,
        //         //     replacement:
        //         //         'vscode-html-languageservice/lib/esm/languageFacts/data/webCustomData'
        //         // }

        //     ]
        // }),
        {
            resolveId(source, importer) {
                if (source === 'path') {
                    return this.resolve('path-browserify', importer)
                }
            }
        },
        // {
        //     resolveId(source, importer) {
        //         if (source.includes('svelte/compiler')) {
        //             // otherwise it's included twice
        //             return this.resolve(source, importer, {
        //                 skipSelf: true,
        //                 custom: { 'node-resolve': { isRequire: true } }
        //             });
        //         }
        //     }
        // },
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
        // nodePolyfills(),
        json(),
        // replace({
        //     values: {
        //         "import { TextDecoder } from 'util';": '' // not in nodePolyfills but TextDecoder should be in browser globals
        //     },
        //     delimiters: ['', ''],
        //     preventAssignment: true
        // }),
        // terser(),
        analyze({
            // summaryOnly: true,
            limit: 20
        })
    ],

    external: [
        'typescript', // these 4 are big and loaded from cdn
        // 'monaco-editor',
        '@typescript/vfs',
        'prettier_ts',

        'fs' // mocked

        // 'chokidar', // used by svelte config loader

        // 'sugarss',
        // 'pug',
        // 'less',
        // 'stylus',
        // 'postcss-load-config',
        // 'coffeescript'
    ],
    //
    output: [
        {
            sourcemap: false,
            file: 'dist/browser.mjs',
            format: 'esm' // this makes it easy to mock "fs" and undefine many other modules
            // intro,
            // banner
        }
    ]
};
