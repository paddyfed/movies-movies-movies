<script>
  export let modalId = "exampleModal";
  export let modalTitle = "Modal Title";
</script>

<div class="modal fade" id={modalId} tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-fullscreen modal-xl modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-body">
        <slot />
      </div>
    </div>
  </div>
</div>
