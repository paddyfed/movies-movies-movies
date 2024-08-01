<!-- MovieRating.svelte -->
<!-- Purpose: Displays icons and handles user clicks for the Liked, Disliked, and WishList options on the MovieDetails page -->
<script>
  import { displayToaster } from "../js/toastHelpers";

  // MovieID is passed from the MovieDetails component
  export let movieId;

  // We read if there is any current rating for this movieId from localStorage. It should be one of "liked", "disliked, or "wishlist"
  // we populate corresponding variables to be true or false depending on what is laoded from localStorage to indicate when buttons have been clicked
  let rating = localStorage.getItem(movieId);
  $: liked = rating === "liked" ? true : false;
  $: disliked = rating === "disliked" ? true : false;
  $: wishlist = rating === "wishlist" ? true : false;

  // Process the user click on any of the rating icons
  function processRatingClick(event) {
    // First, find which button was clicked
    const buttonClicked = event.currentTarget.dataset.target;

    // When the rating is already the same as the button that was clicked, then we will remove the item from localStorage
    // This has the affect of 'turning off' or 'de-selecting' the option that was already clicked
    if (rating === buttonClicked) {
      localStorage.removeItem(movieId);
    }
    // Else, if the rating is not the same as the button that was clicked, we will update localStorage with the selected button
    // This has the affect of 'turning on' the option that was clicked while 'turning off' any other option that was clicked
    else {
      localStorage.setItem(movieId, buttonClicked);
    }

    // update the rating variable so that svelte will update any UI elements
    rating = localStorage.getItem(movieId);
    displayToaster(`Movie marked as ${rating}`);
  }
</script>

<!-- Each button has a class to toggle the different states of the button. data-target is used by the event handler to determine which button was selected. -->
<!-- FontAwesome icons are used for the different buttons -->
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
  /* CSS for the button colors. I have used HSL so that I can get a consistancy for each color and have adjusted the lightness for the hover affect  */
  .liked {
    color: hsl(120, 100%, 40%);
  }
  .liked:hover {
    color: hsl(120, 100%, 60%);
  }
  .disliked {
    color: hsl(0, 100%, 40%);
  }
  .disliked:hover {
    color: hsl(0, 100%, 60%);
  }
  .wishlist {
    color: hsl(240, 100%, 40%);
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
