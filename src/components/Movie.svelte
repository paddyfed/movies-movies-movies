<script>
  import posterPlaceholder from "../images/no-image-placeholder.svg";

  export let movieId;
  const token = import.meta.env.PUBLIC_API_ACCESS_TOKEN;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: token,
    },
  };

  const fetchUrl = `/3/movie/${movieId}`;

  const fullFetchUrl = new URL(fetchUrl, import.meta.env.PUBLIC_API_URL);

  const imgPosterUrl = "https://image.tmdb.org/t/p/";
  const imgPosterSize = "w185";
  let posterUrl = new URL(imgPosterUrl + imgPosterSize);

  let promise = fetch(fullFetchUrl, options).then((x) => x.json());
</script>

{#await promise}
  <!-- While API is loading, show placeholder images -->
  <div><i class="fa-solid fa-spinner fa-spin"></i></div>
{:then data}
  <!-- When data is loaded, display the movie poster -->
  <a href={import.meta.env.BASE_URL + "/movie?movieId=" + data.id}>
    <img
      onerror="this.onerror=null;this.src='{posterPlaceholder.src}'"
      src={posterUrl + data.poster_path}
      alt={data.title + " Poster"}
      title={data.title}
      width="185"
      height="278"
    />
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
