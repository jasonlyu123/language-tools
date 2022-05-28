/// <reference lib="dom" />

import { createSystem } from '@typescript/vfs';
import ts from 'typescript';
import { htmlData } from 'vscode-html-languageservice/lib/esm/languageFacts/data/webCustomData';
import {
    BrowserMessageReader,
    BrowserMessageWriter,
    createConnection
} from 'vscode-languageserver/browser';
import { createDataProvider } from 'svelte-language-server/src/plugins/html/dataProvider';
import { startServerCommon } from 'svelte-language-server/src/serverCommon';

console.debug('Svelte Web server starting...');

const messageReader = new BrowserMessageReader(self);
const messageWriter = new BrowserMessageWriter(self);

const connection = createConnection(messageReader, messageWriter);

const fsMap = new Map();

const system = createSystem(fsMap);

ts.sys = system;

startServerCommon({
    connection,
    system,
    htmlDataProvider: createDataProvider(htmlData)
});
