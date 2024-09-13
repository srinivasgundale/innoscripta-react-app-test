import { useState, useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";
import { searchArticles } from "../store/actions/articleActions";
import ArticleCard from "../components/common/ArticleCard";
import Shimmer from "../components/common/Shimmer"; 
import { sources, newsCategories } from "./../utils/mockdata";
import { FormInput } from "../components/common/FormInput";
import { buildApiParams } from "../utils/apiUtils"; 

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
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [articles, setArticles] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false); 
  const listOfCategories = [
    { key: "nytimes", name: "NY Times" },
    { key: "guardian", name: "Guardian" },
    { key: "newsapi", name: "NewsAPI" },
  ];
  const dispatch = useDispatch();

  
  useEffect(() => {
    fetchArticles();
  }, [page]);

  const fetchArticles = async () => {
    setLoading(true);
    setError("");

    const params = buildApiParams(keyword, from, to, mainSource, source, category, page, isFilterApplied);
    try {
      const response = await dispatch(searchArticles(params));

      if (response.articles.length < 10) {
        setHasMore(false);
      }

      setArticles((prevArticles) => [...prevArticles, ...response.articles]);
    } catch (err) {
      setError("Failed to fetch articles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  
  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setPage(0); 
    setHasMore(true); 
    setIsFilterApplied(true); 

    const params = buildApiParams(keyword, from, to, mainSource, source, category, 0, true);
    try {
      const response = await dispatch(searchArticles(params));

      setArticles(response.articles);

      if (response.articles.length < 10) {
        setHasMore(false);
      }
    } catch (err) {
      setError("Failed to fetch articles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    setLoadMoreLoading(true); 
    try {
      setPage((prevPage) => prevPage + 1);
    } finally {
      setLoadMoreLoading(false); 
    }
  };

  return (
    <main role="main" className="container mx-auto">
      <div className="body">
        <div className="flex flex-col md:flex-row p-4">
          {/* Left Side Filters */}
          <div className="w-full bg-base md:w-1/4 mb-4 md:mb-0 p-4 rounded-lg h-full glass">
            <h2 className="text-xl font-semibold mb-4">Filter Articles</h2>
            <FormInput label="Keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
            <FormInput label="From" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
            <FormInput label="To" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
            <FormInput
              label="Source"
              value={mainSource}
              onChange={(e) => setMainSource(e.target.value)}
              type="select"
              options={[{ value: "All", label: "All" }, ...listOfCategories.map((s) => ({ value: s.key, label: s.name }))]}
            />
            {(mainSource === "newsapi" && mainSource !== "All") && (
              <FormInput
                label="Sub Source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                type="select"
                options={[{ value: "", label: "All" }, ...sources.map((s) => ({ value: s.id, label: s.name }))]}
              />
            )}
            {(mainSource !== "nytimes" && mainSource !== "All") && (
              <FormInput
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                type="select"
                options={[{ value: "", label: "All" }, ...newsCategories.map((c) => ({ value: c.key, label: c.name }))]}
              />
            )}
            <button onClick={handleSearch} className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {/* Right Side Articles */}
          <div className="w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {loading && (
              <>
                <Shimmer />
                <Shimmer />
                <Shimmer />
              </>
            )}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {!loading && articles.length > 0 ? (
              articles.map((item, index) => (
                <Fragment key={index}>
                  <ArticleCard article={item} />
                </Fragment>
              ))
            ) : (
              !loading && <p className="col-span-3 text-center">No articles found.</p>
            )}
          </div>
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-8">
            <button onClick={handleLoadMore} className="btn btn-secondary" >
              {loadMoreLoading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
        
      </div>
    </main>
  );
};

export default ArticleSearch;
