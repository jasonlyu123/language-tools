// import 'svelte-language-server/bin/browser';
/// <reference lib="dom" />

import { ExtensionContext, Uri, workspace } from 'vscode';
import { LanguageClient } from 'vscode-languageclient/browser';
import { activateCommon } from './extensionCommon';

export async function activate(context: ExtensionContext) {
    const serverMain = Uri.joinPath(context.extensionUri, 'dist/web/server.js');
    const libFileBytes = await workspace.fs.readFile(Uri.joinPath(context.extensionUri, 'dist/web/lib.json'));
    const libFiles = JSON.parse(new TextDecoder().decode(libFileBytes));

    activateCommon(context, (id, name, clientOptions) => {
        const worker = new Worker(serverMain.toString());
        if (!clientOptions.initializationOptions) {
            clientOptions.initializationOptions = {};
        }
        clientOptions.initializationOptions.webExtension = {
            libFiles
        };

        return new LanguageClient(id, name, clientOptions, worker);
    });
}
