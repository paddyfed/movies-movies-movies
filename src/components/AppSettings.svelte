<!-- AppSettings.svelte component -->
<!-- Purpose: Allows users to change some settings on the site -->
<script>
  // Load settings from localStorage
  // If the item does not exist in localStorage, then set a default setting
  let dateSettingSelected =
    localStorage.getItem("dateSettingSelected") ?? "en-IE_Long";

  // When the date setting is changed, record it in localStorage
  function handleDateSettingChanged() {
    localStorage.setItem("dateSettingSelected", dateSettingSelected);
  }

  // Reset all settings back to their defaults
  function resetLocalStorage() {
    localStorage.removeItem("dateSettingSelected");
    dateSettingSelected = "en-IE_Long";
  }

  const longDateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const localeSetting = {
    "en-IE_Long": "en-IE",
    "en-IE": "en-IE",
    "en-US_Long": "en-US",
    "en-US": "en-US",
    "de-DE_Long": "de-DE",
    "de-DE": "de-DE",
    "ko-KR_Long": "ko-KR",
    "ko-KR": "ko-KR",
  };

  const optionsSetting = {
    "en-IE_Long": longDateOptions,
    "en-IE": longDateOptions,
    "en-US_Long": longDateOptions,
    "en-US": longDateOptions,
    "de-DE_Long": longDateOptions,
    "de-DE": longDateOptions,
    "ko-KR_Long": longDateOptions,
    "ko-KR": longDateOptions,
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
        <option value="en-IE_Long"
          >{new Date().toLocaleDateString("en-IE", longDateOptions)}</option
        >
        <option value="en-US_Long"
          >{new Date().toLocaleDateString("en-US", longDateOptions)}</option
        >
        <option value="de-DE_Long"
          >{new Date().toLocaleDateString("de-DE", longDateOptions)}</option
        >
        <option value="ko-KR_Long"
          >{new Date().toLocaleDateString("ko-KR", longDateOptions)}</option
        >
      </select>
      <div class="form-text" aria-describedby="dateSetting">
        {new Date().toLocaleDateString(
          localeSetting[dateSettingSelected],
          optionsSetting[dateSettingSelected]
        )}
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
