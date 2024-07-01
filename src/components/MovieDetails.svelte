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

  let backdropUrl = new URL(imgPosterUrl + backdropSize);
  let posterUrl = new URL(imgPosterUrl + imgPosterSize);

  let promise = fetch(
    `${import.meta.env.PUBLIC_API_URL}movie/${movieIdParam}`,
    options
  ).then((x) => x.json());
</script>

{#await promise}
  <div>Loading....</div>
{:then data}
  <section
    style="background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1)), url({backdropUrl +
      data.backdrop_path}); background-repeat: no-repeat; background-size: cover;"
    class="rounded p-3"
  >
    <h1 class="mb-3">{data.title}</h1>
    <p class="poster">
      <img
        src={posterUrl + data.poster_path}
        alt={data.title + " Poster"}
        title={data.title}
      />
    </p>
    <div class="details">
      <p>{data.overview}</p>

      <p>
        Release Date: {new Date(
          Date.parse(data.release_date)
        ).toLocaleDateString(dateSetting, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </div>

    <div>
      <MovieTrailers movieId={movieIdParam} />
    </div>
  </section>
{:catch error}
  {console.log(error)}
{/await}

<style>
  img {
    max-width: 100%;
  }
  section {
    display: grid;
    gap: 0.5em;
    grid-template-columns: 1fr 50% 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      "header header header"
      "poster details ."
      "footer footer footer";
  }

  h1 {
    grid-area: header;
  }

  div {
    grid-area: footer;
  }

  .poster {
    grid-area: poster;
  }

  .details {
    grid-area: details;
  }

  @media screen and (max-width: 768px) {
    section {
      display: block;
    }
  }
</style>
