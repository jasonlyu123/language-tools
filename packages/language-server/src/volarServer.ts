import { createConnection, createServer, createTypeScriptProject, loadTsdkByPath } from '@volar/language-server/node';
import { create as createCssScriptServicePlugin } from 'volar-service-css';
import { create as createTypeScriptServicePlugins } from 'volar-service-typescript';
import { svelteLanguagePlugin } from './volar/languagePlugin';
import { create as createSveltePlugin } from './volar/plugins/svelte-plugin';
// import { createHTMLPlugin } from './volar/plugins/html-plugin';
import { create as createHTMLPlugin } from 'volar-service-html';

const connection = createConnection();
const server = createServer(connection);

connection.listen();

connection.onInitialize(params => {
    const tsdk = loadTsdkByPath(params.initializationOptions.typescript.tsdk, params.locale);
    return server.initialize(
        params,
        createTypeScriptProject(tsdk.typescript, undefined, () => [svelteLanguagePlugin]),
        [
            createCssScriptServicePlugin(),
            createSveltePlugin(),
            createHTMLPlugin(),
            ...createTypeScriptServicePlugins(tsdk.typescript, tsdk.diagnosticMessages),
        ]
    );
});

connection.onInitialized(() => {
    server.initialized();
    server.watchFiles(['**/*.{js,cjs,mjs,ts,cts,mts,jsx,tsx,json,svelte}'])
});

connection.onShutdown(() => {
    server.shutdown();
});
