/// <reference lib="dom" />
import { createSystem } from '@typescript/vfs';
import ts from 'typescript';
import {
    BrowserMessageReader,
    BrowserMessageWriter,
    createConnection
} from 'vscode-languageserver/browser';
import { Document, DocumentManager } from './lib/documents';
import { startServerCommon, SvelteLSInitializationOptions } from './serverCommon';
import * as svelte from 'svelte/compiler';
import { normalizePath, urlToPath } from './utils';

console.debug('Svelte Web server starting...');

main();

async function main() {
    const messageReader = new BrowserMessageReader(self);
    const messageWriter = new BrowserMessageWriter(self);

    const connection = createConnection(messageReader, messageWriter);

    connection.onNotification(
        '$/webExtension/writeVirtualFile',
        (e: { uri: string; content: string }) => {
            const filePath = urlToPath(e.uri);

            if (filePath) {
                ts.sys.writeFile(filePath, e.content);
            }
        }
    );

    startServerCommon({
        connection,
        documentManger: new DocumentManager(
            (textDocument) => new Document(textDocument.uri, textDocument.text)
        ),
        svelte,
        initialize(initializationOptions: SvelteLSInitializationOptions | undefined) {
            const libFiles: Record<string, string> =
                initializationOptions?.webExtension?.libFiles ?? {};
            const files: Record<string, string> = initializationOptions?.webExtension?.files ?? {};
            const fsMap = new Map(
                Object.keys(libFiles)
                    .map((key): [string, string] => [normalizePath(key), libFiles[key]])
                    .concat(Object.keys(files).map((key) => [normalizePath(key), files[key]]))
            );
            const system = createSystem(fsMap);

            ts.sys = system;
        }
    });
}
