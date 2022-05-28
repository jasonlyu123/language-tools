/// <reference lib="dom" />

import { createSystem, createDefaultMapFromCDN } from '@typescript/vfs';
import ts from 'typescript';
// import { htmlData } from 'vscode-html-languageservice/lib/esm/languageFacts/data/webCustomData';
import {
    BrowserMessageReader,
    BrowserMessageWriter,
    createConnection
} from 'vscode-languageserver/browser';
import { Document, DocumentManager } from './lib/documents';
// import { createDataProvider } from './plugins/html/dataProvider';
import { startServerCommon } from './serverCommon';
import * as svelte from 'svelte/compiler';

console.debug('Svelte Web server starting...');

main();

async function main() {
    const messageReader = new BrowserMessageReader(self);
    const messageWriter = new BrowserMessageWriter(self);

    const connection = createConnection(messageReader, messageWriter);

    startServerCommon({
        connection,
        system: ts.sys,
        // htmlDataProvider: createDataProvider(htmlData),
        documentManger: new DocumentManager(
            (textDocument) => new Document(textDocument.uri, textDocument.text)
        ),
        svelte,
        async initialize() {
            const fsMap = new Map();

            createDefaultMapFromCDN(
                {
                    target: ts.ScriptTarget.ESNext,
                    lib: ['dom']
                },
                ts.version,
                /**cache */ typeof localStorage !== 'undefined',
                ts
            ).then((map) => {
                map.forEach((key, value) => fsMap.set(key, value));
            });

            const system = createSystem(fsMap);

            ts.sys = system;
        }
    });
}
