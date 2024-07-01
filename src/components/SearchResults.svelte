<script>
  import MovieScrollPagination from "./MovieScrollPagination.svelte";

  const queryParam = new URLSearchParams(window.location.search).get("query");
  export let currentPage = 1;
  export let maxPages = 5;

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

  let promise = fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      queryParam
    )}&include_adult=false&language=en-US&page=${currentPage}`,
    options
  ).then((x) => x.json());

  function paginationClicked(event) {
    if (!Number.isNaN(parseInt(event.target.textContent))) {
      currentPage = parseInt(event.target.textContent);
    }

    if (event.target.ariaLabel !== null) {
      if (event.target.ariaLabel === "Previous") {
        currentPage -= 1;
        if (currentPage < 1) {
          currentPage = 1;
        }
      }

      if (event.target.ariaLabel === "Next") {
        currentPage += 1;
        if (currentPage > maxPages && maxPages !== 0) {
          currentPage = maxPages;
        }
      }
    }

    promise = fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        queryParam
      )}&include_adult=false&language=en-US&page=${currentPage}`,
      options
    ).then((x) => x.json());
  }
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
            onerror="this.onerror=null;this.src='https://placehold.co/185x278'"
            src={imgPosterUrl + imgPosterSize + result.poster_path}
            alt="{result.title} Poster"
            title={result.title}
            height="278"
            width="185"
          />
        </a>
      </div>
      <div class="flex-grow-1 ms-3">
        <h2 class="mb-3">{result.title}</h2>
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
  {console.log(error)}
{/await}
