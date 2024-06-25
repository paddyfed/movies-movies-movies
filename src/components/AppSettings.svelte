<script>
  let selected = localStorage.getItem("sel")
    ? localStorage.getItem("sel")
    : "1";

  function handleSubmit() {
    localStorage.setItem("sel", selected);
    console.log(selected);
  }

  function resetLocalStorage() {
    localStorage.clear();
    selected = "1";
  }
</script>

<h2>Date Format</h2>
<form on:submit|preventDefault={handleSubmit}>
  <select name="dateSetting" id="dateSetting" bind:value={selected}>
    <option value="1">a1</option>
    <option value="2">a2</option>
    <option value="3">a3</option>
  </select>
  <button type="submit"> Submit </button>
</form>
<button on:click={resetLocalStorage}>Reset to Defaults</button>
<h2>{selected}</h2>
