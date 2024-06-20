<section>
  <ul>
    {#each Array(20) as movie}
      <li>Loading...</li>
    {/each}
  </ul>
</section>
<p>Loading...</p>
<button>Loading...</button>
<button>Loading...</button>

<style>
  ul {
    display: flex;
    gap: 0.5em;
  }

  li {
    min-width: 185px;
    height: 282px;
    background-color: gray;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    transition: 0.3s ease-in-out;
    cursor: pointer;
  }

  img:hover {
    opacity: 0.5;
  }

  section {
    overflow-y: auto;
    scrollbar-color: white #13151a;
  }
</style>
