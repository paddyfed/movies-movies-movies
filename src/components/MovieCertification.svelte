<script>
  import BbfcIcon from "./BbfcIcon.svelte";
  import IfcoIcon from "./IfcoIcon.svelte";

  export let releaseDates;
</script>

<!-- When data is loaded, display the film classifications from IFCo and BBFC -->
{#each releaseDates.filter((element) => {
  return element.iso_3166_1 === "GB";
}) as cert}
  <BbfcIcon certification={cert.release_dates[0].certification} />
{/each}
{#each releaseDates.filter((element) => {
  return element.iso_3166_1 === "IE";
}) as cert}
  <IfcoIcon certification={cert.release_dates[0].certification} />
{/each}
