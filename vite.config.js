import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/gregorio-martino-portfolio/', // nome del repo GitHub
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    sourcemap: false,     // disabilita sourcemap → CSP ok
    minify: 'esbuild',    // minimizza senza eval
  },
});
