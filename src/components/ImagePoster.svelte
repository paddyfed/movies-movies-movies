<script>
  import posterPlaceholder from "../images/no-image-placeholder.svg";

  export let imgPosterSize = "w185";
  export let posterTitle;
  export let posterPath;
  export let width = 185;
  export let height = 278;
  export let imgFluid = false;

  const imgPosterUrl = "https://image.tmdb.org/t/p/";

  let posterUrl = new URL(imgPosterUrl + imgPosterSize + posterPath);
</script>

<img
  class={imgFluid ? "img-fluid" : ""}
  onerror="this.onerror=null;this.src='{posterPlaceholder.src}'"
  src={posterUrl}
  alt={posterTitle + " Poster"}
  title={posterTitle}
  {height}
  {width}
/>

<style>
  img:not(.img-fluid) {
    transition: 0.3s ease-in-out;
    cursor: pointer;
  }

  img:not(.img-fluid):hover {
    opacity: 0.5;
  }
</style>
