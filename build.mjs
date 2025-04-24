import { build } from 'vite';
import fs from 'fs';

console.log('🔨 Running Vite build with Vite Node API...');

try {
  await build(); // Uses vite.config.js by default
  console.log('✅ Vite build completed');
  
  // Optional: copy _redirects
  try {
    fs.copyFileSync('public/_redirects', 'dist/_redirects');
    console.log('✅ _redirects copied into dist');
  } catch (err) {
    console.warn('⚠️ _redirects copy skipped:', err.message);
  }

} catch (err) {
  console.error('❌ Vite build error:', err.message);
}
