<!-- MovieScroll.svelte -->
<!-- Purpose: Displays the lists of popular, Now Playing, or Top Rated movies from the main (index) page -->
<script>
  import { findCurrentPage } from "../js/pagination";
  import { getData } from "../js/apiHelpers";
  import MovieScrollLoadingSpinner from "./MovieScrollLoadingSpinner.svelte";
  import MovieScrollPagination from "./MovieScrollPagination.svelte";
  import MovieList from "./MovieList.svelte";

  // Pass in the list that we want to display
  export let movieList;

  let currentPage = 1;
  export let maxPages = 5;

  // Build up the URL and fetch the information from the API
  let fullFetchUrl = new URL(
    "/3/movie/" + movieList,
    import.meta.env.PUBLIC_API_URL
  );

  const paramsObj = {
    page: currentPage,
    language: "en-US",
  };

  for (const key in paramsObj) {
    fullFetchUrl.searchParams.append(key, paramsObj[key]);
  }

  let promise = getData(fullFetchUrl).then((result) => {
    maxPages = result.total_pages < maxPages ? result.total_pages : maxPages;
    return result;
  });

  // When a pagination button is clicked, move the current page and re-run the fetch of data
  function paginationClicked(event) {
    currentPage = findCurrentPage(
      event.currentTarget.dataset.target,
      currentPage,
      maxPages
    );

    fullFetchUrl.searchParams.set("page", currentPage);

    promise = getData(fullFetchUrl);

    // Scroll the browser window to bring the heading into view so the user does not have to manually scroll back up
    const element = document.querySelector(`#movie-list-${movieList}`);
    element.scrollIntoView({ behavior: "smooth" });
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
  {error.message}
{/await}
<!-- Include pagination -->
<MovieScrollPagination on:click={paginationClicked} {maxPages} {currentPage} />
