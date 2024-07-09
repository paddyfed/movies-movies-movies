<!-- AppSettings.svelte component -->
<!-- Purpose: Allows users to change some settings on the site -->
<script>
  // Load settings from localStorage
  // If the item does not exist in localStorage, then set a default settins
  let dateSettingSelected =
    localStorage.getItem("dateSettingSelected") ?? "en-IE";

  // When the date setting is changed, record it in localStorage
  function handleDateSettingChanged() {
    localStorage.setItem("dateSettingSelected", dateSettingSelected);
  }

  // Reset all settings back to their defaults
  function resetLocalStorage() {
    localStorage.removeItem("dateSettingSelected");
    dateSettingSelected = "en-IE";
  }

  const longDateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
</script>

<h2 class="mb-3">Date Format</h2>
<form on:submit|preventDefault>
  <div class="row mb-3">
    <label for="dateSetting" class="col-sm-2 col-form-label">
      Choose your date setting
    </label>
    <div class="col-sm-8">
      <select
        class="form-select"
        name="dateSetting"
        id="dateSetting"
        bind:value={dateSettingSelected}
        on:change={handleDateSettingChanged}
      >
        <option value="en-IE"
          >{new Date().toLocaleDateString("en-IE", longDateOptions)}</option
        >
        <option value="en-US"
          >{new Date().toLocaleDateString("en-US", longDateOptions)}</option
        >
        <option value="de-DE"
          >{new Date().toLocaleDateString("de-DE", longDateOptions)}</option
        >
        <option value="ko-KR"
          >{new Date().toLocaleDateString("ko-KR", longDateOptions)}</option
        >
      </select>
      <div class="form-text" aria-describedby="dateSetting">
        {new Date().toLocaleDateString(dateSettingSelected, longDateOptions)}
      </div>
    </div>
  </div>
  <div class="mb-3">
    <button
      type="button"
      class="btn btn-secondary"
      on:click={resetLocalStorage}
    >
      Reset to Defaults
    </button>
  </div>
</form>
