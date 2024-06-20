<script>
  export let maxPages = 5;
</script>

<nav aria-label="Movie Scroll Pagination">
  <ul class="pagination pagination-sm">
    <li class="page-item">
      <a
        class="page-link bg-dark text-light"
        aria-label="Previous"
        href="#"
        on:click|preventDefault
      >
        <i class="fa fa-fw fa-caret-left" aria-label="Previous"></i>
      </a>
    </li>
    {#if maxPages > 0}
      {#each Array(maxPages) as _, index}
        <li class="page-item">
          <a
            class="page-link bg-dark text-light"
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
        class="page-link bg-dark text-light"
        aria-label="Next"
        href="#"
        on:click|preventDefault
      >
        <i class="fa fa-fw fa-caret-right" aria-label="Next"></i>
      </a>
    </li>
  </ul>
</nav>
