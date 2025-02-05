import axios from 'axios';

export const axi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// TODO extract error detail and throw new Error
// axi.interceptors.response.use(
//   (response) => response,
//   (error: unknown) => {
//     if (isAxiosError(error)) {
//       if (error.response?.status === 401) {
//         redirectToLogin();
//       }
//     }
//
//     return Promise.reject(error);
//   },
// );
