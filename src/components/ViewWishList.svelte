<script>
  import Movie from "./Movie.svelte";

  const localItems = { ...localStorage };

  const likedList = {};
  const dislikedList = {};
  const wishlistList = {};

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

<h2 class="mb-3">Liked</h2>
<ul class="mb-3">
  {#each Object.entries(likedList) as [key, value]}
    <li>
      <Movie movieId={key} />
    </li>
  {/each}
</ul>
<h2 class="mb-3">Disliked</h2>
<ul class="mb-3">
  {#each Object.entries(dislikedList) as [key, value]}
    <li>
      <Movie movieId={key} />
    </li>
  {/each}
</ul>
<h2 class="mb-3">Wishlist</h2>
<ul class="mb-3">
  {#each Object.entries(wishlistList) as [key, value]}
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
