<script>
  import MovieScrollLoadingSpinner from "./MovieScrollLoadingSpinner.svelte";

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

  function increment(event) {
    event.preventDefault();
    page += 1;
    if (page > maxPages) {
      page = maxPages;
    }
    promise = fetch(`${fetchUrl}&page=${page}`, options).then((x) => x.json());
  }
  function decrement(event) {
    event.preventDefault();
    page -= 1;
    if (page < 1) {
      page = 1;
    }
    promise = fetch(`${fetchUrl}&page=${page}`, options).then((x) => x.json());
  }
  function navigate(event) {
    event.preventDefault();
    page = parseInt(event.target.textContent);
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
  <nav aria-label="Movie Scroll Pagination">
    <ul class="pagination pagination-sm">
      <li class="page-item">
        <a
          class="page-link bg-dark text-light"
          aria-label="Previous"
          href="#"
          on:click={decrement}
        >
          <i class="fa fa-fw fa-caret-left"></i>
        </a>
      </li>
      <li class="page-item">
        <a class="page-link bg-dark text-light" href="#" on:click={navigate}>
          1
        </a>
      </li>
      <li class="page-item">
        <a class="page-link bg-dark text-light" href="#" on:click={navigate}>
          2
        </a>
      </li>
      <li class="page-item">
        <a class="page-link bg-dark text-light" href="#" on:click={navigate}>
          3
        </a>
      </li>
      <li class="page-item">
        <a class="page-link bg-dark text-light" href="#" on:click={navigate}>
          4
        </a>
      </li>
      <li class="page-item">
        <a class="page-link bg-dark text-light" href="#" on:click={navigate}>
          5
        </a>
      </li>
      <li class="page-item">
        <a
          class="page-link bg-dark text-light"
          arai-label="Next"
          href="#"
          on:click={increment}
        >
          <i class="fa fa-fw fa-caret-right"></i>
        </a>
      </li>
    </ul>
  </nav>
  <!-- <p>{page} of {maxPages}</p> -->
  <!-- {#if page !== 1}
    <button type="button" class="btn btn-primary" on:click={decrement}>
      <i class="fa fa-fw fa-caret-left"></i>
    </button>
  {/if}
  {#if page !== maxPages}
    <button type="button" class="btn btn-primary" on:click={increment}>
      <i class="fa fa-fw fa-caret-right"></i>
    </button>
  {/if} -->
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
