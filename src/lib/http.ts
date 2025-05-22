import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { API_KEY, BASE_URL } from '../constants/api';

const http: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    apikey: API_KEY,
  },
});

http.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const message = error.response?.data || error.message || 'Unknown error';
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);

const get = async <T, D = any>(
  url: string,
  params: Record<string, D>,
  config?: AxiosRequestConfig
): Promise<T> => {
  const res = await http.get<T>(url, { ...config, params });
  return res.data;
};

export const api = { get };
