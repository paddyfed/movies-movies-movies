// purpose: To format a date to the ISO Date format (yyyy-mm-dd), eg 13 February 2024 will be formatted as 2024-02-13
export function toISODate(date) {
  return date.toISOString().split("T")[0];
}

// Purpose: returns a date formatted according to the user preference set in AppSettings (passed in as dateSettingSelected)
export function displayDatePreference(date, dateSettingSelected) {
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

  return date.toLocaleDateString(
    localeSetting[dateSettingSelected],
    optionsSetting[dateSettingSelected]
  );
}
