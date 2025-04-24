import { build } from 'vite';
import fs from 'fs';

console.log('🔨 Running Vite build manually...');
await build();

fs.copyFileSync('public/_redirects', 'dist/_redirects');
console.log('✅ _redirects copied to dist/');
