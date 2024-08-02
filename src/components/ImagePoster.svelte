<!-- ImagePoster.svelte -->
<!-- purpose: Component to display movie posters where needed. The default size is set to 185x278 as this is the most common size in use on the site for search results and movie lists -->
<!-- sizes can be overwritten for other areas when needed and the imgFluid flag can be used to include the img-fluid class from BootStrap -->
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

<figure>
  <img
    class={imgFluid ? "img-fluid" : ""}
    onerror="this.onerror=null;this.src='{posterPlaceholder.src}'"
    src={posterUrl}
    alt={posterTitle + " Poster"}
    title={posterTitle}
    {height}
    {width}
  />
  <figcaption>{posterTitle}</figcaption>
</figure>

<style>
  figure {
    position: relative;
    margin: 0;
  }

  /* Style for the hover effect except when img-fluid is true */
  img:not(.img-fluid) {
    transition: 0.3s ease-in-out;
    cursor: pointer;
  }

  img:not(.img-fluid):hover {
    opacity: 0.5;
  }

  figcaption {
    background-color: #222;
    color: #fff;
    font: italic smaller sans-serif;
    padding: 3px;
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    opacity: 0.7;
  }
</style>
