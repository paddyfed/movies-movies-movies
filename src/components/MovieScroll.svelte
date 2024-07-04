<script>
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

  function paginationClicked(event) {
    const target = event.currentTarget.dataset.target;

    switch (target) {
      case "Previous":
        currentPage -= 1;
        break;
      case "Next":
        currentPage += 1;
        break;
    }

    if (!Number.isNaN(parseInt(target))) {
      currentPage = parseInt(target);
    }

    if (currentPage < 1) {
      currentPage = 1;
    }
    if (currentPage > maxPages) {
      currentPage = maxPages;
    }

    fullFetchUrl.searchParams.set("page", currentPage);

    promise = fetch(fullFetchUrl, options).then((x) => x.json());
  }
</script>

{#await promise}
  <!-- While API is loading, show placeholder images -->
  <MovieScrollLoadingSpinner />
{:then data}
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
  {error}
{/await}
<MovieScrollPagination on:click={paginationClicked} {maxPages} {currentPage} />

<style>
  ul {
    display: flex;
    gap: 0.5em;
    overflow-y: auto;
    scrollbar-color: white #13151a;
  }

  img {
    transition: 0.3s ease-in-out;
    cursor: pointer;
  }

  img:hover {
    opacity: 0.5;
  }
</style>
