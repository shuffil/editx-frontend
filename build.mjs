import { exec } from 'child_process';
import fs from 'fs';

console.log('🔨 Running Vite build manually...');

exec('./node_modules/.bin/vite build', (err, stdout, stderr) => {
  if (err) {
    console.error('❌ Build error:', stderr);
    return;
  }

  console.log(stdout);

  // ✅ Copy _redirects if it exists
  try {
    fs.copyFileSync('public/_redirects', 'dist/_redirects');
    console.log('✅ _redirects copied into dist');
  } catch (copyErr) {
    console.error('❌ Failed to copy _redirects:', copyErr.message);
  }
});
