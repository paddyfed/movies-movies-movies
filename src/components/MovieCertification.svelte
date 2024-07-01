<script>
  import BbfcIcon from "./BbfcIcon.svelte";

  export let movieId;

  const token = import.meta.env.PUBLIC_API_ACCESS_TOKEN;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: token,
    },
  };

  let promise = fetch(
    `${import.meta.env.PUBLIC_API_URL}movie/${movieId}/release_dates`,
    options
  ).then((x) => x.json());
</script>

{#await promise}
  <div>Loading....</div>
{:then data}
  {#each data.results.filter((element) => {
    return element.iso_3166_1 === "GB";
  }) as cert}
    {#each cert.release_dates as release}
      <BbfcIcon certification={release.certification} />
    {/each}
  {/each}
{:catch error}
  {error}
{/await}
