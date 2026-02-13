// src/utils/httpClient.ts
import axios, { AxiosError } from 'axios';
import {
  API_BASE_URL,
  JWT_CONFIG,
  STORAGE_KEYS,
  ERROR_MESSAGES,
} from '../config/constants';

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

    if (token) {
      config.headers = config.headers ?? {};
      config.headers[JWT_CONFIG.HEADER_NAME] =
        `${JWT_CONFIG.TOKEN_PREFIX}${token}`;
    }

    return config;
  },
  (error: any) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);

      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }

      return Promise.reject({
        message: ERROR_MESSAGES.TOKEN_EXPIRED,
        status: 401,
      });
    }

    if (error.response?.status === 403) {
      return Promise.reject({
        message: ERROR_MESSAGES.UNAUTHORIZED,
        status: 403,
      });
    }

    if (error.response?.status && error.response.status >= 500) {
      return Promise.reject({
        message: ERROR_MESSAGES.SERVER_ERROR,
        status: error.response.status,
      });
    }

    if (!error.response) {
      return Promise.reject({
        message: ERROR_MESSAGES.NETWORK_ERROR,
        status: 0,
      });
    }

    return Promise.reject(error);
  }
);

export default httpClient;
