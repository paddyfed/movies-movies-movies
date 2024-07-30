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
  // let movieDetails = [];
  // let promises = convertToMovieList(likedList);
  // console.log("promises", promises);
  // // convertToMovieList(dislikedList);
  // // convertToMovieList(wishlistList);

  // //Transform lists into MovieLists so that we can use the Movie List component
  // // We need to fetch the movie details to construct the list that MovieList needs as at the minute we only have the Movie ID
  // async function convertToMovieList(list) {
  //   const paramsObj = {
  //     language: "en-US",
  //   };
  //   console.log("wishlistList", list);

  //   // get the property names from the list. This will be an array of Movie IDs
  //   const movieIds = Object.getOwnPropertyNames(list);
  //   console.log("movieIds", movieIds);
  //   const fetchUrls = movieIds.map((movieId) => {
  //     const fetchUrl = `/3/movie/${movieId}`;
  //     const fullFetchUrl = new URL(fetchUrl, import.meta.env.PUBLIC_API_URL);

  //     for (const key in paramsObj) {
  //       fullFetchUrl.searchParams.append(key, paramsObj[key]);
  //     }
  //     return fullFetchUrl;
  //   });

  //   console.log("fetchUrls", fetchUrls);
  //   // run fetch on all of the IDs to get all the movie info
  //   // Build up the URL and fetch movie data from the API

  //   try {
  //     let promise = await Promise.all(
  //       fetchUrls.forEach((fetchUrl) => {
  //         fetch(fetchUrl, apiOptions).then((r) => {
  //           if (!r.ok) {
  //             throw new Error(r.status);
  //           }
  //           return r.json();
  //         });
  //       })
  //     );
  //     console.log("promise", promise);
  //     console.log("movieDetails", movieDetails);
  //   } catch (error) {
  //     console.error(error);
  //   }

  //   return promise;
  // }

  async function fetchURLs(list) {
    const paramsObj = {
      language: "en-US",
    };

    // get the property names from the list. This will be an array of Movie IDs
    const movieIds = Object.getOwnPropertyNames(list);

    const fetchUrlsss = movieIds.map((movieId) => {
      const fetchUrl = `/3/movie/${movieId}`;
      const fullFetchUrl = new URL(fetchUrl, import.meta.env.PUBLIC_API_URL);

      for (const key in paramsObj) {
        fullFetchUrl.searchParams.append(key, paramsObj[key]);
      }
      return fullFetchUrl;
    });

    const finalFetch = fetchUrlsss.map((i) => {
      return fetch(i, apiOptions).then((response) => response.json());
    });

    console.log("finalFetch", finalFetch);
    try {
      // Promise.all() lets us coalesce multiple promises into a single super-promise
      var data = await Promise.all(finalFetch);

      console.log(data);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  let promises = fetchURLs(wishlistList);
</script>

{#await promises}
  loading
{:then data}
  <!-- {#each data as m}
    {JSON.stringify(m)}
    <MovieList movies={[m]} />
  {/each} -->
  <MovieList movies={data} />
{:catch error}
  {error.message}
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
