<script>
  export let certification;
  let iconClass;
  let transform;
  let color;

  switch (certification.trim()) {
    case "PG":
    case "G":
    case "18":
    case "16":
    case "15":
    case "15A":
    case "12A":
    case "12":
      iconClass = "fa-solid fa-circle";
      transform = "shrink-9";
      break;
  }

  switch (certification.trim()) {
    case "PG":
      color = "#00ff00";
      break;
    case "G":
      color = "#0080ff";
      break;
    case "18":
      color = "#ff0000";
      break;
    case "16":
      color = "#8000ff";
      break;
    case "15":
    case "15A":
      color = "#ff00ff";
      break;
    case "12A":
    case "12":
      color = "#ff8000";
      break;
  }
</script>

<span
  class="fa-layers fa-fw fa-4x"
  title="IFCO Classification of {certification}"
  aria-label="IFCO Classification of {certification}"
>
  <i class={iconClass} style="color: {color};"></i>
  <span
    class="fa-layers-text"
    data-fa-transform={transform}
    style="font-weight: 700; color: white;">{certification}</span
  >
</span>
