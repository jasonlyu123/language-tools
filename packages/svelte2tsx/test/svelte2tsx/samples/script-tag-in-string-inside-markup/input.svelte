<script>
    let a = 1;
</script>

<div data-abc="<script>let a = 1;</script>"></div>
<div data-abc={"<script>let a = 1;</script>"}></div>
<svelte:head>
    {@html `<script type="application/ld+json">{a: 1}</script>`} <!-- *** -->
</svelte:head>