import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './index.html'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // ✅ Hook to copy _redirects after build
  async closeBundle() {
    const source = path.resolve(__dirname, 'public/_redirects');
    const dest = path.resolve(__dirname, 'dist/_redirects');
    if (fs.existsSync(source)) {
      fs.copyFileSync(source, dest);
      console.log('✅ Copied _redirects to dist');
    }
  },
});
