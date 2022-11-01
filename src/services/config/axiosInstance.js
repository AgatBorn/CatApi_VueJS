import axios from 'axios';
import { API_URL } from './constants.js';


const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

export default axiosInstance;