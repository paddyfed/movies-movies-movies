<script>
  import TrailerLightBox from "./TrailerLightBox.svelte";

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
        <button
          type="button"
          class="btn btn-link"
          data-bs-toggle="modal"
          data-bs-target="#{video.key}Modal"
        >
          <img
            src="https://i.ytimg.com/vi/{video.key}/hqdefault.jpg"
            alt={video.name}
            title={video.name}
          />
        </button>
        <TrailerLightBox modalId="{video.key}Modal">
          <div class="text-center">
            <iframe
              id="ytplayer_{video.key}"
              type="text/html"
              loading="lazy"
              title={video.name}
              src="https://www.youtube.com/embed/{video.key}"
              frameborder="0"
              allowfullscreen
              class="youtube-video"
            >
            </iframe>
          </div>
        </TrailerLightBox>
      </li>
    {/each}
  </ul>
{:else}
  <div class="no-trailers-placeholder">No Trailers Available</div>
{/if}

<style>
  .youtube-video {
    aspect-ratio: 16 / 9;
    height: 90vh;
  }
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
