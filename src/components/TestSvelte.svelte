<script>
  import { onMount } from "svelte";

  let name = "Svelte";
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("movieId");

  let promise = fetch("https://api.coindesk.com/v1/bpi/currentprice.json").then(
    (x) => x.json()
  );
</script>

<h1>Hello {name} {urlParams}</h1>

{#await promise then data}
  <pre>
  {JSON.stringify(data, null, 2)}
</pre>
  {data.chartName}
  {data.bpi.USD.code}
  {@html data.bpi.USD.symbol}
{:catch error}
  {error}
{/await}
