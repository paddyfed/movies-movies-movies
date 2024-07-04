<script>
  import BbfcIcon from "./BbfcIcon.svelte";
  import IfcoIcon from "./IfcoIcon.svelte";

  export let movieId;

  const token = import.meta.env.PUBLIC_API_ACCESS_TOKEN;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: token,
    },
  };

  const fullFetchUrl = new URL(
    `/3/movie/${movieId}/release_dates`,
    import.meta.env.PUBLIC_API_URL
  );

  let promise = fetch(fullFetchUrl, options).then((x) => x.json());
</script>

{#await promise}
  <div class="placeholder-glow">
    <span class="placeholder col-12">Loading</span>
  </div>
{:then data}
  {#each data.results.filter((element) => {
    return element.iso_3166_1 === "GB";
  }) as cert}
    <BbfcIcon certification={cert.release_dates[0].certification} />
  {/each}
  {#each data.results.filter((element) => {
    return element.iso_3166_1 === "IE";
  }) as cert}
    <IfcoIcon certification={cert.release_dates[0].certification} />
  {/each}
{:catch error}
  {error}
{/await}
