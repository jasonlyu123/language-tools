# files to keep or minor modifications

- lib/documents/**/*.ts
- lib/foldingRange/indentFolding.ts
- lib/FallbackWatcher.ts (if possible to wire up)
- plugins/svelte/**/*.ts
- plugins/css/features/svelte-selectors.ts
- plugins/css/features/getIdClassCompletions.ts
- plugins/css/global-vars.ts
- plugins/html/dataProvider.ts

# rewritten

- plugins/css/StyleAttributeDocument.ts
    convert to embedded documents
- plugins/html/HTMLPlugin.ts
    keeping `getLangCompletions`, `getFoldingRanges` and `isInsideMoustacheTag` check

- plugins/typescript/features/CallHierarchyProvider.ts
- plugins/typescript/features/CodeActionProvider.ts
- plugins/typescript/features/CompletionProvider.ts
- plugins/typescript/features/DiagnosticsProvider.ts
- plugins/typescript/features/FindComponentReferencesProvider.ts
- plugins/typescript/features/FoldingRangeProvider.ts
- plugins/typescript/features/RenameProvider.ts

## keeping store references
- plugins/typescript/features/FindReferencesProvider.ts
- plugins/typescript/features/RenameProvider.ts
- plugins/typescript/features/ImplementationProvider.ts