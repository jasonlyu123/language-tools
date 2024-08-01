import type ts from 'typescript';

export interface SvelteSnapshotManager {
    get(filename: string): SvelteSnapshot | undefined;
}

export interface SvelteSnapshot {
    getOriginalText(): string;
    getOriginalTextSpan(textSpan: ts.TextSpan): ts.TextSpan | undefined;
    getOriginalOffset(generatedOffset: number): number;
    getGeneratedOffset(originalOffset: number): number;
    getGeneratedTextSpan(originalTextSpan: ts.TextSpan): ts.TextSpan | undefined;
    getGeneratedText(): string;
}

export interface LSPluginInfo {
    typescript: typeof ts;
    lang: ts.LanguageService;
    unpatchedLang: ts.LanguageService;
    snapshotManager: SvelteSnapshotManager;
}