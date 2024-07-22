<!-- MovieDetails.svelte -->
<!-- purpose: Displays all the details of an individual movie -->
<!-- Includes: Title, Descriptin, Poster, Genre(s), Production Companies, Certifications, Release Date, Run Time, and Trailers -->
<!-- Also has options for marking the movie on the Liked, Disliked, or Wish List lists -->
<script>
  import DisplayDate from "./DisplayDate.svelte";
  import MovieCertification from "./MovieCertification.svelte";
  import MovieDetailsPlaceholder from "./MovieDetailsPlaceholder.svelte";
  import MovieGenres from "./MovieGenres.svelte";
  import MovieRating from "./MovieRating.svelte";
  import MovieTrailers from "./MovieTrailers.svelte";
  import ImagePoster from "./ImagePoster.svelte";
  import { apiOptions } from "../js/apiHelpers";

  // Build up the URL for the background image
  const imgPosterUrl = "https://image.tmdb.org/t/p/";
  const backdropSize = "w1280";
  let backdropUrl = new URL(imgPosterUrl + backdropSize);

  // Get the movie id from the URL
  const movieIdParam = new URLSearchParams(window.location.search).get(
    "movieId"
  );

  // Build up the URL and fetch movie data from the API
  const fetchUrl = `/3/movie/${movieIdParam}`;
  const paramsObj = {
    append_to_response: "videos,release_dates",
    language: "en-US",
  };

  const fullFetchUrl = new URL(fetchUrl, import.meta.env.PUBLIC_API_URL);

  for (const key in paramsObj) {
    fullFetchUrl.searchParams.append(key, paramsObj[key]);
  }

  let promise = fetch(fullFetchUrl, apiOptions).then((r) => {
    if (!r.ok) {
      console.error(r);
      throw new Error(r.status);
    }
    return r.json();
  });
</script>

{#await promise}
  <!-- While API is loading, show placeholder images -->
  <MovieDetailsPlaceholder />
{:then movie}
  <!-- When data is loaded, display the movie details -->
  <section
    style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)), url({backdropUrl +
      movie.backdrop_path}); background-repeat: no-repeat; background-size: cover; background-position: center;"
    class="rounded p-3"
  >
    <h1 class="mb-3">{movie.title}</h1>
    <p class="poster">
      <ImagePoster
        posterTitle={movie.title}
        posterPath={movie.poster_path}
        imgPosterSize="w342"
        imgFluid
        width="342"
        height="513"
      />
    </p>
    <div class="details">
      <p>{movie.overview}</p>

      <p>
        Release Date: <DisplayDate
          date={new Date(Date.parse(movie.release_date))}
        />
      </p>
      <p>Runtime: {movie.runtime} minutes</p>

      <MovieGenres genres={movie.genres} includeLinks />
      <MovieGenres genres={movie.production_companies} />
      <p class="d-flex gap-3">
        <MovieCertification releaseDates={movie.release_dates.results} />
      </p>

      <p>
        <MovieRating movieId={movieIdParam} />
      </p>
    </div>

    <div>
      <MovieTrailers trailers={movie.videos.results} />
    </div>
  </section>
{:catch error}
  <!-- Display the error if one occurs -->
  {error}
{/await}

<style>
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
