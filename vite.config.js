import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const API_PATH = process.env.NODE_ENV === "production" ? 'https://api.radickalcreations.com' : '/api';
const PUBLIC_PATH = process.env.NODE_ENV === "production" ? '/demo/podcast-web-app' : '';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esNext',
  },
  plugins: [
    react(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5050',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
  define: {
    BASE_API: JSON.stringify(API_PATH),
    IMAGE_PATH: JSON.stringify(PUBLIC_PATH+"/images"),
    ROOT_PATH: JSON.stringify("/demo/podcast-web-app")
  }
});
