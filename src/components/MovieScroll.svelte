<script>
  import MovieScrollLoadingSpinner from "./MovieScrollLoadingSpinner.svelte";
  import MovieScrollPagination from "./MovieScrollPagination.svelte";

  export let scrollTitle;
  export let fetchUrl;

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

  let promise = fetch(`${fetchUrl}&page=${currentPage}`, options).then((x) =>
    x.json()
  );

  function paginationClicked(event) {
    const target = event.currentTarget.dataset.target;
    console.log(target);

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
    promise = fetch(`${fetchUrl}&page=${currentPage}`, options).then((x) =>
      x.json()
    );
  }
</script>

<h2 class="mb-3">{scrollTitle}</h2>
{#await promise}
  <!-- While API is loading, show placeholder images -->
  <MovieScrollLoadingSpinner />
{:then data}
  <section class="mb-3">
    <ul>
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
  </section>
{:catch error}
  {error}
{/await}
<MovieScrollPagination on:click={paginationClicked} {maxPages} {currentPage} />

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
