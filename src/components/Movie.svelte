<script>
  import ImagePoster from "./ImagePoster.svelte";
  import { apiOptions } from "../js/apiHelpers";

  export let movieId;

  const fetchUrl = `/3/movie/${movieId}`;

  const fullFetchUrl = new URL(fetchUrl, import.meta.env.PUBLIC_API_URL);

  let promise = fetch(fullFetchUrl, apiOptions).then((x) => x.json());
</script>

{#await promise}
  <!-- While API is loading, show placeholder images -->
  <div><i class="fa-solid fa-spinner fa-spin"></i></div>
{:then data}
  <!-- When data is loaded, display the movie poster -->
  <a href={import.meta.env.BASE_URL + "/movie?movieId=" + data.id}>
    <ImagePoster posterTitle={data.title} posterPath={data.poster_path} />
  </a>
{:catch error}
  <!-- Display the error if one occurs -->
  {error}
{/await}

<style>
  div {
    height: 278px;
    width: 185px;
    background-color: gray;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
