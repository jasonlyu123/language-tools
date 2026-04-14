import path from 'path';
import fs from 'fs';
import { WorkspaceFolder } from 'vscode-languageserver-types';
import { urlToPath, pathToUrl } from '../../utils';

export async function resolveTsGoServerPath(
    config: { 'native-preview'?: { tsdk: string } },
    workspaceFolders: WorkspaceFolder[]
): Promise<string | undefined> {
    const exeName = `tsgo${process.platform === 'win32' ? '.exe' : ''}`;

    let exe = config?.['native-preview']?.tsdk;
    if (exe) {
        if (exe.endsWith('/@typescript/native-preview')) {
            try {
                const packagePath = workspaceResolve(exe, workspaceFolders);
                const getExePath = (
                    await import(pathToUrl(path.join(packagePath, 'lib', 'getExePath.js')))
                ).default;
                return getExePath();
            } catch {}
        }
        try {
            const exePath = workspaceResolve(path.join(exe, exeName), workspaceFolders);
            if (fs.statSync(exePath)) {
                return exePath;
            }
        } catch {}
    }
}

function workspaceResolve(relativePath: string, workspaceFolders: WorkspaceFolder[]): string {
    if (path.isAbsolute(relativePath)) {
        return relativePath;
    }
    if (workspaceFolders && workspaceFolders.length > 0) {
        for (const folder of workspaceFolders) {
            const fsPath = urlToPath(folder.uri);
            if (fsPath == null) continue;
            return path.join(fsPath, relativePath);
        }
    }
    return relativePath;
}
