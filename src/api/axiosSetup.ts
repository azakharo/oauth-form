import axios, {isAxiosError} from 'axios';
import {isDevelopment} from '@/constants';

export const axi = axios.create({
  // For development the proxying in the devserver is used
  baseURL: (isDevelopment ? '' : import.meta.env.VITE_API_URL) + '/api/v0/auth',
});

axi.interceptors.response.use(
  response => response,
  (error: unknown) => {
    if (isAxiosError(error)) {
      const errorMessage1 = error.response?.data?.detail?.msg as string;
      const errorMessage2 = error.response?.data?.detail as string;
      const errorMessage = errorMessage1 || errorMessage2;
      if (errorMessage) {
        return Promise.reject(new Error(errorMessage));
      }
    }

    return Promise.reject(error);
  },
);
