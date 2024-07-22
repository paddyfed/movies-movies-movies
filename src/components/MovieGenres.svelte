<script>
  export let genres;
  export let includeLinks = false;
</script>

<ul class="mb-3">
  {#if Array.isArray(genres) && genres.length !== 0}
    {#each genres as genre}
      <li>
        {#if includeLinks}<a
            href="{import.meta.env.BASE_URL}/genre/{encodeURIComponent(
              genre.name.toLowerCase()
            )}"
          >
            {genre.name}
          </a>
        {:else}
          {genre.name}
        {/if}
      </li>
    {/each}
  {/if}
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
