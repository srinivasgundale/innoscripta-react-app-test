import apiService from './apiService'; 

export const login = async (data) => {
  try {
    const response = await apiService.post(`/login`, data); 
    console.log("🚀 ~ login ~ response:", response);
    return response.data; 
  } catch (error) {
    console.error('Login error', error);
    throw error; 
  }
};

export const register = async (data) => {
  try {
    const response = await apiService.post(`/register`, data); 
    console.log("🚀 ~ register ~ response:", response);
    return response.data; 
  } catch (error) {
    console.error('Registration error', error);
    throw error; 
  }
};

export default {
  login,
  register,
};
