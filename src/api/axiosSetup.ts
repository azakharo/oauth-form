import axios, {isAxiosError} from 'axios';

import {isDevelopment} from '@/constants';

export const axi = axios.create({
  // For development the proxying in the devserver is used
  baseURL: isDevelopment ? '' : import.meta.env.VITE_API_URL,
});

axi.interceptors.response.use(
  response => response,
  (error: unknown) => {
    if (isAxiosError(error)) {
      // Здесь не описываю detail в Typescript, просто проверяю наличие в runtime
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const errorMessage1 = error.response?.data?.detail?.msg as string;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const errorMessage2 = error.response?.data?.detail as string;
      const errorMessage = errorMessage1 || errorMessage2;
      if (errorMessage) {
        return Promise.reject(new Error(errorMessage));
      }
    }

    return Promise.reject(error);
  },
);
