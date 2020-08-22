<script>
  import { writable } from 'svelte/store';
  const count = writable(0);
  let myvar = 42 // to show that this is different from ++ or --
  const handler1 = () => $count += myvar
  const handler2 = () => $count -= myvar
  const handler3 = () => $count *= myvar
  const handler4 = () => $count /= myvar
  const handler5 = () => $count **= myvar
  const handler6 = () => $count %= myvar
  const handler7 = () => $count <<= myvar
  const handler8 = () => $count >>= myvar
  const handler9 = () => $count >>>= myvar
  const handler10 = () => $count &= myvar
  const handler11 = () => $count ^= myvar
  const handler12 = () => $count |= myvar
  const handler13 = () => $count &&= myvar
  const handler14 = () => $count ||= myvar
  const handler15 = () => $count ??= myvar
</script>

<button on:click={() => $count += myvar}>add</button>
<button on:click={() => $count -= myvar}>subtract</button>
<button on:click={() => $count *= myvar}>multiply</button>
<button on:click={() => $count /= myvar}>divide</button>
<button on:click={() => $count **= myvar}>exponent</button>
<button on:click={() => $count %= myvar}>mod</button>
<button on:click={() => $count <<= myvar}>leftshift</button>
<button on:click={() => $count >>= myvar}>rightshift</button>
<button on:click={() => $count >>>= myvar}>unsigned rightshift</button>
<button on:click={() => $count &= myvar}>Bitwise AND</button>
<button on:click={() => $count ^= myvar}>Bitwise XOR</button>
<button on:click={() => $count |= myvar}>Bitwise OR</button>
<button on:click={() => $count &&= myvar}>Logical AND</button>
<button on:click={() => $count ||= myvar}>Logical OR</button>
<button on:click={() => $count ??= myvar}>Logical nullish</button>

