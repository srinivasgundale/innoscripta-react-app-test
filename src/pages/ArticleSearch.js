import { useState, useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";
import { searchArticles } from "../store/actions/articleActions";

import ArticleCard from "../components/common/ArticleCard";
import { sources, newsCategories } from "./../utils/mockdata";

const ArticleSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [mainSource, setMainSource] = useState("All");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFilterApplied, setIsFilterApplied] = useState(false); // Track if filter is applied
  const [articles, setArticles] = useState([]); // State to store articles
  const [hasMore, setHasMore] = useState(true); // To track if there are more articles to load

  const dispatch = useDispatch();

  const listOfCategories = [
    { key: "nytimes", name: "NY Times" },
    { key: "guardian", name: "Guardian" },
    { key: "newsapi", name: "NewsAPI" },
  ];
  // Load default articles on component mount
  useEffect(() => {
    fetchArticles(); // Load articles when component mounts
  }, [page]);

  // Function to fetch articles from the API
  const fetchArticles = async () => {
    setLoading(true);
    setError("");

    try {
      const params = {
        keyword: isFilterApplied ? keyword : "a", // Use filters if search is applied
        from: isFilterApplied ? from : "",
        to: isFilterApplied ? to : "",
        mainSource: isFilterApplied ? mainSource : "All",
        source: isFilterApplied ? source : "",
        category: isFilterApplied ? category : "",
        limit: 10, // Number of articles per page
        page,
      };

      // Dispatch action to fetch articles
      const response = await dispatch(searchArticles(params));
      console.log("🚀 ~ fetchArticles ~ response:", response);

      if (response.articles.length < 10) {
        setHasMore(false); // If less than 10 articles are returned, no more pages
      }

      // Append new articles to the existing ones (for pagination)
      setArticles((prevArticles) => [...prevArticles, ...response.articles]);
    } catch (err) {
      setError("Failed to fetch articles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle search button click
  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setPage(0); // Reset to the first page
    setHasMore(true); // Reset the pagination state
    setIsFilterApplied(true); // Mark that filters are applied

    try {
      // Fetch filtered articles from API
      const params = {
        keyword,
        from,
        to,
        mainSource,
        source,
        category,
        limit: 10,
        page: 0, // Start from the first page for the new search
      };

      const response = await dispatch(searchArticles(params));

      // Replace old articles with new filtered ones
      setArticles(response.articles);

      if (response.articles.length < 10) {
        setHasMore(false); // If less than 10 articles are returned, no more pages
      }
    } catch (err) {
      setError("Failed to fetch articles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle load more button click
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment page for the next API call
  };

  return (
    <main role="main" className="container mx-auto">
      <div className="body">
        <div className="flex flex-col md:flex-row p-4">
          {/* Left Side Filters */}
          <div className="w-full bg-base md:w-1/4 mb-4 md:mb-0 p-4 rounded-lg  h-full glass">
            <h2 className="text-xl font-semibold mb-4">Filter Articles</h2>
            <div className="mb-4">
              <label className="block mb-1">Keyword</label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">From</label>
              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">To</label>
              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Source</label>
              <select
                className="select select-bordered w-full"
                onChange={(e) => setMainSource(e.target.value)}
              >
                <option key="all-categories">All</option>
                {listOfCategories.map((cat, index) => (
                  <option key={index} value={cat.key}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {/* <input
                        type="text"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        className="input input-bordered w-full"
                    /> */}
            </div>
            {mainSource === "newsapi" && (
              <div className="mb-4">
                <label className="block mb-1">Sub Source</label>
                <select
                  className="select select-bordered w-full"
                  onChange={(e) => setSource(e.target.value)}
                >
                  <option key="all-categories" selected>
                    All
                  </option>
                  {sources.map((cat, index) => (
                    <option key={index} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {mainSource !== "nytimes" && (
              // <div className="mb-4">
              // <label className="block mb-1">Category</label>
              // <input
              //     type="text"
              //     value={category}
              //     onChange={(e) => setCategory(e.target.value)}
              //     className="input input-bordered w-full"
              // />
              // </div>

              <div className="mb-4">
                <label className="block mb-1">Category</label>
                <select
                  className="select select-bordered w-full"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All</option>
                  {newsCategories.map((category) => (
                    <option key={category.key} value={category.key}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button
              onClick={handleSearch}
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {/* Right Side Articles Cards */}
          <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Displaying Articles */}
            {/* <div className="card glass w-90"> */}

            {articles.length > 0 ? (
              articles.map((item, index) => (
                <Fragment key={index}>
                  <ArticleCard article={item} />
                </Fragment>
              ))
            ) : (
              <p className="col-span-3 text-center">No articles found.</p>
            )}
            {/* </div> */}
          </div>
        </div>
        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-8">
            <button onClick={handleLoadMore} className="btn btn-secondary">
              Load More
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ArticleSearch;
