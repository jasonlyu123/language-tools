<script lang="ts">
    import { SvelteComponent } from 'svelte';

    const Comp = SvelteComponent<{
        onClick: (e: MouseEvent) => void;
    }>
</script>

<Comp on></Comp>
