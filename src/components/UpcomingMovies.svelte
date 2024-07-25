<!-- UpcomingMovies.svelte -->
<!-- Purpose: to fetch and display upcoming movies to users -->

<script>
  import MovieList from "./MovieList.svelte";
  import { apiOptions } from "../js/apiHelpers";
  import MovieScrollPagination from "./MovieScrollPagination.svelte";
  import { findCurrentPage } from "../js/pagination";
  import MovieScrollLoadingSpinner from "./MovieScrollLoadingSpinner.svelte";
  import { toISODate } from "../js/dateHelpers";

  const url = new URL(window.location.href);

  export let maxPages = 5;
  let currentPage = 1;

  const today = new Date();
  let dateFrom = today;
  let dateTo = new Date(Date.now() + 2592000000);

  // Create an initial state and pass it to the browser history so this can be loaded when the back button is clicked
  // https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API#using_replacestate
  const initialState = { currentPage: 1 };
  history.replaceState(initialState, "", document.location.href);

  // Get the page number from searchParams if it exists
  if (
    url.searchParams.has("page") &&
    parseInt(url.searchParams.get("page")) <= maxPages
  ) {
    currentPage = parseInt(url.searchParams.get("page"));
  }

  // build up the URL and fetch data from the API
  // https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.gte=2024-07-24&primary_release_date.lte=2024-08-24&sort_by=popularity.desc&with_release_type=2|3
  const fetchUrl = "/3/discover/movie";

  let fullFetchUrl = new URL(fetchUrl, import.meta.env.PUBLIC_API_URL);

  const paramsObj = {
    include_adult: "false",
    include_video: "false",
    language: "en-US",
    page: currentPage,
    "primary_release_date.gte": toISODate(dateFrom),
    "primary_release_date.lte": toISODate(dateTo),
    sort_by: "popularity.desc",
    with_release_type: "2",
    with_original_language: "en",
  };

  for (const key in paramsObj) {
    fullFetchUrl.searchParams.append(key, paramsObj[key]);
  }

  let promise = fetch(fullFetchUrl, apiOptions).then((r) => {
    if (!r.ok) {
      throw new Error(r.status);
    }
    return r.json();
  });

  // When a pagination button is clicked, move the current page and re-run the fetch of data
  function paginationClicked(event) {
    currentPage = findCurrentPage(
      event.currentTarget.dataset.target,
      currentPage,
      maxPages
    );

    fullFetchUrl.searchParams.set("page", currentPage);

    // Push a new history item to the browser history with the currentPage as the URL
    // https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API#using_pushstate
    history.pushState({ currentPage }, "", `?page=${currentPage}`);

    promise = fetch(fullFetchUrl, apiOptions).then((r) => {
      if (!r.ok) {
        throw new Error(r.status);
      }
      return r.json();
    });

    // Scroll the browser window to bring the heading into view so the user does not have to manually scroll back up
    const element = document.querySelector("#upcoming-movies-header");
    element.scrollIntoView({ behavior: "smooth" });
  }

  // If the Date Picker is changed, get the value of the date picker and re-run the fetch with the new info
  function datePickerChanged(event) {
    console.log(event.currentTarget.value);
    console.log(event.currentTarget);
    console.log(event.currentTarget.id);

    switch (event.currentTarget.id) {
      case "dateTo":
        console.log("Date To");
        dateTo = new Date(event.currentTarget.value);
        fullFetchUrl.searchParams.set("primary_release_date.lte", dateTo);
        break;
      case "dateFrom":
        console.log("Date From");
        dateFrom = new Date(event.currentTarget.value);
        fullFetchUrl.searchParams.set("primary_release_date.gte", dateFrom);
        break;
      default:
        console.log("None");
        break;
    }

    promise = fetch(fullFetchUrl, apiOptions).then((r) => {
      if (!r.ok) {
        throw new Error(r.status);
      }
      return r.json();
    });
  }

  // If back is selected, then get the history item that was pushed down and re-run the fetch using those options
  // https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API#using_the_popstate_event
  window.addEventListener("popstate", (event) => {
    if (event.state) {
      currentPage = event.state.currentPage;
      fullFetchUrl.searchParams.set("page", event.state.currentPage);
      promise = fetch(fullFetchUrl, apiOptions).then((r) => {
        if (!r.ok) {
          console.error(r);
          throw new Error(r.status);
        }
        return r.json();
      });
    }
  });
</script>

<label for="dateFrom">From</label>
<input
  type="date"
  id="dateFrom"
  value={toISODate(dateFrom)}
  min={toISODate(today)}
  max={toISODate(dateTo)}
  on:change={datePickerChanged}
/>
<label for="dateTo">To</label>
<input
  type="date"
  id="dateTo"
  value={toISODate(dateTo)}
  min={toISODate(dateFrom)}
  on:change={datePickerChanged}
/>
<p>{today}</p>
<p>{dateFrom}</p>
<p>{dateTo}</p>
{#await promise}
  <MovieScrollLoadingSpinner --height="278px" --min-width="185px" />
{:then data}
  <MovieList movies={data.results} />
  <MovieScrollPagination
    on:click={paginationClicked}
    maxPages={data.total_pages < maxPages ? data.total_pages : maxPages}
    {currentPage}
  />
{:catch error}
  {error}
{/await}
