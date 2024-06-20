<script>
  import MovieScrollLoadingSpinner from "./MovieScrollLoadingSpinner.svelte";
  import MovieScrollPagination from "./MovieScrollPagination.svelte";

  export let scrollTitle;
  export let fetchUrl;

  const imgPosterUrl = "https://image.tmdb.org/t/p/";
  const imgPosterSize = "w185/";
  let page = 1;
  const maxPages = 5;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.PUBLIC_API_ACCESS_TOKEN,
    },
  };

  let promise = fetch(`${fetchUrl}&page=${page}`, options).then((x) =>
    x.json()
  );

  function paginationClicked(event) {
    if (!Number.isNaN(parseInt(event.target.textContent))) {
      page = parseInt(event.target.textContent);
    }

    if (event.target.ariaLabel !== null) {
      if (event.target.ariaLabel === "Previous") {
        page -= 1;
        if (page < 1) {
          page = 1;
        }
      }

      if (event.target.ariaLabel === "Next") {
        page += 1;
        if (page > maxPages) {
          page = maxPages;
        }
      }
    }

    promise = fetch(`${fetchUrl}&page=${page}`, options).then((x) => x.json());
  }
</script>

<h2>{scrollTitle}</h2>
{#await promise}
  <!-- While API is MovieScrollLoadingSpinner, show placeholder images -->
  <MovieScrollLoadingSpinner />
{:then data}
  <section>
    <ul>
      {#each data.results as movie}
        <li>
          <a href={import.meta.env.BASE_URL + "/movie?movieId=" + movie.id}>
            <img
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
  </section>
  <MovieScrollPagination on:click={paginationClicked} />
{:catch error}
  {error}
{/await}

<style>
  section {
    overflow-y: auto;
    scrollbar-color: white #13151a;
  }
  ul {
    display: flex;
    gap: 0.5em;
  }

  img {
    transition: 0.3s ease-in-out;
    cursor: pointer;
  }

  img:hover {
    opacity: 0.5;
  }
</style>
