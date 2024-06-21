<script>
  export let maxPages = 5;
  export let currentPage;
</script>

<nav aria-label="Movie Scroll Pagination">
  <ul class="pagination pagination-sm">
    <li class="page-item">
      <a
        class="page-link bg-dark text-primary"
        aria-label="Previous"
        href="#"
        on:click|preventDefault
      >
        <i class="fa fa-fw fa-caret-left" aria-label="Previous"></i>
      </a>
    </li>
    {#if maxPages > 0}
      {#each Array(maxPages) as _, index}
        <li class="page-item{currentPage === index + 1 ? ' active' : ''}">
          <a
            class="page-link bg-dark text-primary"
            href="#"
            on:click|preventDefault
          >
            {index + 1}
          </a>
        </li>
      {/each}
    {/if}
    <li class="page-item">
      <a
        class="page-link bg-dark text-primary"
        aria-label="Next"
        href="#"
        on:click|preventDefault
      >
        <i class="fa fa-fw fa-caret-right" aria-label="Next"></i>
      </a>
    </li>
  </ul>
</nav>
