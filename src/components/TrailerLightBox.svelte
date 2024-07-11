<script>
  export let modalId = "exampleModal";
</script>

<div class="modal fade" id={modalId} tabindex="-1" aria-hidden="true">
  <div
    class="modal-dialog modal-fullscreen-xl-down modal-xl modal-dialog-centered"
  >
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <slot />
      </div>
    </div>
  </div>
</div>
