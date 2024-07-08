<script>
  export let maxPages = 5;
  export let currentPage;
</script>

<nav aria-label="Pagination" class="mb-3">
  <ul class="pagination">
    <li class="page-item">
      <button
        class="page-link"
        aria-label="Previous"
        data-target="Previous"
        on:click|preventDefault
        disabled={currentPage === 1}
      >
        <i class="fa fa-fw fa-caret-left" aria-label="Previous"></i>
      </button>
    </li>
    {#if maxPages > 0}
      {#each Array(maxPages) as _, index}
        <li class="page-item {currentPage === index + 1 ? 'active' : ''}">
          <button
            class="page-link"
            on:click|preventDefault
            data-target={index + 1}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        </li>
      {/each}
    {/if}
    <li class="page-item">
      <button
        class="page-link"
        aria-label="Next"
        data-target="Next"
        on:click|preventDefault
        disabled={currentPage === maxPages}
      >
        <i class="fa fa-fw fa-caret-right" aria-label="Next"></i>
      </button>
    </li>
  </ul>
</nav>
