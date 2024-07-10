<!-- AppSettings.svelte component -->
<!-- Purpose: Allows users to change some settings on the site -->
<script>
  import DisplayDate from "./DisplayDate.svelte";

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
        <option value="en-IE_Long">
          <DisplayDate date={new Date()} dateSettingSelected="en-IE_Long" />
        </option>
        <option value="en-US_Long">
          <DisplayDate date={new Date()} dateSettingSelected="en-US_Long" />
        </option>
        <option value="de-DE_Long">
          <DisplayDate date={new Date()} dateSettingSelected="de-DE_Long" />
        </option>
        <option value="ko-KR_Long">
          <DisplayDate date={new Date()} dateSettingSelected="ko-KR_Long" />
        </option>
        <option value="en-IE_Short">
          <DisplayDate date={new Date()} dateSettingSelected="en-IE_Short" />
        </option>
        <option value="en-US_Short">
          <DisplayDate date={new Date()} dateSettingSelected="en-US_Short" />
        </option>
        <option value="de-DE_Short">
          <DisplayDate date={new Date()} dateSettingSelected="de-DE_Short" />
        </option>
        <option value="ko-KR_Short">
          <DisplayDate date={new Date()} dateSettingSelected="ko-KR_Short" />
        </option>
      </select>
      <div class="form-text" aria-describedby="dateSetting">
        <DisplayDate date={new Date()} {dateSettingSelected} />
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
