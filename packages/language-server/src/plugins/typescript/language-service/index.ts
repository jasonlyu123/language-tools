import type ts from 'typescript';
import { decorateCallHierarchy } from './call-hierarchy';
import { LSPluginInfo, SvelteSnapshotManager } from './interfaces';

export function decorateLanguageService(
    typescript: typeof ts,
    lang: ts.LanguageService,
    snapshotManager: SvelteSnapshotManager
) {
    const clone = { ...lang };

    const info: LSPluginInfo = {
        typescript,
        unpatchedLang: clone,
        lang,
        snapshotManager
    };
    decorateCallHierarchy(info);
}
