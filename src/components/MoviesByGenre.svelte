<script>
  import { findCurrentPage } from "../js/pagination";
  import MovieScrollLoadingSpinner from "./MovieScrollLoadingSpinner.svelte";
  import MovieScrollPagination from "./MovieScrollPagination.svelte";
  import MovieList from "./MovieList.svelte";

  let currentPage = 1;
  export let maxPages = 5;
  export let genreId = 878;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.PUBLIC_API_ACCESS_TOKEN,
    },
  };

  // https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=878', options)
  const fetchUrl = "/3/discover/movie";

  let fullFetchUrl = new URL(fetchUrl, import.meta.env.PUBLIC_API_URL);

  const paramsObj = {
    page: currentPage,
    include_adult: "false",
    language: "en-US",
    include_video: "false",
    sort_by: "popularity.desc",
    with_genres: genreId,
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
