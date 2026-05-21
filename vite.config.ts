import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vite.dev
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Регистрируем алиас @, который указывает на папку src
      '@': resolve(__dirname, './src'),
    },
  },
});