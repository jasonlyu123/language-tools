import * as path from 'path';
import * as vscode from 'vscode';

export const builtinTSExtensionId = 'vscode.typescript-language-features';

export interface ExeInfo {
    path: string;
    version: string;
}

export function getBuiltinExePath(context: {
    asAbsolutePath: (relativePath: string) => string;
}): string {
    return context.asAbsolutePath(
        path.join('./lib', `tsgo${process.platform === 'win32' ? '.exe' : ''}`)
    );
}
