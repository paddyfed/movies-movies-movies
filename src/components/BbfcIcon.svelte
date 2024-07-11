<!-- BbfcIcon.svelte Component -->
<!-- Purpose: Displays the certification of the movie from BBFC (British Board of Film Classification) if available -->
<script>
  import bbfcIcon from "../images/BBFC_Logo_Stacked.png";
  export let certification;
  let iconClass;
  let transform;
  let color;

  // Pick the shape of the classification using FontAwesome icons
  // U and PG have a triangular shape
  // 18, 15, 12, and 12A have a circular shape
  switch (certification.trim()) {
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

  // Pick the color of the classification
  // Each classification has a different color (see https://www.bbfc.co.uk/)
  switch (certification.trim()) {
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

<!-- Use FontAwesome layering to combine the classification icon with the classification text https://docs.fontawesome.com/web/style/layer -->

{#if certification !== ""}
  <div>
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
    <img
      src={bbfcIcon.src}
      width="80"
      alt="BBFC British Board of Film Classification"
      title="BBFC British Board of Film Classification"
      style="mb-2"
    />
  </div>
{/if}

<style>
  div {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    background-color: hsl(from var(--bs-light) h s l / 0.7);
    padding: 0.2em;
    border-radius: 4px;
  }
</style>
