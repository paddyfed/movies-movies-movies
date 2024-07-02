<script>
  export let movieId;
  let rating = localStorage.getItem(movieId);
  $: liked = rating === "liked" ? true : false;
  $: disliked = rating === "disliked" ? true : false;
  $: wishlist = rating === "wishlist" ? true : false;

  function likeMovie(event) {
    console.log(event.target);
    if (rating === "liked") {
      localStorage.removeItem(movieId);
    } else {
      localStorage.setItem(movieId, "liked");
    }
    rating = localStorage.getItem(movieId);
  }
  function dislikeMovie(event) {
    console.log(event.target);
    if (rating === "disliked") {
      localStorage.removeItem(movieId);
    } else {
      localStorage.setItem(movieId, "disliked");
    }
    rating = localStorage.getItem(movieId);
  }
  function wantToSeeMovie(event) {
    console.log(event.target);
    if (rating === "wishlist") {
      localStorage.removeItem(movieId);
    } else {
      localStorage.setItem(movieId, "wishlist");
    }
    rating = localStorage.getItem(movieId);
  }
</script>

{rating}

<div class="form-check">
  <input
    class="form-check-input"
    type="checkbox"
    value=""
    id="flexCheckDefault"
    bind:checked={liked}
    on:click={likeMovie}
  />
  <label class="form-check-label" for="flexCheckDefault"> Liked </label>
</div>
<div class="form-check">
  <input
    class="form-check-input"
    type="checkbox"
    value=""
    id="flexCheckChecked"
    bind:checked={disliked}
    on:click={dislikeMovie}
  />
  <label class="form-check-label" for="flexCheckChecked"> Disliked </label>
</div>
<div class="form-check">
  <input
    class="form-check-input"
    type="checkbox"
    value=""
    id="flexCheckChecked2"
    bind:checked={wishlist}
    on:click={wantToSeeMovie}
  />
  <label class="form-check-label" for="flexCheckChecked2"> Want to See </label>
</div>
