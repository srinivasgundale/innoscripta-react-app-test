import apiService from '../../services/apiService'; 

export const updateProfileAction = (data) => async (dispatch) => {
  try {
    const response = await apiService.put('/profile', data); 
    if (response.data.success) {
      dispatch({
        type: 'UPDATE_PROFILE_SUCCESS',
        payload: response.data.user, 
      });
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    return { success: false };
  }
};
