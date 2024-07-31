<!-- AppSettings.svelte component -->
<!-- Purpose: Allows users to change some settings on the site -->
<script>
  import { onMount } from "svelte";
  import DisplayDate from "./DisplayDate.svelte";

  // Load settings from localStorage
  // If the item does not exist in localStorage, then set a default setting
  let dateSettingSelected =
    localStorage.getItem("dateSettingSelected") ?? "en-IE_Long";

  // When the date setting is changed, record it in localStorage
  function handleDateSettingChanged() {
    localStorage.setItem("dateSettingSelected", dateSettingSelected);
    displayToaster("Date Format changed");
  }

  // Reset all settings back to their defaults
  function resetLocalStorage() {
    localStorage.removeItem("dateSettingSelected");
    dateSettingSelected = "en-IE_Long";
    displayToaster("All settings reset to default");
  }

  function displayToaster(message) {
    const main = document.querySelector("main");
    const toast = document.createElement("div");
    const toastBody = document.createElement("div");

    if (!document.querySelector("#toastContainer")) {
      const toastContainer = document.createElement("div");
      toastContainer.classList.add(
        "toast-container",
        "position-fixed",
        "top-0",
        "start-50",
        "translate-middle-x",
        "p-3"
      );
      toastContainer.id = "toastContainer";
      main.appendChild(toastContainer);
    }

    toast.classList.add(
      "toast",
      "text-secondary-emphasis",
      "bg-secondary-subtle"
    );
    toast.role = "alert";
    toast.id = `liveToast`;
    toast.ariaAtomic = "true";
    toast.ariaLive = "assertive";

    toastBody.classList.add("toast-body");
    toastBody.innerText = message;
    toast.appendChild(toastBody);
    toastContainer.appendChild(toast);

    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast);
    toastBootstrap.show();

    // toast.addEventListener("hidden.bs.toast", () => {
    //   toast.remove();
    // });
  }
</script>

<h2 class="mb-3">Date Format</h2>
<form on:submit|preventDefault>
  <div class="row mb-3">
    <label for="dateSetting" class="col-md-3 col-form-label">
      Choose your date setting
    </label>
    <div class="col-md-7">
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

<!-- <div
  class="toast-container position-fixed top-0 start-50 translate-middle-x p-3"
>
  <div
    id="liveToast"
    class="toast text-secondary-emphasis bg-secondary-subtle"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="toast-header bg-secondary-subtle text-secondary-emphasis">
      <strong class="me-auto">Bootstrap</strong>
      <small>11 mins ago</small>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
    <div class="toast-body">Hello, world! This is a toast message.</div>
  </div>
</div> -->
