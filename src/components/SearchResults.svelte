<script>
  import { findCurrentPage } from "../js/pagination";
  import MovieScrollPagination from "./MovieScrollPagination.svelte";
  import ImagePoster from "./ImagePoster.svelte";
  import { apiOptions } from "../js/apiHelpers";

  const url = new URL(window.location.href);
  let queryParam = url.searchParams.get("query");
  export let currentPage = 1;
  export let maxPages = 5;

  const initialState = { currentPage: 1, queryParam: queryParam };

  history.replaceState(initialState, "", document.location.href);

  if (
    url.searchParams.has("page") &&
    parseInt(url.searchParams.get("page")) <= maxPages
  ) {
    currentPage = parseInt(url.searchParams.get("page"));
  }

  const fetchUrl = `/3/search/movie`;

  const paramsObj = {
    query: queryParam,
    page: currentPage,
    include_adult: false,
    language: "en-US",
  };

  let fullFetchUrl = new URL(fetchUrl, import.meta.env.PUBLIC_API_URL);

  for (const key in paramsObj) {
    fullFetchUrl.searchParams.append(key, paramsObj[key]);
  }

  let promise = fetch(fullFetchUrl, apiOptions).then((x) => x.json());

  function paginationClicked(event) {
    currentPage = findCurrentPage(
      event.currentTarget.dataset.target,
      currentPage,
      maxPages
    );

    fullFetchUrl.searchParams.set("page", currentPage);

    history.pushState(
      { currentPage: currentPage, queryParam: queryParam },
      "",
      `?query=${queryParam}&page=${currentPage}`
    );
    promise = fetch(fullFetchUrl, apiOptions).then((x) => x.json());
  }

  window.addEventListener("popstate", (event) => {
    if (event.state) {
      currentPage = event.state.currentPage;
      queryParam = event.state.queryParam;
      fullFetchUrl.searchParams.set("page", event.state.currentPage);
      fullFetchUrl.searchParams.set("query", event.state.queryParam);
      promise = fetch(fullFetchUrl, apiOptions).then((x) => x.json());
    }
  });
</script>

{#await promise}
  <div><i class="fa-solid fa-spinner fa-spin"></i></div>
{:then data}
  <h1 class="mb-3">Search results for "{queryParam}"</h1>
  {#each data.results as movie}
    <div class="d-flex mb-3">
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
    </div>
  {/each}

  <MovieScrollPagination
    on:click={paginationClicked}
    {currentPage}
    maxPages={data.total_pages < maxPages ? data.total_pages : maxPages}
  />
{:catch error}
  {error}
{/await}
