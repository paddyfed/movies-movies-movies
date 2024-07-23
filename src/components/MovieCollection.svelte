<!-- MovieCollection.svelte -->
<!-- Purpose: To fetch and display the collection of movies as defined by a collection ID on a movie details page -->

<script>
  import { apiOptions } from "../js/apiHelpers";
  import MovieList from "../components/MovieList.svelte";
  import DetailsBackground from "./DetailsBackground.svelte";
  import PageNotFound from "./PageNotFound.svelte";

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
  <DetailsBackground backdropPath={collection.backdrop_path}>
    <h1 class="mb-3">{collection.name}</h1>
    <p>{collection.overview}</p>
    <MovieList movies={collection.parts} />
  </DetailsBackground>
{:catch error}
  {#if error.message === "404"}
    <PageNotFound />
  {:else}
    {error.message}
  {/if}
{/await}
