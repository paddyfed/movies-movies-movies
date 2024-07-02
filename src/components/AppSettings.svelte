<script>
  let dateSettingSelected =
    localStorage.getItem("dateSettingSelected") ?? "en-IE";

  function handleDateSettingChanged() {
    localStorage.setItem("dateSettingSelected", dateSettingSelected);
  }

  function resetLocalStorage() {
    localStorage.removeItem("dateSettingSelected");
    dateSettingSelected = "en-IE";
  }
</script>

<h2 class="mb-3">Date Format</h2>
<form on:submit|preventDefault>
  <div class="mb-3">
    <label for="dateSetting" class="form-label">Choose your date setting</label>
    <select
      class="form-select"
      name="dateSetting"
      id="dateSetting"
      bind:value={dateSettingSelected}
      on:change={handleDateSettingChanged}
    >
      <option value="en-IE">Ireland</option>
      <option value="en-US">United States</option>
      <option value="de-DE">Germany</option>
      <option value="ko-KR">Korea</option>
    </select>
    <div class="form-text text-light" aria-describedby="dateSetting">
      {new Date().toLocaleDateString(dateSettingSelected, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </div>
  </div>
  <div class="mb-3">
    <button type="button" class="btn btn-secondary" on:click={resetLocalStorage}
      >Reset to Defaults</button
    >
  </div>
</form>
