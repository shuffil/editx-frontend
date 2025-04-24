import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './index.html',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    historyApiFallback: true, // ✅ local dev fallback for SPA
  },
  preview: {
    historyApiFallback: true, // ✅ Render dev fallback
  },
  // ✅ Copy _redirects after build (for Render SPA routing)
  async closeBundle() {
    const redirectsSrc = path.resolve(__dirname, 'public/_redirects');
    const redirectsDest = path.resolve(__dirname, 'dist/_redirects');
    if (fs.existsSync(redirectsSrc)) {
      fs.copyFileSync(redirectsSrc, redirectsDest);
      console.log('✅ Copied _redirects to dist');
    } else {
      console.warn('⚠️ _redirects file not found in /public');
    }
  },
});
