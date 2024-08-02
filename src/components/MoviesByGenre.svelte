<!-- MoviesByGenre.svelte -->
<!-- Purpose: Gathers a list of movies by genre. Based on a Genre ID passed down through the API -->
<script>
  import { findCurrentPage } from "../js/pagination";
  import { buildFetchUrl, getData } from "../js/apiHelpers";
  import MovieScrollLoadingSpinner from "./MovieScrollLoadingSpinner.svelte";
  import MovieScrollPagination from "./MovieScrollPagination.svelte";
  import MovieList from "./MovieList.svelte";

  const url = new URL(window.location.href);
  let currentPage = 1;
  export let maxPages = 5;
  export let genreId = 878;

  // https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API#using_replacestate
  history.replaceState(1, "", document.location.href);

  if (url.searchParams.has("page")) {
    currentPage = parseInt(
      new URLSearchParams(window.location.search).get("page")
    );
  }

  // build up the URL and fetch the info from the API
  // https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=878', options)
  const fullFetchUrl = buildFetchUrl("/3/discover/movie", {
    page: currentPage,
    include_adult: "false",
    language: "en-US",
    include_video: "false",
    sort_by: "popularity.desc",
    with_genres: genreId,
  });

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

    // Push a new history item to the browser history with the currentPage as the URL
    // https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API#using_pushstate
    history.pushState(currentPage, "", `?page=${currentPage}`);

    promise = getData(fullFetchUrl);

    // Scroll the browser window to bring the heading into view so the user does not have to manually scroll back up
    const element = document.querySelector(`#movies-by-genre-header`);
    element.scrollIntoView({ behavior: "smooth" });
  }

  // If back is selected, then get the history item that was pushed down and re-run the fetch using those options
  // https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API#using_the_popstate_event
  window.addEventListener("popstate", (event) => {
    if (event.state) {
      currentPage = event.state;
      fullFetchUrl.searchParams.set("page", event.state);
      promise = getData(fullFetchUrl);
    }
  });
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
