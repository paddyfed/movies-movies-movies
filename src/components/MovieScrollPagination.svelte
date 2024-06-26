<script>
  export let maxPages = 5;
  export let currentPage;
</script>

<nav aria-label="Movie Scroll Pagination" class="mb-3">
  <ul class="pagination pagination-sm">
    <li class="page-item {currentPage === 1 ? 'disabled' : ''}">
      <button
        class="page-link {currentPage === 1
          ? 'bg-dark-subtle text-primary-emphasis'
          : 'bg-dark text-primary'}"
        aria-label="Previous"
        on:click|preventDefault
      >
        <i class="fa fa-fw fa-caret-left" aria-label="Previous"></i>
      </button>
    </li>
    {#if maxPages > 0}
      {#each Array(maxPages) as _, index}
        <li class="page-item {currentPage === index + 1 ? 'active' : ''}">
          <button
            class="page-link bg-dark text-primary"
            on:click|preventDefault
          >
            {index + 1}
          </button>
        </li>
      {/each}
    {/if}
    <li class="page-item {currentPage === maxPages ? 'disabled' : ''}">
      <button
        class="page-link {currentPage === maxPages
          ? 'bg-dark-subtle text-primary-emphasis'
          : 'bg-dark text-primary'}"
        aria-label="Next"
        on:click|preventDefault
      >
        <i class="fa fa-fw fa-caret-right" aria-label="Next"></i>
      </button>
    </li>
  </ul>
</nav>
