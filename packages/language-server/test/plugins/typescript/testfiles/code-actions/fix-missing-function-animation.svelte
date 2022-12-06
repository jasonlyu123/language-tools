<script lang="ts">

</script>

{#each [''] as item (item)}
	<li animate:custom>{item}</li>
{/each}

{#each [''] as item (item)}
	<li animate:custom={{ p: 2 }}>{item}</li>
{/each}
