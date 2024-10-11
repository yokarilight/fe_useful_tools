/// <reference types="vitest" />
import { AliasOptions, defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import tailwindcss from 'tailwindcss';

const root = path.resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ react() ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [ './setupTests.ts' ],
  },
  resolve: {
    alias: {
      "@": root,
    } as AliasOptions,
  },
  css: {
    postcss: {
      plugins: [ tailwindcss() ],
    },
  },
});
