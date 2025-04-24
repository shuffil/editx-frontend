import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs'; // ✅ Correct placement (outside defineConfig)

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
    historyApiFallback: true,
  },
  preview: {
    historyApiFallback: true,
  },
  // ✅ Final corrected hook to copy _redirects file after build
  closeBundle: async () => {
    const from = path.resolve(__dirname, 'public/_redirects');
    const to = path.resolve(__dirname, 'dist/_redirects');
    if (fs.existsSync(from)) {
      fs.copyFileSync(from, to);
      console.log('✅ _redirects copied to dist');
    } else {
      console.warn('⚠️ _redirects file not found in /public');
    }
  },
});
