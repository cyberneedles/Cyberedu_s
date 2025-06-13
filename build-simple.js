import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 Starting simple build process...');

try {
  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Set environment variables to skip TypeScript
  process.env.SKIP_TYPESCRIPT = 'true';
  process.env.NODE_ENV = 'production';

  // Build client with Vite only (no TypeScript checking)
  console.log('🏗️ Building client with Vite...');
  execSync('cd client && npx vite build --mode production', { stdio: 'inherit' });

  // Create dist directory
  console.log('📁 Creating dist directory...');
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
  }
  
  // Copy server files to dist
  console.log('📁 Copying server files...');
  execSync('cp -r server dist/', { stdio: 'inherit' });
  
  // Copy package.json and other necessary files
  execSync('cp package.json dist/', { stdio: 'inherit' });
  execSync('cp .env* dist/ 2>/dev/null || true', { stdio: 'inherit' });

  // Copy client build
  console.log('📁 Copying client build...');
  execSync('cp -r client/dist dist/client', { stdio: 'inherit' });

  console.log('✅ Simple build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
} 