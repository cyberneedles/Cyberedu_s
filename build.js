import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 Starting build process...');

try {
  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Build client
  console.log('🏗️ Building client...');
  execSync('cd client && npm run build', { stdio: 'inherit' });

  // Copy server files to dist (no build needed for server)
  console.log('📁 Copying server files...');
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
  }
  
  // Copy server files to dist
  execSync('cp -r server dist/', { stdio: 'inherit' });
  
  // Copy package.json and other necessary files
  execSync('cp package.json dist/', { stdio: 'inherit' });
  execSync('cp .env* dist/ 2>/dev/null || true', { stdio: 'inherit' });

  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
} 