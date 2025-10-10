import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/', // obbligatorio per Vercel
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // '@' punta a 'src'
    },
  },
  build: {
    sourcemap: false, // evita problemi con CSP
    minify: 'esbuild', // minimizza il JS in produzione
    target: 'esnext', // compatibile con modern browser
  },
  server: {
    port: 5173,
    open: true,
  },
});
