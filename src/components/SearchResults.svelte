<script>
  const queryParam = new URLSearchParams(window.location.search).get("query");

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
    )}&include_adult=false&language=en-US&page=1`,
    options
  ).then((x) => x.json());
</script>

{#await promise}
  <div>Loading....</div>
{:then data}
  <h1>{queryParam}</h1>
  {#each data.results as result}
    <p>{result.title}</p>
    <p>
      <img
        src="https://image.tmdb.org/t/p/w185/{result.poster_path}"
        alt="{result.title} poster"
      />
    </p>
    <p>{result.overview}</p>
  {/each}
  {JSON.stringify(data)}
{:catch error}
  {console.log(error)}
{/await}
