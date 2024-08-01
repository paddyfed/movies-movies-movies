<!-- DisplayDate.svelte -->
<!-- purpose: Takes the users date preference from localStorage and displays the date in the correct format -->
<script>
  import { displayDatePreference } from "../js/dateHelpers";

  export let date;
  export let dateSettingSelected =
    localStorage.getItem("dateSettingSelected") ?? "en-IE_Long";
</script>

{displayDatePreference(date, dateSettingSelected)}
