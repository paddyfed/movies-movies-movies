<!-- SearchResults.svelte -->
<!-- Purpose: To fetch and display search results from the nav bar search or the main (index) page search. -->
<script>
  import { findCurrentPage } from "../js/pagination";
  import { buildFetchUrl, getData } from "../js/apiHelpers";
  import MovieScrollPagination from "./MovieScrollPagination.svelte";
  import ImagePoster from "./ImagePoster.svelte";

  // Query is passed to the url as a search param
  const url = new URL(window.location.href);
  let queryParam = url.searchParams.get("query");
  export let currentPage = 1;
  export let maxPages = 5;

  // Create an initial state and pass it to the browser history so this can be loaded when the back button is clicked
  // https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API#using_replacestate
  const initialState = { currentPage: 1, queryParam: queryParam };
  history.replaceState(initialState, "", document.location.href);

  // Get the page number from searchParams if it exists
  if (
    url.searchParams.has("page") &&
    parseInt(url.searchParams.get("page")) <= maxPages
  ) {
    currentPage = parseInt(url.searchParams.get("page"));
  }

  // Build up the URL and fetch the search results from the API
  let fullFetchUrl = buildFetchUrl(`/3/search/movie`, {
    query: queryParam,
    page: currentPage,
    include_adult: false,
    language: "en-US",
  });

  let promise = getData(fullFetchUrl).then((result) => {
    maxPages = result.total_pages < maxPages ? result.total_pages : maxPages;
    return result;
  });

  // Handle the pagination clicks by getting the button that was clicked and re-running the fetch with the new paramater
  function paginationClicked(event) {
    currentPage = findCurrentPage(
      event.currentTarget.dataset.target,
      currentPage,
      maxPages
    );

    fullFetchUrl.searchParams.set("page", currentPage);

    // Push a new history item to the browser history with the currentPage and query param as the URL
    // https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API#using_pushstate
    history.pushState(
      { currentPage: currentPage, queryParam: queryParam },
      "",
      `?query=${queryParam}&page=${currentPage}`
    );
    promise = getData(fullFetchUrl);
  }

  // If back is selected, then get the history item that was pushed down and re-run the fetch using those options
  // https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API#using_the_popstate_event
  window.addEventListener("popstate", (event) => {
    if (event.state) {
      currentPage = event.state.currentPage;
      queryParam = event.state.queryParam;
      fullFetchUrl.searchParams.set("page", event.state.currentPage);
      fullFetchUrl.searchParams.set("query", event.state.queryParam);
      promise = getData(fullFetchUrl);
    }
  });
</script>

<!-- Inlcude the search query in the page title -->
<svelte:head>
  <title>
    Movies Movies Movies : Search Results : Search results for "{queryParam}"
  </title>
</svelte:head>

{#await promise}
  <!-- While API is loading, show placeholder images -->
  <div><i class="fa-solid fa-spinner fa-spin"></i></div>
{:then data}
  <!-- When data is loaded, display the movies in a list -->
  <h1 class="mb-3">Search results for "{queryParam}"</h1>
  <!-- display is based on BootStrap 'Media Object' which puts an image on the left with text on the right -->
  <!-- https://getbootstrap.com/docs/5.3/utilities/flex/#media-object -->
  {#if Array.isArray(data.results) && data.results.length !== 0}
    {#each data.results as movie}
      <section class="d-flex mb-3">
        <div class="flex-shrink-0">
          <a href={import.meta.env.BASE_URL + "/movie?movieId=" + movie.id}>
            <ImagePoster
              posterTitle={movie.title}
              posterPath={movie.poster_path}
            />
          </a>
        </div>
        <div class="flex-grow-1 ms-3">
          <h2 class="mb-3">
            <a href={import.meta.env.BASE_URL + "/movie?movieId=" + movie.id}>
              {movie.title}
            </a>
          </h2>
          <p>{movie.overview}</p>
        </div>
      </section>
    {/each}
  {:else}
    <div class="mb-3">No results returned</div>
  {/if}
{:catch error}
  <!-- Display the error if one occurs -->
  {error.message}
{/await}
<MovieScrollPagination on:click={paginationClicked} {currentPage} {maxPages} />
