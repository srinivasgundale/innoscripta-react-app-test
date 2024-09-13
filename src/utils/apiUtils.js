export const buildApiParams = (keyword, from, to, mainSource, source, category, page, isFilterApplied) => {
  return {
    keyword: isFilterApplied ? keyword : "a",
    from: isFilterApplied ? from : "",
    to: isFilterApplied ? to : "",
    mainSource: isFilterApplied ? mainSource : "All",
    source: isFilterApplied ? source : "",
    category: isFilterApplied ? category : "",
    limit: 10,
    page,
  };
};
