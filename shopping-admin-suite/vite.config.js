import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig(({ command }) => ({
  /** AEM static host serves bundles under /shopping-admin/ (see index-shopping-admin-suite.html). */
  base: command === 'build' ? '/shopping-admin/' : '/',
  plugins: [react(), tailwindcss()],
  server: {
    port: 3100,
    strictPort: true,
    fs: {
      allow: [path.resolve(__dirname, '..')],
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: '../shopping-admin',
    emptyOutDir: true,
  },
}));
