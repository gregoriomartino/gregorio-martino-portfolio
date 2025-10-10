import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/gregorio-martino-portfolio/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // <-- collega '@' alla cartella src
    },
  },
});
