<!-- DisplayDate.svelte -->
<!-- purpose: Takes the users date preference from localStorage and displays the date in the correct format -->
<script>
  export let date;
  export let dateSettingSelected =
    localStorage.getItem("dateSettingSelected") ?? "en-IE_Long";

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

  // localeSetting and optionSetting correspond to the options from the AppSettings component
  // "en-IE", "en-US", "de-DE", and "ko-KR" options are included on the rare chance that someone has older settings saved in localStorage
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

{date.toLocaleDateString(
  localeSetting[dateSettingSelected],
  optionsSetting[dateSettingSelected]
)}
