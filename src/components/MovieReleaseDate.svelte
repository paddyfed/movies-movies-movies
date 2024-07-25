<!-- MovieReleaseDate.svelte -->
<!-- Purpose: To display the release date of the movie and to give the option of adding an upcoming movie to a calendar -->
<script>
  import DisplayDate from "./DisplayDate.svelte";
  import "add-to-calendar-button";

  export let movie;

  const releaseDate = new Date(Date.parse(movie.release_date));
  const today = new Date();
</script>

<p style="display: flex; align-items: center; gap: .5em;">
  <span>
    Release Date: <DisplayDate date={releaseDate} />
  </span>
  {#if releaseDate > today}
    <add-to-calendar-button
      name={movie.title}
      startDate={movie.release_date}
      options="'Google','Apple'"
      size="1"
      inline="true"
      hideBranding="true"
    ></add-to-calendar-button>
  {/if}
</p>
