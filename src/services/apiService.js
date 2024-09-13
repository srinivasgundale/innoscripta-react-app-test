import axios from 'axios';
import store from '../store/store'; 
import {API_BASE_URL} from '../utils/constants';
const apiService = axios.create({
  baseURL: API_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});
apiService.interceptors.request.use(
    (config) => {
      const { auth } = store.getState();
      const token = auth?.token;
  
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
export default apiService;
