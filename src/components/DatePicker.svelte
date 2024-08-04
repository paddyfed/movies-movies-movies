<!-- DatePicker.svelte -->
<!-- Purpose: to render a native date picker if showPicker() is not available or render a date picker button if showPicker() is allowed -->
<script>
  import { toISODate } from "../js/dateHelpers";
  import DisplayDate from "./DisplayDate.svelte";

  // This checks whether the showPicker() function is available in the current browser
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/showPicker#feature_detection
  const showPickerAllowed = "showPicker" in HTMLInputElement.prototype;
  export let id;
  export let date;
  export let min;
  export let max = new Date("2100-01-01");
</script>

<div class="col-md-auto">
  <label for={id} class="col-form-label"><slot /></label>
</div>
<div class="col-md-auto">
  <button
    class:hidden={!showPickerAllowed}
    type="button"
    class="btn btn-primary"
    on:click|preventDefault
    id={id + "Button"}
  >
    <DisplayDate {date} />
    <i class="fa-regular fa-calendar ms-1"></i>
  </button>
  <input
    class:form-control={!showPickerAllowed}
    class:hidden={showPickerAllowed}
    type="date"
    {id}
    value={toISODate(date)}
    min={toISODate(min)}
    max={toISODate(max)}
    on:change|preventDefault
  />
</div>

<style>
  div {
    position: relative;
  }

  input[type="date"] {
    position: relative;
  }

  input[type="date"].hidden {
    position: absolute;
    bottom: 0;
    left: 0;
    visibility: hidden;
  }

  button {
    position: relative;
  }

  button.hidden {
    display: none;
  }
</style>
