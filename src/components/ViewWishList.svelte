<!-- ViewWishList.svelte -->
<!-- Purpose: Displays the movies that the user has Liked, Disliked, or put on the Wish List -->
<script>
  import Movie from "./Movie.svelte";
  import { apiOptions } from "../js/apiHelpers";
  import MovieList from "./MovieList.svelte";

  // load all items from localStorage
  const localItems = { ...localStorage };

  const likedList = {};
  const dislikedList = {};
  const wishlistList = {};

  // fir each item in the localStorage, add the items to a liked, disliked, or wishlist object
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
  let movieDetails = [];
  let promise = convertToMovieList(likedList);
  // convertToMovieList(dislikedList);
  // convertToMovieList(wishlistList);

  //Transform lists into MovieLists so that we can use the Movie List component
  // We need to fetch the movie details to construct the list that MovieList needs as at the minute we only have the Movie ID
  async function convertToMovieList(list) {
    console.log("wishlistList", list);

    // get the property names from the list. This will be an array of Movie IDs
    const movieIds = Object.getOwnPropertyNames(list);
    console.log("movieIds", movieIds);

    // run fetch on all of the IDs to get all the movie info
    // Build up the URL and fetch movie data from the API
    const fetchUrl = `/3/movie/${movieIds[0]}`;
    const paramsObj = {
      language: "en-US",
    };

    const fullFetchUrl = new URL(fetchUrl, import.meta.env.PUBLIC_API_URL);
    console.log("fullFetchUrl", fullFetchUrl);

    for (const key in paramsObj) {
      fullFetchUrl.searchParams.append(key, paramsObj[key]);
    }

    let promise = await fetch(fullFetchUrl, apiOptions)
      .then((r) => {
        if (!r.ok) {
          throw new Error(r.status);
        }
        return r.json();
      })
      .then((data) => {
        movieDetails.push(data);
        console.log("data", data);
        return data;
      });

    console.log("promise", promise);
    console.log("movieDetails", movieDetails);
    return promise;
  }
</script>

{#await promise then data}
  <MovieList movies={[data]} />
{/await}
<!-- Display all the movies that have been marked as 'Liked' -->
<h2 class="mb-3">Liked</h2>
<ul class="mb-3">
  {#each Object.entries(likedList) as [key]}
    <li>
      <Movie movieId={key} />
    </li>
  {/each}
</ul>
<!-- Display all the movies that have been marked as 'Disliked' -->
<h2 class="mb-3">Disliked</h2>
<ul class="mb-3">
  {#each Object.entries(dislikedList) as [key]}
    <li>
      <Movie movieId={key} />
    </li>
  {/each}
</ul>
<!-- Display all the movies that have been marked for the 'WishList' -->
<h2 class="mb-3">Wishlist</h2>
<ul class="mb-3">
  {#each Object.entries(wishlistList) as [key]}
    <li>
      <Movie movieId={key} />
    </li>
  {/each}
</ul>

<style>
  ul {
    display: flex;
    gap: 0.5em;
    flex-wrap: wrap;
  }
</style>
