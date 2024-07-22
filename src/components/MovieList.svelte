<script>
  export let movies;
  import ImagePoster from "./ImagePoster.svelte";
</script>

<ul class="mb-3">
  {#each movies as movie}
    <li>
      <a href={import.meta.env.BASE_URL + "/movie?movieId=" + movie.id}>
        <ImagePoster posterTitle={movie.title} posterPath={movie.poster_path} />
      </a>
    </li>
  {/each}
</ul>

<style>
  ul {
    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(5, 185px);
    gap: 0.5em;
  }

  @media (max-width: 992px) {
    ul {
      display: flex;
      gap: 0.5em;
      overflow-y: auto;
      flex-wrap: nowrap;
    }
  }
</style>
