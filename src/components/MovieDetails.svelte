<script>
  import MovieTrailers from "./MovieTrailers.svelte";

  const dateSetting = localStorage.getItem("dateSettingSelected") ?? "en-IE";

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
  const imgPosterSize = "w342";
  const backdropSize = "w1280";

  let backdrop = new URL(imgPosterUrl + backdropSize);

  let promise = fetch(
    `${import.meta.env.PUBLIC_API_URL}movie/${movieIdParam}`,
    options
  ).then((x) => x.json());
</script>

{#await promise}
  <div>Loading....</div>
{:then data}
  <section
    style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)), url({backdrop +
      data.backdrop_path}); background-repeat: no-repeat; background-size: cover;"
  >
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
      Release Date: {new Date(Date.parse(data.release_date)).toLocaleDateString(
        dateSetting,
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      )}
    </p>

    <MovieTrailers movieId={movieIdParam} />
  </section>
{:catch error}
  {console.log(error)}
{/await}
