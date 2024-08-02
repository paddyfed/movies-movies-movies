<!-- MovieCollection.svelte -->
<!-- Purpose: To fetch and display the collection of movies as defined by a collection ID on a movie details page -->

<script>
  import { buildFetchUrl, getData } from "../js/apiHelpers";
  import MovieList from "../components/MovieList.svelte";
  import DetailsBackground from "./DetailsBackground.svelte";
  import PageNotFound from "./PageNotFound.svelte";
  import MovieScrollLoadingSpinner from "./MovieScrollLoadingSpinner.svelte";

  // get the collection id from the URL
  const collectionIdParam = new URLSearchParams(window.location.search).get(
    "collectionId"
  );

  // Build up the URL and fetch the collection data from the API
  // https://api.themoviedb.org/3/collection/10?language=en-US
  const fullFetchUrl = buildFetchUrl(`/3/collection/${collectionIdParam}`, {
    language: "en-US",
  });

  let promise = getData(fullFetchUrl);
</script>

<!-- Include the collection name in the page title -->
<svelte:head>
  {#await promise then collection}
    <title>Movies Movies Movies : Collection : {collection.name}</title>
  {/await}
</svelte:head>

{#await promise}
  <MovieScrollLoadingSpinner />
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
