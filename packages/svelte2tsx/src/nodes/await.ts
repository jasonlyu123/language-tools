import MagicString from 'magic-string';
import { Node } from 'estree-walker';

export function handleAwait(str: MagicString, htmlx: string, awaitBlock: Node) {
    // {#await somePromise then value} ->
    // {() => {let _$$p = (somePromise);
    str.overwrite(awaitBlock.start, awaitBlock.expression.start, '{() => {let _$$p = (');

    const { thenStart, thenEnd } = findThen(awaitBlock, htmlx);

    if (awaitBlock.pending.skip) {
        // somePromise then -> somePromise); then
        str.overwrite(awaitBlock.expression.end, thenStart, '); ');
    } else {
        // somePromise} -> somePromise);
        const awaitEnd = htmlx.indexOf('}', awaitBlock.expression.end);
        str.overwrite(awaitBlock.expression.end, awaitEnd + 1, ');');

        // wrap pending with <> </>;
        str.prependLeft(thenStart ?? awaitEnd + 1, '</>; ');
        str.appendRight(awaitEnd + 1, ' <>');
    }

    // then value } | {:then value} ->
    // __sveltets_awaitThen(_$$p, (value) => {<>
    const awaitThen = '__sveltets_awaitThen(_$$p, ';
    if (!awaitBlock.then.skip) {
        if (awaitBlock.value) {
            str.overwrite(thenStart, awaitBlock.value.start, awaitThen + '(');
            str.overwrite(awaitBlock.value.end, thenEnd, ') => {<>');
        } else {
            str.overwrite(thenStart, thenEnd, awaitThen + '() => {<>');
        }
    }

    //{:catch error} ->
    //</>}, (error) => {<>
    if (!awaitBlock.catch.skip) {

        //catch block includes the {:catch}
        const catchStart = awaitBlock.catch.start;
        const catchSymbolEnd = htmlx.indexOf(':catch', catchStart) + ':catch'.length;

        const errorStart = awaitBlock.error ? awaitBlock.error.start : catchSymbolEnd;
        const errorEnd = awaitBlock.error ? awaitBlock.error.end : errorStart;
        const catchEnd = htmlx.indexOf('}', errorEnd) + 1;

        // __sveltets_awaitThen(_$$p, undefined,
        if (awaitBlock.then.skip) {
            // close pending and start sveltets__awaitThen with no then callback
            str.overwrite(catchStart, errorStart, `</>; ${awaitThen}undefined, `);
        } else {
            str.overwrite(catchStart, errorStart, '</>}, ');
        }

        str.appendRight(errorStart, '(');
        str.overwrite(errorEnd, catchEnd, ') => {<>');
    }

    // {/await} ->
    // <>})}
    const awaitEndStart = htmlx.lastIndexOf('{', awaitBlock.end);

    if (!awaitBlock.then.skip || !awaitBlock.catch.skip) {
        str.appendLeft(awaitEndStart, '</>})');
    }
    str.overwrite(awaitEndStart, awaitBlock.end, '}}');
}

function hasPending(awaitBlock: Node) {
    return !awaitBlock.pending.skip;
}

function findThen(awaitBlock: Node, htmlx: string) {
    let thenStart: number;
    let thenEnd: number;

    if (hasPending(awaitBlock)) {
        //thenBlock includes the {:then}
        thenStart = awaitBlock.then.start;
        if (awaitBlock.value) {
            thenEnd = htmlx.indexOf('}', awaitBlock.value.end) + 1;
        } else {
            thenEnd = htmlx.indexOf('}', awaitBlock.then.start) + 1;
        }
    } else {
        thenEnd = htmlx.lastIndexOf('}', awaitBlock.then.start) + 1;
        thenStart = htmlx.indexOf('then', awaitBlock.expression.end);
    }

    return {
        thenStart,
        thenEnd
    };
}
