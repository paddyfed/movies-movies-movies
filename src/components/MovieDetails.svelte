<script>
  import MovieCertification from "./MovieCertification.svelte";
  import MovieDetailsPlaceholder from "./MovieDetailsPlaceholder.svelte";
  import MovieGenres from "./MovieGenres.svelte";
  import MovieRating from "./MovieRating.svelte";
  import MovieTrailers from "./MovieTrailers.svelte";

  const dateSetting =
    localStorage.getItem("dateSettingSelected") ?? "en-IE_Long";

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

  const fetchUrl = `/3/movie/${movieIdParam}`;
  const paramsObj = {
    append_to_response: "videos,release_dates",
    include_adult: false,
    language: "en-US",
  };

  const fullFetchUrl = new URL(fetchUrl, import.meta.env.PUBLIC_API_URL);

  for (const key in paramsObj) {
    fullFetchUrl.searchParams.append(key, paramsObj[key]);
  }

  let backdropUrl = new URL(imgPosterUrl + backdropSize);
  let posterUrl = new URL(imgPosterUrl + imgPosterSize);

  let promise = fetch(fullFetchUrl, options).then((x) => x.json());

  const longDateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const shortDateOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const localeSetting = {
    "en-IE_Long": "en-IE",
    "en-IE": "en-IE",
    "en-US_Long": "en-US",
    "en-US": "en-US",
    "de-DE_Long": "de-DE",
    "de-DE": "de-DE",
    "ko-KR_Long": "ko-KR",
    "ko-KR": "ko-KR",
    "en-IE_Short": "en-IE",
    "en-US_Short": "en-US",
    "de-DE_Short": "de-DE",
    "ko-KR_Short": "ko-KR",
  };

  const optionsSetting = {
    "en-IE_Long": longDateOptions,
    "en-IE": longDateOptions,
    "en-US_Long": longDateOptions,
    "en-US": longDateOptions,
    "de-DE_Long": longDateOptions,
    "de-DE": longDateOptions,
    "ko-KR_Long": longDateOptions,
    "ko-KR": longDateOptions,
    "en-IE_Short": shortDateOptions,
    "en-US_Short": shortDateOptions,
    "de-DE_Short": shortDateOptions,
    "ko-KR_Short": shortDateOptions,
  };
</script>

{#await promise}
  <!-- While API is loading, show placeholder images -->
  <MovieDetailsPlaceholder />
{:then data}
  <!-- When data is loaded, display the movie details -->
  <section
    style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)), url({backdropUrl +
      data.backdrop_path}); background-repeat: no-repeat; background-size: cover;"
    class="rounded p-3"
  >
    <h1 class="mb-3">{data.title}</h1>
    <p class="poster">
      <img
        class="img-fluid"
        src={posterUrl + data.poster_path}
        alt={data.title + " Poster"}
        title={data.title}
        width="342"
        height="513"
      />
    </p>
    <div class="details">
      <p>{data.overview}</p>

      <p>
        Release Date: {new Date(
          Date.parse(data.release_date)
        ).toLocaleDateString(
          localeSetting[dateSetting],
          optionsSetting[dateSetting]
        )}
      </p>
      <p>Runtime: {data.runtime} minutes</p>

      <MovieGenres genres={data.genres} />
      <MovieGenres genres={data.production_companies} />
      <p>
        <MovieCertification releaseDates={data.release_dates.results} />
      </p>

      <p>
        <MovieRating movieId={movieIdParam} />
      </p>
    </div>

    <div>
      <MovieTrailers trailers={data.videos.results} />
    </div>
  </section>
{:catch error}
  <!-- Display the error if one occurs -->
  {error}
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
    color: var(--bs-light);
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
