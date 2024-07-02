<script>
  let rating = localStorage.getItem("786892");
  $: liked = rating === "liked" ? true : false;
  $: disliked = rating === "disliked" ? true : false;
  $: wishlist = rating === "wishlist" ? true : false;

  function likeMovie(event) {
    console.log(event.target);
    localStorage.setItem("786892", "liked");
    rating = localStorage.getItem("786892");
  }
  function dislikeMovie(event) {
    console.log(event.target);
    localStorage.setItem("786892", "disliked");
    rating = localStorage.getItem("786892");
  }
  function wantToSeeMovie(event) {
    console.log(event.target);
    localStorage.setItem("786892", "wishlist");
    rating = localStorage.getItem("786892");
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
