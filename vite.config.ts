/// <reference types="vitest/config" />

import * as path from 'path';
import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({mode}) => {
  const {VITE_API_URL} = loadEnv(mode, process.cwd());

  return {
    base: './',
    plugins: [
      react(),
      // svgr options: https://react-svgr.com/docs/options/
      svgr({svgrOptions: {icon: true}}),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      open: true,
      port: 4000,
      proxy: {
        '^/api': {
          target: VITE_API_URL,
          changeOrigin: true,
          secure: true,
        },
      },
    },
    test: {},
  };
});
