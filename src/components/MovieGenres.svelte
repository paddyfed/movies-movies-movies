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
    gap: 0.5em;
  }

  li:not(:last-child)::after {
    content: "|";
    margin-left: 0.5em;
  }
</style>
