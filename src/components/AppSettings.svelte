<script>
  let dateSettingSelected =
    localStorage.getItem("dateSettingSelected") ?? "en-IE";

  function handleDateSettingChanged() {
    localStorage.setItem("dateSettingSelected", dateSettingSelected);
  }

  function resetLocalStorage() {
    localStorage.clear();
    dateSettingSelected = "en-IE";
  }
</script>

<h2>Date Format</h2>
<select
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
<button on:click={resetLocalStorage}>Reset to Defaults</button>
<h2>
  {new Date().toLocaleDateString(dateSettingSelected, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })}
</h2>
