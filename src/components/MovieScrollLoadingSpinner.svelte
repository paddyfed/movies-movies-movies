<script>
  export let numItems = 20;
</script>

<section class="mb-3">
  <ul>
    {#each Array(numItems) as _}
      <li><i class="fas fa-fw fa-spinner fa-spin"></i></li>
    {/each}
  </ul>
</section>

<style>
  ul {
    display: flex;
    gap: 0.5em;
  }

  li {
    min-width: var(--min-width, 185px);
    height: var(--height, 278px);
    background-color: gray;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  section {
    overflow-y: auto;
  }
</style>
