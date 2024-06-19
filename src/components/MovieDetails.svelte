<script>
  import MovieTrailers from "./MovieTrailers.svelte";

  const movieIdParam = new URLSearchParams(window.location.search).get(
    "movieId"
  );
  const token = import.meta.env.PUBLIC_API_ACCESS_TOKEN;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: token,
    },
  };
  const imgPosterUrl = "https://image.tmdb.org/t/p/";
  const imgPosterSize = "w342/";

  let promise = fetch(
    `${import.meta.env.PUBLIC_API_URL}movie/${movieIdParam}`,
    options
  ).then((x) => x.json());
</script>

{#await promise}
  <div>Loading....</div>
{:then data}
  <h1>{data.title}</h1>
  <p>{data.overview}</p>
  <p>
    <img
      src={imgPosterUrl + imgPosterSize + data.poster_path}
      alt={data.title + " Poster"}
      title={data.title}
    />
  </p>
  <p>
    Release Date: {new Date(Date.parse(data.release_date)).toLocaleDateString()}
  </p>
  <MovieTrailers movieId={movieIdParam} />
{:catch error}
  {console.log(error)}
{/await}

<!-- outputHtml += `<p><img src="${imgPosterUrl + imgPosterSize + data.poster_path}" alt="${data.title + "Poster"}" /></p>`; -->
