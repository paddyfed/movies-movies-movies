<!-- MovieScrollPagination.svelte -->
<!-- Purpose: creates and displays the pagination buttons for movie lists and search results -->
<!-- click events are handled in the calling component. -->
<!-- I currently restrict the number of pages in pagination to 5 as the search results get less useful after 100 results returned but the calling component can override this -->
<script>
  export let maxPages = 5;
  export let currentPage;
</script>

<!-- Uses BootStrap pagination with FontAwesome icons for the arrows -->
<!-- https://getbootstrap.com/docs/5.3/components/pagination/ -->
<nav aria-label="Pagination" class="mb-3">
  <ul class="pagination">
    <li class="page-item">
      <!-- Previous button is disabled when it is the first page -->
      <button
        class="page-link"
        aria-label="Previous"
        data-target="Previous"
        on:click|preventDefault
        disabled={currentPage === 1}
      >
        <i class="fa fa-fw fa-caret-left"></i>
      </button>
    </li>
    {#if maxPages > 0}
      {#each Array(maxPages) as _, index}
        <!-- Active class is added to the pagination buttons when the current page matches the index + 1 of the button. The button is also disabled. -->
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
      <!-- Next button is disabled when the current page is equal to the max number of pages -->
      <button
        class="page-link"
        aria-label="Next"
        data-target="Next"
        on:click|preventDefault
        disabled={currentPage === maxPages}
      >
        <i class="fa fa-fw fa-caret-right"></i>
      </button>
    </li>
  </ul>
</nav>
