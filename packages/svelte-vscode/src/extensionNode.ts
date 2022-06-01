import * as path from 'path';
import { ExtensionContext, workspace } from 'vscode';
import { LanguageClient, ServerOptions, TransportKind } from 'vscode-languageclient/node';
import { activateCommon } from './extensionCommon';

export function activate(context: ExtensionContext) {
    const runtimeConfig = workspace.getConfiguration('svelte.language-server');

    const { workspaceFolders } = workspace;
    const rootPath = Array.isArray(workspaceFolders) ? workspaceFolders[0].uri.fsPath : undefined;

    const tempLsPath = runtimeConfig.get<string>('ls-path');
    // Returns undefined if path is empty string
    // Return absolute path if not already
    const lsPath =
        tempLsPath && tempLsPath.trim() !== ''
            ? path.isAbsolute(tempLsPath)
                ? tempLsPath
                : path.join(rootPath as string, tempLsPath)
            : undefined;

    const serverModule = require.resolve(lsPath || 'svelte-language-server/bin/server.js');
    console.log('Loading server from ', serverModule);

    // Add --experimental-modules flag for people using node 12 < version < 12.17
    // Remove this in mid 2022 and bump vs code minimum required version to 1.55
    const runExecArgv: string[] = ['--experimental-modules'];
    let port = runtimeConfig.get<number>('port') ?? -1;
    if (port < 0) {
        port = 6009;
    } else {
        console.log('setting port to', port);
        runExecArgv.push(`--inspect=${port}`);
    }
    const debugOptions = { execArgv: ['--nolazy', '--experimental-modules', `--inspect=${port}`] };

    const serverOptions: ServerOptions = {
        run: {
            module: serverModule,
            transport: TransportKind.ipc,
            options: { execArgv: runExecArgv }
        },
        debug: { module: serverModule, transport: TransportKind.ipc, options: debugOptions }
    };

    const serverRuntime = runtimeConfig.get<string>('runtime');
    if (serverRuntime) {
        serverOptions.run.runtime = serverRuntime;
        serverOptions.debug.runtime = serverRuntime;
        console.log('setting server runtime to', serverRuntime);
    }

    activateCommon(context, (id, name, clientOptions) => {
        return new LanguageClient(id, name, serverOptions, clientOptions);
    });
}
