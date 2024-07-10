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
  const shortDateOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
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
    "en-IE_Short": "en-IE",
    "en-US_Short": "en-US",
    "de-DE_Short": "de-DE",
    "ko-KR_Short": "ko-KR",
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
    "en-IE_Short": shortDateOptions,
    "en-US_Short": shortDateOptions,
    "de-DE_Short": shortDateOptions,
    "ko-KR_Short": shortDateOptions,
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
          >{new Date().toLocaleDateString("en-IE", longDateOptions)}
        </option>
        <option value="en-US_Long"
          >{new Date().toLocaleDateString("en-US", longDateOptions)}
        </option>
        <option value="de-DE_Long"
          >{new Date().toLocaleDateString("de-DE", longDateOptions)}
        </option>
        <option value="ko-KR_Long"
          >{new Date().toLocaleDateString("ko-KR", longDateOptions)}
        </option>
        <option value="en-IE_Short"
          >{new Date().toLocaleDateString("en-IE", shortDateOptions)}
        </option>
        <option value="en-US_Short"
          >{new Date().toLocaleDateString("en-US", shortDateOptions)}
        </option>
        <option value="de-DE_Short"
          >{new Date().toLocaleDateString("de-DE", shortDateOptions)}
        </option>
        <option value="ko-KR_Short"
          >{new Date().toLocaleDateString("ko-KR", shortDateOptions)}
        </option>
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
