import axios from 'axios';
import {API_BASE_URL} from "../utils/constants"
const API_URL = API_BASE_URL+'/news/search';

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
