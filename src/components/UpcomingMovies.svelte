<!-- UpcomingMovies.svelte -->
<!-- Purpose: to fetch and display upcoming movies to users -->

<script>
  import { apiOptions } from "../js/apiHelpers";
  import { findCurrentPage } from "../js/pagination";
  import { toISODate } from "../js/dateHelpers";
  import MovieList from "./MovieList.svelte";
  import MovieScrollPagination from "./MovieScrollPagination.svelte";
  import MovieScrollLoadingSpinner from "./MovieScrollLoadingSpinner.svelte";
  import DatePicker from "./DatePicker.svelte";

  const url = new URL(window.location.href);

  export let maxPages = 5;
  let currentPage = 1;

  const today = new Date();
  let dateFrom = today;
  let dateTo = new Date(Date.now() + 2592000000);

  // Create an initial state and pass it to the browser history so this can be loaded when the back button is clicked
  // https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API#using_replacestate
  const initialState = {
    currentPage: 1,
    dateFrom: dateFrom,
    dateTo: dateTo,
  };
  history.replaceState(initialState, "", document.location.href);

  // Get the page number from searchParams if it exists
  if (
    url.searchParams.has("page") &&
    parseInt(url.searchParams.get("page")) <= maxPages
  ) {
    currentPage = parseInt(url.searchParams.get("page"));
  }

  // Get the dateFrom and dateTo from searchParams if they exist
  if (url.searchParams.has("dateFrom") && url.searchParams.has("dateTo")) {
    const dateFromParam = new Date(
      Date.parse(url.searchParams.get("dateFrom"))
    );
    const dateToParam = new Date(Date.parse(url.searchParams.get("dateTo")));

    if (
      dateFromParam >= today &&
      dateToParam >= today &&
      dateFromParam <= dateToParam
    ) {
      dateFrom = dateFromParam;
      dateTo = dateToParam;
    }
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
    history.pushState(
      {
        currentPage: currentPage,
        dateFrom: dateFrom,
        dateTo: dateTo,
      },
      "",
      `?page=${currentPage}&dateFrom=${toISODate(dateFrom)}&dateTo=${toISODate(dateTo)}`
    );

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
    switch (event.currentTarget.id) {
      case "dateTo":
        dateTo = new Date(event.currentTarget.value);
        fullFetchUrl.searchParams.set(
          "primary_release_date.lte",
          toISODate(dateTo)
        );
        break;
      case "dateFrom":
        dateFrom = new Date(event.currentTarget.value);
        fullFetchUrl.searchParams.set(
          "primary_release_date.gte",
          toISODate(dateFrom)
        );
        break;
      default:
        break;
    }

    // Push a new history item to the browser history with the currentPage as the URL
    // https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API#using_pushstate
    history.pushState(
      {
        currentPage: currentPage,
        dateFrom: dateFrom,
        dateTo: dateTo,
      },
      "",
      `?page=${currentPage}&dateFrom=${toISODate(dateFrom)}&dateTo=${toISODate(dateTo)}`
    );

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
    console.log(event);
    if (event.state) {
      currentPage = event.state.currentPage;
      dateFrom = event.state.dateFrom;
      dateTo = event.state.dateTo;
      fullFetchUrl.searchParams.set("page", event.state.currentPage);
      fullFetchUrl.searchParams.set(
        "primary_release_date.lte",
        toISODate(event.state.dateTo)
      );
      fullFetchUrl.searchParams.set(
        "primary_release_date.gte",
        toISODate(event.state.dateFrom)
      );

      promise = fetch(fullFetchUrl, apiOptions).then((r) => {
        if (!r.ok) {
          console.error(r);
          throw new Error(r.status);
        }
        return r.json();
      });
    }
  });

  // This checks whether the showPicker() function is available in the current browser
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/showPicker#feature_detection
  const showPickerAllowed = "showPicker" in HTMLInputElement.prototype;

  // check which date button was selected and open the relevant date picker
  function dateClicked(event) {
    let dateInput;

    switch (event.currentTarget.id) {
      case "dateToButton":
        dateInput = document.querySelector("#dateTo");
        break;
      case "dateFromButton":
        dateInput = document.querySelector("#dateFrom");
        break;
      default:
        break;
    }
    try {
      dateInput.showPicker();
    } catch (error) {
      console.error(error);
    }
  }
</script>

<form>
  <div class="row mb-3">
    <DatePicker
      id="dateFrom"
      on:change={datePickerChanged}
      on:click={dateClicked}
      date={dateFrom}
      min={today}
      max={dateTo}
    >
      From
    </DatePicker>
    <DatePicker
      id="dateTo"
      on:change={datePickerChanged}
      on:click={dateClicked}
      date={dateTo}
      min={dateFrom}
    >
      To
    </DatePicker>
  </div>
</form>

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
