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

<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href={import.meta.env.BASE_URL}
      >Movies Movies Movies</a
    >
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="{import.meta.env.BASE_URL}/settings"
            >Settings</a
          >
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#top"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Dropdown
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#top">Action</a></li>
            <li><a class="dropdown-item" href="#top">Another action</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <a class="dropdown-item" href="#top">Something else here</a>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" aria-disabled="true" href="#top">
            Disabled
          </a>
        </li>
      </ul>
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
    </div>
  </div>
</nav>
