<!-- MovieCollection.svelte -->
<!-- Purpose: To fetch and display the collection of movies as defined by a collection ID on a movie details page -->

<script>
  import { apiOptions } from "../js/apiHelpers";
  import MovieList from "../components/MovieList.svelte";

  // Build up the URL for the background image
  const imgPosterUrl = "https://image.tmdb.org/t/p/";
  const backdropSize = "w1280";
  let backdropUrl = new URL(imgPosterUrl + backdropSize);

  // get the collection id from the URL
  const collectionIdParam = new URLSearchParams(window.location.search).get(
    "collectionId"
  );

  // Build up the URL and fetch the collection data from the API
  // https://api.themoviedb.org/3/collection/10?language=en-US
  const fullFetchUrl = new URL(
    `/3/collection/${collectionIdParam}`,
    import.meta.env.PUBLIC_API_URL
  );
  const paramsObj = {
    language: "en-US",
  };

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

{#await promise}
  Loading
{:then collection}
  <section
    class="rounded p-3"
    style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)), url({backdropUrl +
      collection.backdrop_path}); background-repeat: no-repeat; background-size: cover; background-position: center;"
  >
    <h1 class="mb-3">{collection.name}</h1>
    <MovieList movies={collection.parts} />
  </section>
{:catch error}
  {error}
{/await}
