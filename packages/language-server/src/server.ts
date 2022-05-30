import { Connection } from 'vscode-languageserver';
import { createConnection, IPCMessageReader, IPCMessageWriter } from 'vscode-languageserver/node';
import { FallbackWatcher } from './lib/FallbackWatcher';
import { startServerCommon } from './serverCommon';
import { Document, DocumentManager } from './lib/documents';
import { configLoader } from './lib/documents/configLoader';
// import { createDataProvider } from './plugins/html/dataProvider';

export interface LSOptions {
    /**
     * If you have a connection already that the ls should use, pass it in.
     * Else the connection will be created from `process`.
     */
    connection?: Connection;
    /**
     * If you want only errors getting logged.
     * Defaults to false.
     */
    logErrorsOnly?: boolean;
}

/**
 * Starts the language server.
 *
 * @param options Options to customize behavior
 */
export function startServer(options?: LSOptions) {
    let connection = options?.connection;
    if (!connection) {
        if (process.argv.includes('--stdio')) {
            console.log = (...args: any[]) => {
                console.warn(...args);
            };
            connection = createConnection(process.stdin, process.stdout);
        } else {
            connection = createConnection(
                new IPCMessageReader(process),
                new IPCMessageWriter(process)
            );
        }
    }

    return startServerCommon({
        connection,
        logErrorsOnly: false,
        createWatcher: (...args) => new FallbackWatcher(...args),
        documentManger: new DocumentManager(
            (textDocument) => new Document(textDocument.uri, textDocument.text, configLoader)
        )
    });
}
