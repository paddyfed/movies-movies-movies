<script>
  import MovieScrollLoadingSpinner from "./MovieScrollLoadingSpinner.svelte";

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
    `/3/movie/${movieId}/videos?language=en-US`,
    import.meta.env.PUBLIC_API_URL
  );
  let promise = fetch(fullFetchUrl, options).then((x) => x.json());
</script>

{#await promise}
  <h2 class="placeholder-glow">
    <span class="placeholder col-12">Loading</span>
  </h2>
  <MovieScrollLoadingSpinner
    numItems={5}
    --min-width="480px"
    --height="270px"
  />
{:then data}
  <h2>Trailers</h2>
  {#if data.results.filter((element) => {
    return element.official === true && element.type === "Trailer";
  }).length !== 0}
    <section>
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
    </section>
  {:else}
    <div class="no-trailers-placeholder">No Trailers Available</div>
  {/if}
{:catch error}
  {error}
{/await}

<style>
  section {
    overflow-y: auto;
    scrollbar-color: white #13151a;
  }

  ul {
    display: flex;
    gap: 0.5em;
  }

  .no-trailers-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    aspect-ratio: 480 / 270;
    width: 480px;
    max-width: 100%;
    background-color: gray;
    color: black;
  }
</style>
