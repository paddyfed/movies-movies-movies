<!-- MovieTrailers.svelte Component -->
<!-- Purpose: to display the official trailers for each movie. Trailers are sourced from the API as youtube video keys -->
<!-- The component displays an image of the trailer (sourced from YouTube) and then uses BiggerPicture (https://biggerpicture.henrygd.me/) to show/play the video in fullscreen -->
<script>
  import BiggerPicture from "bigger-picture/svelte";
  import "bigger-picture/css";

  // initialize BiggerPicture
  let bp = BiggerPicture({
    target: document.body,
  });

  // function to open BiggerPicture
  function openBiggerPicture(e) {
    bp.open({
      items: e.currentTarget,
      el: e.currentTarget,
    });
  }

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
        <a
          href="https://www.youtube-nocookie.com/watch?v={video.key}"
          data-thumb="https://i.ytimg.com/vi/{video.key}/maxresdefault.jpg"
          data-iframe="https://www.youtube-nocookie.com/embed/{video.key}?autoplay=1&playsinline=1"
          on:click|preventDefault={openBiggerPicture}
        >
          <img
            src="https://i.ytimg.com/vi/{video.key}/hqdefault.jpg"
            alt={video.name}
            title={video.name}
            width="480"
            height="360"
          />
        </a>
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

  img {
    max-width: 70vw;
    height: auto;
  }
</style>
