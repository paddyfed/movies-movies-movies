<script>
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

<h2>Liked</h2>
{#each Object.entries(likedList) as [key, value]}
  <p>{key}</p>
{/each}
<h2>Disliked</h2>
{#each Object.entries(dislikedList) as [key, value]}
  <p>{key}</p>
{/each}
<h2>Wishlist</h2>
{#each Object.entries(wishlistList) as [key, value]}
  <p>{key}</p>
{/each}
