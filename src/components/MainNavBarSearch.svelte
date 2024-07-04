<script>
  let value = new URLSearchParams(window.location.search).get("query");
  let searchValue;

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

<form class="d-flex" role="search" id="searchForm" name="searchForm">
  <input
    class="form-control me-2"
    type="search"
    placeholder="Search"
    aria-label="Search"
    bind:value
    on:submit|preventDefault
    on:keydown={key}
  />
  <a
    class="btn btn-outline-success"
    href="{import.meta.env.BASE_URL}/search?query={encodeURIComponent(
      searchValue
    )}"
    on:click={() => (searchValue = value)}>Search</a
  >
</form>
