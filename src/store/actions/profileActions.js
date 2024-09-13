import apiService from '../../services/apiService'; 
import { updateProfileSuccess } from '../slices/authSlice'; 

export const updateProfileAction = (data) => async (dispatch) => {
  try {
    const response = await apiService.put('/user/update', data); 
    if (response.data.success) {
      dispatch(updateProfileSuccess(response.data.user)); 
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    return { success: false };
  }
};
