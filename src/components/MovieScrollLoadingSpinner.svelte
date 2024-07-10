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
    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(5, 185px);
    gap: 0.5em;
  }

  @media (max-width: 768px) {
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

  section {
    overflow-y: auto;
  }
</style>
