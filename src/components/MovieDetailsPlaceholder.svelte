<script>
  import MovieScrollLoadingSpinner from "./MovieScrollLoadingSpinner.svelte";
</script>

<section
  style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)); background-repeat: no-repeat; background-size: cover;"
  class="rounded p-3"
>
  <h1 class="placeholder-glow mb-3">
    <span class="placeholder col-12"></span>
  </h1>
  <div class="placeholder-glow poster">
    <p class="poster-placeholder">
      <i class="fas fa-fw fa-spinner fa-spin"></i>
    </p>
  </div>
  <div class="placeholder-glow details">
    <p class="placeholder col-12"></p>
    <p class="placeholder col-12"></p>
    <p class="placeholder col-12"></p>
    <div class="row">
      <p class="placeholder col-3"></p>
    </div>
    <div class="row">
      <p class="placeholder col-3"></p>
    </div>
    <div class="row">
      <p class="placeholder col-3"></p>
    </div>
    <div class="row">
      <p class="placeholder col-3" style="height: 64px;"></p>
    </div>
    <div class="row">
      <p class="placeholder col-4" style="height: 66px;"></p>
    </div>
  </div>
  <div class="footer">
    <h2 class="placeholder-glow mb-3">
      <span class="placeholder col-12">Loading</span>
    </h2>
    <MovieScrollLoadingSpinner
      numItems={5}
      --min-width="480px"
      --height="270px"
    />
  </div>
</section>

<style>
  section {
    display: grid;
    gap: 0.5em;
    grid-template-columns: 1fr 50% 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      "header header header"
      "poster details ."
      "footer footer footer";
  }

  h1 {
    grid-area: header;
  }

  div {
    grid-area: footer;
  }

  .poster {
    grid-area: poster;
  }

  .details {
    grid-area: details;
  }

  .poster-placeholder {
    width: 342px;
    max-width: 100%;
    height: 513px;
    background-color: gray;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media screen and (max-width: 768px) {
    section {
      display: block;
    }
  }
</style>
