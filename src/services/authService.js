import axios from 'axios';

// Base URL for your API (replace with your actual API endpoint)
const API_URL = 'http://127.0.0.1:8000/api';

export const login = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    console.log("🚀 ~ login ~ response:", response)
    return response.data; 
  } catch (error) {
    console.error('Login error', error);
    throw error; 
  }
};

export const register = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    
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
