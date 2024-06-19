<script>
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
    `${import.meta.env.PUBLIC_API_URL}movie/${movieId}/videos?language=en-US`,
    options
  ).then((x) => x.json());
</script>

<h1>Trailers</h1>

{#await promise}
  <div>Loading....</div>
{:then data}
  {#if data.results.filter((element) => {
    return element.official === true && element.type === "Trailer";
  }).length !== 0}
    <ul>
      {#each data.results.filter((element) => {
        return element.official === true && element.type === "Trailer";
      }) as video}
        <li>
          <iframe
            id="ytplayer"
            type="text/html"
            loading="lazy"
            width="480"
            height="270"
            title={video.name}
            src="https://www.youtube.com/embed/{video.key}"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </li>
      {/each}
    </ul>
  {:else}
    <p>No Trailers Available</p>
  {/if}
{:catch error}
  {error}
{/await}
