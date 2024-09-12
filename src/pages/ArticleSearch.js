import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { searchArticles } from '../store/actions/articleActions'; // Assuming you're using Thunks
import { useSelector } from 'react-redux'; // If you're using Redux for storing articles

const ArticleSearch = () => {
  const [keyword, setKeyword] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(0); // Current page for pagination
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFilterApplied, setIsFilterApplied] = useState(false); // Track if filter is applied
  const [articles, setArticles] = useState([]); // State to store articles
  const [hasMore, setHasMore] = useState(true); // To track if there are more articles to load

  const dispatch = useDispatch();

  // Load default articles on component mount
  useEffect(() => {
    fetchArticles(); // Load articles when component mounts
  }, [page]);

  // Function to fetch articles from the API
  const fetchArticles = async () => {
    setLoading(true);
    setError('');

    try {
      const params = {
        keyword: isFilterApplied ? keyword : 'a', // Use filters if search is applied
        from: isFilterApplied ? from : '',
        to: isFilterApplied ? to : '',
        source: isFilterApplied ? source : '',
        category: isFilterApplied ? category : '',
        limit: 10, // Number of articles per page
        page,
      };

      // Dispatch action to fetch articles
      const response = await dispatch(searchArticles(params));
      console.log("🚀 ~ fetchArticles ~ response:", response)

      if (response.length < 10) {
        setHasMore(false); // If less than 10 articles are returned, no more pages
      }

      // Append new articles to the existing ones (for pagination)
      setArticles(prevArticles => [...prevArticles, ...response.articles]);
    } catch (err) {
      setError('Failed to fetch articles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle search button click
  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setPage(0); // Reset to the first page
    setHasMore(true); // Reset the pagination state
    setIsFilterApplied(true); // Mark that filters are applied

    try {
      // Fetch filtered articles from API
      const params = {
        keyword,
        from,
        to,
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
      setError('Failed to fetch articles. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle load more button click
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1); // Increment page for the next API call
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Articles</h1>
      
      {/* Search Input Fields */}
      <div className="mb-4">
        <label>Keyword</label>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>
      <div className="mb-4">
        <label>From</label>
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>
      <div className="mb-4">
        <label>To</label>
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>
      <div className="mb-4">
        <label>Source</label>
        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>
      <div className="mb-4">
        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      <button
        onClick={handleSearch}
        className="btn btn-primary mt-4"
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="mt-4">
        {/* Displaying Articles */}
        {articles.length > 0 ? (
          <div>
            <ul>
              {articles.map((article, index) => (
                <li key={index} className="mb-4 border-b pb-4">
                  <h3 className="text-lg font-bold">{article.headline}</h3>
                  {article.image_url}
                  {article.image_url && (
                    <img
                        src={article.image_url}
                        alt={article.headline}
                        className="w-full h-48 object-cover"
                    />
                    )}
                  <p className="text-sm text-gray-600 mt-2">
                    Published on: {new Date(article.publish_date).toLocaleDateString()}
                  </p>
                  <p className="mt-2">
                    Source: <span className="font-semibold">{article.source}</span>
                  </p>
                  <a
                    href={article.url}
                    className="text-blue-600 mt-2 block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read More
                  </a>
                </li>
              ))}
            </ul>

            {/* Load More Button */}
            {hasMore && (
              <button onClick={handleLoadMore} className="btn btn-secondary mt-4">
                Load More
              </button>
            )}
          </div>
        ) : (
          <p>No articles found.</p>
        )}
      </div>
    </div>
  );
};

export default ArticleSearch;
