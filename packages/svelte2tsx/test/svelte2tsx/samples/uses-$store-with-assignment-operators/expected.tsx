///<reference types="svelte" />
<></>;
import { writable } from 'svelte/store';
function render() {

  
  const count = writable(0);
  let myvar = 42 // to show that this is different from ++ or --
  const handler1 = () => count.set( __sveltets_store_get(count) + myvar)
  const handler2 = () => count.set( __sveltets_store_get(count) - myvar)
  const handler3 = () => count.set( __sveltets_store_get(count) * myvar)
  const handler4 = () => count.set( __sveltets_store_get(count) / myvar)
  const handler5 = () => count.set( __sveltets_store_get(count) ** myvar)
  const handler6 = () => count.set( __sveltets_store_get(count) % myvar)
  const handler7 = () => count.set( __sveltets_store_get(count) << myvar)
  const handler8 = () => count.set( __sveltets_store_get(count) >> myvar)
  const handler9 = () => count.set( __sveltets_store_get(count) >>> myvar)
  const handler10 = () => count.set( __sveltets_store_get(count) & myvar)
  const handler11 = () => count.set( __sveltets_store_get(count) ^ myvar)
  const handler12 = () => count.set( __sveltets_store_get(count) | myvar)
  const handler13 = () => count.set( __sveltets_store_get(count) && myvar)
  const handler14 = () => count.set( __sveltets_store_get(count) || myvar)
  const handler15 = () => count.set( __sveltets_store_get(count) ?? myvar)
;
() => (<>

<button onclick={() => count.set( __sveltets_store_get(count) + myvar)}>add</button>
<button onclick={() => count.set( __sveltets_store_get(count) - myvar)}>subtract</button>
<button onclick={() => count.set( __sveltets_store_get(count) * myvar)}>multiply</button>
<button onclick={() => count.set( __sveltets_store_get(count) / myvar)}>divide</button>
<button onclick={() => count.set( __sveltets_store_get(count) ** myvar)}>exponent</button>
<button onclick={() => count.set( __sveltets_store_get(count) % myvar)}>mod</button>
<button onclick={() => count.set( __sveltets_store_get(count) << myvar)}>leftshift</button>
<button onclick={() => count.set( __sveltets_store_get(count) >> myvar)}>rightshift</button>
<button onclick={() => count.set( __sveltets_store_get(count) >>> myvar)}>unsigned rightshift</button>
<button onclick={() => count.set( __sveltets_store_get(count) & myvar)}>Bitwise AND</button>
<button onclick={() => count.set( __sveltets_store_get(count) ^ myvar)}>Bitwise XOR</button>
<button onclick={() => count.set( __sveltets_store_get(count) | myvar)}>Bitwise OR</button>
<button onclick={() => count.set( __sveltets_store_get(count) && myvar)}>Logical AND</button>
<button onclick={() => count.set( __sveltets_store_get(count) || myvar)}>Logical OR</button>
<button onclick={() => count.set( __sveltets_store_get(count) ?? myvar)}>Logical nullish</button></>);
return { props: {}, slots: {}, getters: {}, events: {} }}

export default class Input__SvelteComponent_ extends createSvelte2TsxComponent(__sveltets_partial(__sveltets_with_any_event(render))) {
}
