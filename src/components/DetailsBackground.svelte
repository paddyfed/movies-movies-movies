<!-- DetailsBackground.svelte -->
<!-- Purpose: Wrapper component for Movie and Collection Details to display the background image -->
<script>
  // Build up the URL for the background image
  const imgPosterUrl = "https://image.tmdb.org/t/p/";
  const backdropSize = "w1280";
  let backdropUrl = new URL(imgPosterUrl + backdropSize);
  export let backdropPath;
</script>

<section
  style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)), url({backdropUrl +
    backdropPath}); background-repeat: no-repeat; background-size: cover; background-position: center;"
  class="rounded p-3"
>
  <slot />
</section>
