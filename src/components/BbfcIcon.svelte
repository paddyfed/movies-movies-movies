<script>
  export let certification;
  let iconClass;
  let transform;
  let color;

  switch (certification) {
    case "PG":
    case "U":
      iconClass = "fa-solid fa-play fa-rotate-270 fa-lg";
      transform = "shrink-9 down-2";
      break;
    case "18":
    case "15":
    case "12A":
    case "12":
      iconClass = "fa-solid fa-circle";
      transform = "shrink-9";
      break;
  }

  switch (certification) {
    case "PG":
      color = "#fbad00";
      break;
    case "U":
      color = "#0ac700";
      break;
    case "18":
      color = "#dc0a0a";
      break;
    case "15":
      color = "#fb4f93";
      break;
    case "12A":
    case "12":
      color = "#ff7d13";
      break;
  }
</script>

<span
  class="fa-layers fa-fw fa-4x"
  title="BBFC Classification of {certification}"
  aria-label="BBFC Classification of {certification}"
>
  <i class={iconClass} style="color: {color};"></i>
  <span
    class="fa-layers-text"
    data-fa-transform={transform}
    style="font-weight: 700; color: white;">{certification}</span
  >
</span>
