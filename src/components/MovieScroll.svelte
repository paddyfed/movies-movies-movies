<script>
  import { findCurrentPage } from "../js/pagination";
  import MovieScrollLoadingSpinner from "./MovieScrollLoadingSpinner.svelte";
  import MovieScrollPagination from "./MovieScrollPagination.svelte";

  export let movieList;

  const imgPosterUrl = "https://image.tmdb.org/t/p/";
  const imgPosterSize = "w185/";
  let currentPage = 1;
  export let maxPages = 5;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.PUBLIC_API_ACCESS_TOKEN,
    },
  };

  const fetchUrl = "/3/movie/" + movieList;

  let fullFetchUrl = new URL(fetchUrl, import.meta.env.PUBLIC_API_URL);

  const paramsObj = {
    page: currentPage,
    include_adult: false,
    language: "en-US",
  };

  for (const key in paramsObj) {
    fullFetchUrl.searchParams.append(key, paramsObj[key]);
  }

  let promise = fetch(fullFetchUrl, options).then((x) => x.json());

  // When a pagination button is clicked, move the current page and re-run the fetch of data
  function paginationClicked(event) {
    currentPage = findCurrentPage(
      event.currentTarget.dataset.target,
      currentPage,
      maxPages
    );

    fullFetchUrl.searchParams.set("page", currentPage);

    promise = fetch(fullFetchUrl, options).then((x) => x.json());
  }
</script>

{#await promise}
  <!-- While API is loading, show placeholder images -->
  <MovieScrollLoadingSpinner />
{:then data}
  <!-- When data is loaded, display the movies in a list -->
  <ul class="mb-3">
    {#each data.results as movie}
      <li>
        <a href={import.meta.env.BASE_URL + "/movie?movieId=" + movie.id}>
          <img
            onerror="this.onerror=null;this.src='https://placehold.co/185x278'"
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
{:catch error}
  <!-- Display the error if one occurs -->
  {error}
{/await}
<!-- Include pagination -->
<MovieScrollPagination on:click={paginationClicked} {maxPages} {currentPage} />

<style>
  ul {
    display: flex;
    gap: 0.5em;
    overflow-y: auto;
  }

  img {
    transition: 0.3s ease-in-out;
    cursor: pointer;
  }

  img:hover {
    opacity: 0.5;
  }
</style>
