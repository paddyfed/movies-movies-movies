<script>
  export let movieId;
  const token = import.meta.env.PUBLIC_API_ACCESS_TOKEN;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: token,
    },
  };

  const imgPosterUrl = "https://image.tmdb.org/t/p/";
  const imgPosterSize = "w185";
  let posterUrl = new URL(imgPosterUrl + imgPosterSize);

  let promise = fetch(
    `${import.meta.env.PUBLIC_API_URL}movie/${movieId}`,
    options
  ).then((x) => x.json());
</script>

{#await promise}
  <div>loading...</div>
{:then data}
  <a href={import.meta.env.BASE_URL + "/movie?movieId=" + data.id}>
    <img
      src={posterUrl + data.poster_path}
      alt={data.title + " Poster"}
      title={data.title}
      width="185"
      height="278"
    />
  </a>
{:catch error}
  {error}
{/await}
