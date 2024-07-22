<!-- ViewWishList.svelte -->
<!-- Purpose: Displays the movies that the user has Liked, Disliked, or put on the Wish List -->
<script>
  import Movie from "./Movie.svelte";

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
</script>

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
