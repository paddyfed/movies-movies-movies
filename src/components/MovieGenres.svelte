<script>
  export let genres;
</script>

<ul class="mb-3">
  {#each genres as genre}
    <li>{genre.name}</li>
  {/each}
</ul>

<style>
  ul {
    display: flex;
  }

  li:not(:last-child) {
    border-right: 1px solid var(--bs-light);
    padding-right: 1em;
  }
  li:not(:first-child) {
    margin-left: 1em;
  }
</style>
