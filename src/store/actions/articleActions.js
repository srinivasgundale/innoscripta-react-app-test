import articleService from './../../services/articleService';

export const searchArticles = (params) => async (dispatch, getState) => {
  const token = getState().auth.token; // Access token from Redux state

  try {
    const response = await articleService.searchArticles({
      ...params,
      token, 
    });
    console.log("🚀 ~ searchArticles ~ response:", response)
    
    dispatch({
      type: 'ARTICLES_FETCH_SUCCESS',
      payload: response.articles, 
    });
    return response;
  } catch (error) {
    console.error('Error fetching articles', error);
    dispatch({
      type: 'ARTICLES_FETCH_ERROR',
      error,
    });
  }
};
