<!-- MovieScrollLoadingSpinner.svelte -->
<!-- Purpose: Displays placeholder images for items loaded from a list. Used for MovieList and MovieTrailers placeholders -->
<script>
  export let numItems = 20;
</script>

<div class="mb-3">
  <ul>
    {#each Array(numItems) as _}
      <li><i class="fas fa-fw fa-spinner fa-spin"></i></li>
    {/each}
  </ul>
</div>

<style>
  ul {
    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(5, var(--min-width, 185px));
    gap: 0.5em;
  }

  @media (max-width: 992px) {
    ul {
      display: flex;
      gap: 0.5em;
      overflow-y: auto;
      flex-wrap: nowrap;
    }
  }

  li {
    min-width: var(--min-width, 185px);
    height: var(--height, 278px);
    background-color: gray;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  div {
    overflow-y: auto;
  }
</style>
