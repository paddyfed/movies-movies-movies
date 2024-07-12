<script>
  import TrailerLightBox from "./TrailerLightBox.svelte";
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
          href="https://www.youtube.com/watch?v={video.key}"
          data-thumb="https://i.ytimg.com/vi/{video.key}/hqdefault.jpg"
          data-iframe="https://www.youtube.com/embed/{video.key}?autoplay=1&playsinline=1"
          on:click|preventDefault={openBiggerPicture}
        >
          <img
            src="https://i.ytimg.com/vi/{video.key}/hqdefault.jpg"
            alt={video.name}
            title={video.name}
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
  }
</style>
