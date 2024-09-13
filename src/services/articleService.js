import apiService from './apiService'; // Use the configured apiService


const API_URL = `/news/search`;

const searchArticles = async ({ keyword, from, to, source, category, limit, page, mainSource }) => {
  try {
    const response = await apiService.post(
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
