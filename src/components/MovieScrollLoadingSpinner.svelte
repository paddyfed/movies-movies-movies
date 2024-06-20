<section>
  <ul>
    {#each Array(20) as _}
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
    min-width: 185px;
    height: 278px;
    background-color: gray;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  section {
    overflow-y: auto;
    scrollbar-color: white #13151a;
  }
</style>
