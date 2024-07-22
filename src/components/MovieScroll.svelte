<script>
  import { findCurrentPage } from "../js/pagination";
  import MovieScrollLoadingSpinner from "./MovieScrollLoadingSpinner.svelte";
  import MovieScrollPagination from "./MovieScrollPagination.svelte";
  import MovieList from "./MovieList.svelte";
  import { apiOptions } from "../js/apiHelpers";

  export let movieList;

  let currentPage = 1;
  export let maxPages = 5;

  const fetchUrl = "/3/movie/" + movieList;

  let fullFetchUrl = new URL(fetchUrl, import.meta.env.PUBLIC_API_URL);

  const paramsObj = {
    page: currentPage,
    language: "en-US",
  };

  for (const key in paramsObj) {
    fullFetchUrl.searchParams.append(key, paramsObj[key]);
  }

  let promise = fetch(fullFetchUrl, apiOptions).then((x) => x.json());

  // When a pagination button is clicked, move the current page and re-run the fetch of data
  function paginationClicked(event) {
    currentPage = findCurrentPage(
      event.currentTarget.dataset.target,
      currentPage,
      maxPages
    );

    fullFetchUrl.searchParams.set("page", currentPage);

    const element = document.querySelector(`#movie-list-${movieList}`);
    element.scrollIntoView({ behavior: "smooth" });

    promise = fetch(fullFetchUrl, apiOptions).then((x) => x.json());
  }
</script>

{#await promise}
  <!-- While API is loading, show placeholder images -->
  <MovieScrollLoadingSpinner --height="278px" --min-width="185px" />
{:then data}
  <!-- When data is loaded, display the movies in a list -->
  <MovieList movies={data.results} />
{:catch error}
  <!-- Display the error if one occurs -->
  {error}
{/await}
<!-- Include pagination -->
<MovieScrollPagination on:click={paginationClicked} {maxPages} {currentPage} />
