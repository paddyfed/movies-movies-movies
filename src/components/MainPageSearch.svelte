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

<h2 class="mb-5">Search for your favourite movie</h2>
<form
  class="d-flex flex-column align-items-center"
  role="search"
  id="searchForm"
  name="searchForm"
>
  <input
    class="form-control mb-3"
    type="search"
    name="MovieSearch"
    placeholder="Search"
    aria-label="Search"
    bind:value
    on:submit|preventDefault
    on:keydown={key}
  />
  <a
    class="btn btn-primary mb-5"
    href="{import.meta.env.BASE_URL}/search?query={encodeURIComponent(
      searchValue
    )}"
    on:click={() => (searchValue = value)}
  >
    Search
  </a>
</form>

<style>
  input {
    width: 75vw;
    padding: 1.5em;
    line-height: 1.5em;
    font-size: 20px;
    border-radius: 50px;
    box-shadow: 2px 2px 4px grey;
  }

  a {
    width: 45vw;
    padding: 1em;
    font-size: 18px;
    border-radius: 50px;
  }
</style>
