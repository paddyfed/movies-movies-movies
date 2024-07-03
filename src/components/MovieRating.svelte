<script>
  export let movieId;
  let rating = localStorage.getItem(movieId);
  $: liked = rating === "liked" ? true : false;
  $: disliked = rating === "disliked" ? true : false;
  $: wishlist = rating === "wishlist" ? true : false;

  function processRatingClick(event) {
    const buttonClicked = event.currentTarget.dataset.target;
    if (rating === buttonClicked) {
      localStorage.removeItem(movieId);
    } else {
      localStorage.setItem(movieId, buttonClicked);
    }
    rating = localStorage.getItem(movieId);
    console.log({ ...localStorage });
  }
</script>

<button
  class:liked
  on:click|preventDefault={processRatingClick}
  aria-label="Like"
  data-target="liked"
>
  <i class="fa-regular fa-thumbs-up fa-4x fa-fw"></i>
</button>
<button
  class:disliked
  on:click|preventDefault={processRatingClick}
  aria-label="Dislike"
  data-target="disliked"
>
  <i class="fa-regular fa-thumbs-down fa-flip-horizontal fa-4x fa-fw"></i>
</button>
<button
  class:wishlist
  on:click|preventDefault={processRatingClick}
  aria-label="Want to See"
  data-target="wishlist"
>
  <i class="fa-regular fa-heart fa-4x fa-fw"></i>
</button>

<style>
  .liked {
    color: hsl(120, 100%, 40%);
  }
  .disliked {
    color: hsl(0, 100%, 40%);
  }
  .wishlist {
    color: hsl(240, 100%, 40%);
  }
  .liked:hover {
    color: hsl(120, 100%, 60%);
  }
  .disliked:hover {
    color: hsl(0, 100%, 60%);
  }
  .wishlist:hover {
    color: hsl(240, 100%, 60%);
  }

  button {
    border: 0;
    background: none;
    color: hsl(0, 0%, 40%);
    transition: color 0.5s;
  }
  button:hover {
    color: hsl(0, 0%, 60%);
  }
</style>
