<script>
  export let movies;
  import posterPlaceholder from "../images/no-image-placeholder.svg";

  const imgPosterUrl = "https://image.tmdb.org/t/p/";
  const imgPosterSize = "w185/";
</script>

<ul class="mb-3">
  {#each movies as movie}
    <li>
      <a href={import.meta.env.BASE_URL + "/movie?movieId=" + movie.id}>
        <img
          onerror="this.onerror=null;this.src='{posterPlaceholder.src}'"
          src={imgPosterUrl + imgPosterSize + movie.poster_path}
          alt={movie.title + " Poster"}
          title={movie.title}
          height="278"
          width="185"
        />
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

  img {
    transition: 0.3s ease-in-out;
    cursor: pointer;
  }

  img:hover {
    opacity: 0.5;
  }
</style>
