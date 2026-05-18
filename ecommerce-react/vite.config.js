import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ command }) => ({
  /** Production bundles live under /shop/ for aem.page; dev keeps `/` for localhost:3000. */
  base: command === 'build' ? '/shop/' : '/',
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    /** If AEM `npm start` is already on 3000, stop it first or set strictPort: false. */
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: '../shop',
    emptyOutDir: true,
  },
}));
