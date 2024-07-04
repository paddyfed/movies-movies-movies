export function findCurrentPage(target, currentPage, maxPages) {
  switch (target) {
    case "Previous":
      currentPage -= 1;
      break;
    case "Next":
      currentPage += 1;
      break;
  }

  if (!Number.isNaN(parseInt(target))) {
    currentPage = parseInt(target);
  }

  if (currentPage < 1) {
    currentPage = 1;
  }

  if (currentPage > maxPages && maxPages !== 0) {
    currentPage = maxPages;
  }

  return currentPage;
}
