// import 'svelte-language-server/bin/browser';
/// <reference lib="dom" />

import { ExtensionContext, Uri, workspace } from 'vscode';
import { LanguageClient } from 'vscode-languageclient/browser';
import { activateCommon } from './extensionCommon';

export async function activate(context: ExtensionContext) {
    const serverMain = Uri.joinPath(context.extensionUri, 'dist/web/server.js');
    const textDecoder = new TextDecoder();
    const libFiles = JSON.parse(
        await readTextFile(Uri.joinPath(context.extensionUri, 'dist/web/lib.json'))
    );
    const tsConfigFiles = await loadTsConfig();

    activateCommon(context, (id, name, clientOptions) => {
        const worker = new Worker(serverMain.toString());
        if (!clientOptions.initializationOptions) {
            clientOptions.initializationOptions = {};
        }
        clientOptions.initializationOptions.webExtension = {
            libFiles,
            files: tsConfigFiles
        };

        return new LanguageClient(id, name, clientOptions, worker);
    });

    async function readTextFile(uri: Uri) {
        const bytes = await workspace.fs.readFile(uri);
        const text = textDecoder.decode(bytes);

        return text;
    }

    async function loadTsConfig() {
        const tsConfigPaths = await workspace.findFiles('**/{ts,js}config.json', '**/node_modules');
        const record: Record<string, string> = {};
        const readFileAndStore = async (uri: Uri) => {
            const content = await readTextFile(uri);
            record[uri.fsPath] = content;
        };
        await Promise.all(tsConfigPaths.map(readFileAndStore));

        return record;
    }
}
