<!-- MainNavBarSearch.svelte Component -->
<!-- Purpose: Runs the search bar on the top nav bar -->
<script>
  let value = new URLSearchParams(window.location.search).get("query");
  let searchValue;

  // Added this event handler to capture keybaord events as there was an issue
  // when the Enter key is pressed when entering a search query
  function key(e) {
    switch (e.keyCode) {
      // this is the enter key. This ensures pressing Enter will run the search
      case 13:
        e.preventDefault();
        searchValue = value;
        window.location.href = `${import.meta.env.BASE_URL}/search?query=${encodeURIComponent(
          searchValue
        )}`;
        break;
    }
  }
</script>

{window.location.pathname}
{#if window.location.pathname !== "/movies-movies-movies"}
  <form class="d-flex" role="search" id="searchForm" name="searchForm">
    <input
      class="form-control me-2"
      type="search"
      placeholder="Search"
      name="MovieSearch"
      aria-label="Search"
      bind:value
      on:submit|preventDefault
      on:keydown={key}
    />
    <a
      class="btn btn-primary"
      href="{import.meta.env.BASE_URL}/search?query={encodeURIComponent(
        searchValue
      )}"
      on:click={() => (searchValue = value)}>Search</a
    >
  </form>
{/if}
