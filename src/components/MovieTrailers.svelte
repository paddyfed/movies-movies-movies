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

  const fetchUrl = `/3/movie/${movieId}/videos`;

  const fullFetchUrl = new URL(fetchUrl, import.meta.env.PUBLIC_API_URL);

  const paramsObj = {
    include_adult: false,
    language: "en-US",
  };

  for (const key in paramsObj) {
    fullFetchUrl.searchParams.append(key, paramsObj[key]);
  }

  let promise = fetch(fullFetchUrl, options).then((x) => x.json());
</script>

{#await promise}
  <!-- While API is loading, show placeholder images -->
  <h2 class="placeholder-glow mb-3">
    <span class="placeholder col-12">Loading</span>
  </h2>
  <MovieScrollLoadingSpinner
    numItems={5}
    --min-width="480px"
    --height="270px"
  />
{:then data}
  <!-- When data is loaded, display the movie trailers from YouTube -->
  <h2 class="mb-3">Trailers</h2>
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
    <div class="no-trailers-placeholder">No Trailers Available</div>
  {/if}
{:catch error}
  <!-- Display the error if one occurs -->
  {error}
{/await}

<style>
  ul {
    display: flex;
    gap: 0.5em;
    overflow-y: auto;
    scrollbar-color: white #13151a;
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
