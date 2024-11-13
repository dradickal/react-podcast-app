import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const nodeEnv = process.env.NODE_ENV === "production" ? 'https://api.radickalcreations.com' : '/api';
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
    BASE_API: JSON.stringify(nodeEnv),
  }
});
