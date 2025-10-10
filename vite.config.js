import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/gregorio-martino-portfolio/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // collega '@' alla cartella src
    },
  },
  build: {
    sourcemap: false, // disabilita sourcemap per evitare eval bloccati da CSP
    minify: 'terser', // minimizza JS per produzione
    terserOptions: {
      compress: {
        // evita eval in fase di compressione
        global_defs: {
          "typeof window": "object",
        },
      },
    },
  },
});
