<script>
  import { findCurrentPage } from "../js/pagination";
  import MovieScrollPagination from "./MovieScrollPagination.svelte";
  import posterPlaceholder from "../images/no-image-placeholder.svg";

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

  const imgPosterUrl = "https://image.tmdb.org/t/p/";
  const imgPosterSize = "w185/";

  const token = import.meta.env.PUBLIC_API_ACCESS_TOKEN;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: token,
    },
  };

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

  let promise = fetch(fullFetchUrl, options).then((x) => x.json());

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
    promise = fetch(fullFetchUrl, options).then((x) => x.json());
  }

  window.addEventListener("popstate", (event) => {
    if (event.state) {
      currentPage = event.state.currentPage;
      queryParam = event.state.queryParam;
      fullFetchUrl.searchParams.set("page", event.state.currentPage);
      fullFetchUrl.searchParams.set("query", event.state.queryParam);
      promise = fetch(fullFetchUrl, options).then((x) => x.json());
    }
  });
</script>

{#await promise}
  <div>Loading....</div>
{:then data}
  <h1 class="mb-3">Search results for "{queryParam}"</h1>
  {#each data.results as result}
    <div class="d-flex mb-3">
      <div class="flex-shrink-0">
        <a href={import.meta.env.BASE_URL + "/movie?movieId=" + result.id}>
          <img
            onerror="this.onerror=null;this.src='{posterPlaceholder.src}'"
            src={imgPosterUrl + imgPosterSize + result.poster_path}
            alt="{result.title} Poster"
            title={result.title}
            height="278"
            width="185"
          />
        </a>
      </div>
      <div class="flex-grow-1 ms-3">
        <h2 class="mb-3">
          <a href={import.meta.env.BASE_URL + "/movie?movieId=" + result.id}>
            {result.title}
          </a>
        </h2>
        <p>{result.overview}</p>
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
