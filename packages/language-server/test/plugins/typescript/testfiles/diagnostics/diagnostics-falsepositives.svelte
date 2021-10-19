<script lang="typescript">
export let noUsedBeforeDeclare: number, anotherUsed: boolean;
const blubb = 2;
let p: HTMLParagraphElement;
$: bla = blubb * 2;
</script>
<p on:click on:click bind:this={p}></p>
{bla}
{noUsedBeforeDeclare}
{anotherUsed}