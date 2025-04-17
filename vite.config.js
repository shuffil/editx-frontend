import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// This plugin ensures _redirects is copied to dist/
const copyRedirectsPlugin = () => {
  return {
    name: 'copy-redirects',
    closeBundle() {
      const srcPath = path.resolve(__dirname, '_redirects');
      const destPath = path.resolve(__dirname, 'dist', '_redirects');

      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log('✅ _redirects file copied to dist/');
      } else {
        console.warn('⚠️ No _redirects file found in root.');
      }
    }
  };
};

export default defineConfig({
  plugins: [react(), copyRedirectsPlugin()],
  build: {
    outDir: 'dist'
  }
});
