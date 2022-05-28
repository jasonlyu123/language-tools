import { FileChangeType } from 'vscode-languageserver';
import { FileWatcher } from '../../lib/FallbackWatcher';
import { isNotNullOrUndefined, flatten, urlToPath } from '../../utils';

const varRegex = /^\s*(--\w+.*?):\s*?([^;]*)/;

export interface GlobalVar {
    name: string;
    filename: string;
    value: string;
}

export class GlobalVars {
    private fsWatcher?: FileWatcher;
    private globalVars = new Map<string, GlobalVar[]>();

    constructor(
        private readonly createWatcher: (files: string[]) => FileWatcher,
        private readonly readFile: (file: string, encoding: string) => Promise<string>
    ) {}

    watchFiles(filesToWatch: string): void {
        if (!filesToWatch) {
            return;
        }

        if (this.fsWatcher) {
            this.fsWatcher.dispose();
            this.globalVars.clear();
        }

        this.fsWatcher = this.createWatcher(filesToWatch.split(','));

        this.fsWatcher.onChange(e => {
            const file = urlToPath(e.uri);
            if (!file) {
                return;
            }

            if (e.type === FileChangeType.Created) {
                this.updateForFile(file);
            } else if (e.type === FileChangeType.Changed) {
                this.updateForFile(file);
            } else if (e.type === FileChangeType.Deleted) {
                this.globalVars.delete(file);
            }
        });
    }

    private updateForFile(filename: string) {
        // Inside a small timeout because it seems chikidar is "too fast"
        // and reading the file will then return empty content
        setTimeout(async () => {
            try {
                const contents = await this.readFile(filename, 'utf-8');
                const globalVarsForFile = contents
                .split('\n')
                .map((line) => line.match(varRegex))
                .filter(isNotNullOrUndefined)
                .map((line) => ({ filename, name: line[1], value: line[2] }));
            this.globalVars.set(filename, globalVarsForFile);
            } catch (error) {
                return;
            }
        }, 1000);
    }

    getGlobalVars(): GlobalVar[] {
        return flatten([...this.globalVars.values()]);
    }
}
