<script>
  export let genres;
</script>

<ul class="mb-3">
  {#each genres as genre}
    <li>
      <a href="{import.meta.env.BASE_URL}/genre/{genre.name}">{genre.name}</a>
    </li>
  {/each}
</ul>

<style>
  ul {
    display: flex;
    flex-wrap: wrap;
    row-gap: 0.5em;
  }

  li:not(:last-child) {
    border-right: 1px solid var(--bs-light);
    padding-right: 1em;
  }
  li:not(:first-child) {
    margin-left: 1em;
  }
</style>
