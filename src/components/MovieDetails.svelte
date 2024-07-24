<!-- MovieDetails.svelte -->
<!-- purpose: Displays all the details of an individual movie -->
<!-- Includes: Title, Descriptin, Poster, Genre(s), Production Companies, Certifications, Release Date, Run Time, and Trailers -->
<!-- Also has options for marking the movie on the Liked, Disliked, or Wish List lists -->
<script>
  import MovieCertification from "./MovieCertification.svelte";
  import MovieDetailsPlaceholder from "./MovieDetailsPlaceholder.svelte";
  import MovieGenres from "./MovieGenres.svelte";
  import MovieRating from "./MovieRating.svelte";
  import MovieTrailers from "./MovieTrailers.svelte";
  import ImagePoster from "./ImagePoster.svelte";
  import { apiOptions } from "../js/apiHelpers";
  import PageNotFound from "./PageNotFound.svelte";
  import DetailsBackground from "./DetailsBackground.svelte";
  import MovieReleaseDate from "./MovieReleaseDate.svelte";

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
      throw new Error(r.status);
    }
    return r.json();
  });
</script>

<!-- Include the Movie Title in the page title -->
<svelte:head>
  {#await promise then movie}
    <title>Movies Movies Movies : Movie : {movie.title}</title>
  {/await}
</svelte:head>

{#await promise}
  <!-- While API is loading, show placeholder images -->
  <MovieDetailsPlaceholder />
{:then movie}
  <!-- When data is loaded, display the movie details -->
  <DetailsBackground backdropPath={movie.backdrop_path}>
    <section>
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
        <MovieReleaseDate {movie} />

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
      <div class="trailers">
        <MovieTrailers trailers={movie.videos.results} />
      </div>
      {#if movie.belongs_to_collection}
        <div class="collection">
          <h2>{movie.belongs_to_collection.name}</h2>
          <a
            href={import.meta.env.BASE_URL +
              "/collection?collectionId=" +
              movie.belongs_to_collection.id}
          >
            See more movies in this collection
          </a>
        </div>
      {/if}
    </section>
  </DetailsBackground>
{:catch error}
  <!-- Display the error if one occurs -->
  {#if error.message === "404"}
    <PageNotFound />
  {:else}
    {error.message}
  {/if}
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
      "trailers trailers trailers"
      "collection collection collection";
    color: var(--bs-light);
  }

  h1 {
    grid-area: header;
  }

  .trailers {
    grid-area: trailers;
  }

  .poster {
    grid-area: poster;
  }

  .details {
    grid-area: details;
  }

  .collection {
    grid-area: collection;
  }

  @media screen and (max-width: 768px) {
    section {
      display: block;
    }
  }
</style>
