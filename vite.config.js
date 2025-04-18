import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5173,
    // ✅ Ensures React Router paths are handled correctly in dev
    historyApiFallback: true,
  },
  // ✅ Ensures Render production fallback also behaves
  preview: {
    historyApiFallback: true,
  },
});
