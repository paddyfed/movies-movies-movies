<script>
  export let scrollTitle;
  export let fetchUrl;

  const imgPosterUrl = "http://image.tmdb.org/t/p/";
  const imgPosterSize = "w185/";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.PUBLIC_API_ACCESS_TOKEN,
    },
  };

  let promise = fetch(fetchUrl, options).then((x) => x.json());
</script>

<h2>{scrollTitle}</h2>
{#await promise}
  <p>Loading...</p>
{:then data}
  <section>
    <ul>
      {#each data.results as movie}
        <li>
          <a href={import.meta.env.BASE_URL + "/movie?movieId=" + movie.id}>
            <img
              src={imgPosterUrl + imgPosterSize + movie.poster_path}
              alt={movie.title}
              title={movie.title}
            />
          </a>
        </li>
      {/each}
    </ul>
  </section>
{:catch error}
  {error}
{/await}

<style>
  section {
    overflow-y: auto;
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
