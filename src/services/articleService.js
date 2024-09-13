import axios from 'axios';

const API_URL = 'http://localhost:8000/api/news/search';

const searchArticles = async ({ keyword, from, to, source, category, limit, page, token, mainSource }) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        keyword,
        from,
        to,
        source,
        category,
        mainSource,
        limit,
        page,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

export default {
  searchArticles,
};
