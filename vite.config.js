import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/gregorio-martino-portfolio/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    sourcemap: false, // <- disabilita sourcemap per evitare eval bloccati da CSP
    minify: 'esbuild', // esbuild non usa eval, a differenza di terser in alcune configurazioni
  },
});
