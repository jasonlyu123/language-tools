// import { createRequire } from 'module';

export function importTsSync(): typeof import('typescript') {
    if (typeof require !== 'function') {
        // TODO: Can't call import.meta.url here because the
        // const require = createRequire(import.meta.url);
        // return require('typescript');
    }
    return loadByRequire();
}

export async function importTs(): Promise<typeof import('typescript')> {
    if (typeof require === 'function') {
        return loadByRequire();
    }

    try {
        return await import('typescript');
    } catch (error) {
        try {
            // @ts-expect-error
            return await import('@typescript/typescript6');
        } catch (error) {
            throw new Error('TypeScript module not found. Please provide it through the options.');
        }
    }
}

function loadByRequire(): typeof import('typescript') {
    try {
        return require('typescript');
    } catch (error) {
        try {
            return require('@typescript/typescript6');
        } catch (error) {
            throw new Error('TypeScript module not found. Please provide it through the options.');
        }
    }
}
