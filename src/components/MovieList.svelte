<!-- MovieList.svelte -->
<!-- Purpose: Displays a list of movies that are passed as an array in a 5 column grid or in a row -->
<script>
  export let movies;
  import ImagePoster from "./ImagePoster.svelte";

  console.log("movieList movies", movies);
</script>

{#if Array.isArray(movies)}
  <ul class="mb-3">
    {#each movies as movie}
      <!-- {JSON.stringify(movie)} -->
      <li>
        <a href={import.meta.env.BASE_URL + "/movie?movieId=" + movie.id}>
          <ImagePoster
            posterTitle={movie.title}
            posterPath={movie.poster_path}
          />
        </a>
      </li>
    {/each}
  </ul>
{:else}
  Not an Array
{/if}

<style>
  /* On larger screens, display the lsit in a five column grid */
  ul {
    display: grid;
    justify-content: space-between;
    /* The default ensures that there will be four rows of five posters at 185px as each "page" returns 20 results */
    /* The number of items can be overwritten by the calling component */
    grid-template-columns: repeat(var(--numItems, 5), 185px);
    gap: 0.5em;
  }

  /* on smaller screens, display the movies in a single row that the user can scroll through */
  @media (max-width: 992px) {
    ul {
      display: flex;
      gap: 0.5em;
      overflow-y: auto;
      flex-wrap: nowrap;
    }
  }
</style>
