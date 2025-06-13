import { execSync } from 'child_process';
import fs from 'fs';

console.log('🚀 Starting production build process...');

try {
  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Set environment variables
  process.env.NODE_ENV = 'production';

  // Build client with Vite
  console.log('🏗️ Building client with Vite...');
  execSync('cd client && npx vite build --mode production', { stdio: 'inherit' });

  // Compile server TypeScript to JavaScript
  console.log('🏗️ Compiling server TypeScript...');
  execSync('npx tsc --project tsconfig.server.json', { stdio: 'inherit' });

  // Create dist directory
  console.log('📁 Creating dist directory...');
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
  }
  
  // Copy compiled server files
  console.log('📁 Copying compiled server files...');
  execSync('cp -r server-compiled dist/server', { stdio: 'inherit' });
  
  // Copy package.json and other necessary files
  execSync('cp package.json dist/', { stdio: 'inherit' });
  execSync('cp .env* dist/ 2>/dev/null || true', { stdio: 'inherit' });

  // Copy client build
  console.log('📁 Copying client build...');
  execSync('cp -r client/dist dist/client', { stdio: 'inherit' });

  console.log('✅ Production build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
} 