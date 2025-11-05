import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  // Usa '/' per Vercel, '/gregorio-martino-portfolio/' per GitHub Pages --- process.env.VERCEL ? '/' : '/gregorio-martino-portfolio/',
  base: '/gregorio-martino-portfolio/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    sourcemap: false,
    minify: 'esbuild',
    target: 'esnext',
  },
  server: {
    port: 5173,
    open: true,
  },
});