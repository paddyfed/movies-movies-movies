<!-- ViewWishList.svelte -->
<!-- Purpose: Displays the movies that the user has Liked, Disliked, or put on the Wish List -->
<script>
  import { buildFetchUrl, getData } from "../js/apiHelpers";
  import MovieList from "./MovieList.svelte";
  import MovieScrollLoadingSpinner from "./MovieScrollLoadingSpinner.svelte";

  // load all items from localStorage
  const localItems = { ...localStorage };

  const likedList = {};
  const dislikedList = {};
  const wishlistList = {};

  // for each item in the localStorage, add the items to a liked, disliked, or wishlist object
  for (const key in localItems) {
    if (Object.hasOwnProperty.call(localItems, key)) {
      const element = localItems[key];
      if (element === "liked") {
        likedList[key] = localItems[key];
      }
      if (element === "disliked") {
        dislikedList[key] = localItems[key];
      }
      if (element === "wishlist") {
        wishlistList[key] = localItems[key];
      }
    }
  }

  async function convertFromMovieIdsToMovieList(list) {
    // get the property names from the list. This will be an array of Movie IDs
    const movieIds = Object.getOwnPropertyNames(list);

    // get a list of URLs that we need to fetch later
    const fetchUrls = movieIds.map((movieId) => {
      const fullFetchUrl = buildFetchUrl(`/3/movie/${movieId}`, {
        language: "en-US",
      });
      return fullFetchUrl;
    });

    // create an array of 'fetch' for each fetch URLs
    const fetchArray = fetchUrls.map((fetchUrl) => {
      return getData(fetchUrl);
    });

    try {
      // Promise.all() lets us coalesce multiple promises into a single super-promise
      var data = await Promise.all(fetchArray);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  let wishListPromise = convertFromMovieIdsToMovieList(wishlistList);
  let likedListPromise = convertFromMovieIdsToMovieList(likedList);
  let dislikedListPromise = convertFromMovieIdsToMovieList(dislikedList);
</script>

<!-- Display all the movies that have been marked as 'Liked' -->
<section>
  <h2 class="mb-3">Liked</h2>
  {#await likedListPromise}
    <MovieScrollLoadingSpinner />
  {:then data}
    <MovieList movies={data} />
  {:catch error}
    {error.message}
  {/await}
</section>

<!-- Display all the movies that have been marked as 'Disliked' -->
<section>
  <h2 class="mb-3">Disliked</h2>
  {#await dislikedListPromise}
    <MovieScrollLoadingSpinner />
  {:then data}
    <MovieList movies={data} />
  {:catch error}
    {error.message}
  {/await}
</section>

<!-- Display all the movies that have been marked for the 'WishList' -->
<section>
  <h2 class="mb-3">Want to See</h2>
  {#await wishListPromise}
    <MovieScrollLoadingSpinner />
  {:then data}
    <MovieList movies={data} />
  {:catch error}
    {error.message}
  {/await}
</section>
