<script>
  export let trailers;
</script>

<!-- When data is loaded, display the movie trailers from YouTube -->
<h2 class="mb-3">Trailers</h2>
{#if Array.isArray(trailers) && trailers.filter((element) => {
    return element.official === true && element.type === "Trailer";
  }).length !== 0}
  <ul>
    {#each trailers.filter((element) => {
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

<style>
  ul {
    display: flex;
    gap: 0.5em;
    overflow-y: auto;
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
