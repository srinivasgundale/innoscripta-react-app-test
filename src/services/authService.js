import axios from 'axios';

import {API_BASE_URL} from '../utils/constants';

export const login = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, data);
    console.log("🚀 ~ login ~ response:", response)
    return response.data; 
  } catch (error) {
    console.error('Login error', error);
    throw error; 
  }
};

export const register = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, data);
    
    console.log("🚀 ~ register ~ response:", response)
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
