<script>
  $: ({bla} = blubb);
  $: ({bla2} = blubb)
  let bla3;
  $: ({ bla3 } = blubb)

  $: ({ count } = $data);
  $: ({ count2 } = $data)
  let count3;
  $: ({ count3 } = $data)

  $: ({ count4, ...restCount} = $data)
  $: [count5, ...restCount2] = blubb2
</script>
