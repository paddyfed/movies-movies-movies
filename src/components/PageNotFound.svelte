<!-- PageNotFound.svelte -->
<!-- Purpose: to dispaly a message to the user when they are directed to the 404 page -->

<h1>404: Page not found</h1>
<p>
  Sorry this page is not available. Return to the <a
    href={import.meta.env.BASE_URL}
  >
    home page
  </a>
</p>
