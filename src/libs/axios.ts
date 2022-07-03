import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export const createAxiosInstance = (
  options?: AxiosRequestConfig,
): AxiosInstance => {
  const defaultOptions: AxiosRequestConfig = {
    baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL,
    params: {
      api_key: process.env.NEXT_PUBLIC_BACKEND_API_KEY,
    },
    ...options,
  };

  return axios.create(defaultOptions);
};
