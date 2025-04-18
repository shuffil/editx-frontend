// build.mjs
import { execSync } from 'child_process';

try {
  console.log('🔨 Running Vite build manually...');
  execSync('node ./node_modules/vite/bin/vite.js build', { stdio: 'inherit' });
} catch (err) {
  console.error('❌ Vite build failed:', err);
  process.exit(1);
}

