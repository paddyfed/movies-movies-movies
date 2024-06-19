<script>
    let name = 'Svelte'
    const urlParams = new URLSearchParams(window.location.search);
</script>
<h1>Hello {name} {urlParams}</h1>