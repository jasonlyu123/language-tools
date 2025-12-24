import * as path from 'path';
import * as vscode from 'vscode';

export const builtinTSExtensionId = 'vscode.typescript-language-features';

export interface ExeInfo {
    serverPath: string;
    version: string;
}

function getBuiltinExePath(context: {
    asAbsolutePath: (relativePath: string) => string;
}): string {
    return context.asAbsolutePath(
        path.join('./lib', `tsgo${process.platform === 'win32' ? '.exe' : ''}`)
    );
}

export function createTypeScriptGoInfo(): ExeInfo | undefined {
    const useTsGo = vscode.workspace
        .getConfiguration('typescript')
        .get<boolean>('experimental.useTsgo');
    if (!useTsGo) {
        return undefined;
    }

    const tsGoExtension = vscode.extensions.getExtension('TypeScriptTeam.native-preview');
    if (!tsGoExtension) {
        return undefined;
    }

    const extensionUri = tsGoExtension.extensionUri;
    if (!extensionUri) {
        return undefined;
    }

    return {
        serverPath: getBuiltinExePath({
            asAbsolutePath: (relativePath: string) =>
                vscode.Uri.joinPath(extensionUri, relativePath).fsPath
        }),
        version: tsGoExtension.packageJSON.version
    };
}
