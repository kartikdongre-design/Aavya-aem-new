import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    /** If AEM `npm start` is already on 3000, stop it first or set strictPort: false. */
    strictPort: true,
  },
});
