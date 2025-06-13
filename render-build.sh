#!/bin/bash

echo "🚀 Starting Render build process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build client
echo "🏗️ Building client..."
cd client && npm run build && cd ..

# Create dist directory
echo "📁 Creating dist directory..."
mkdir -p dist

# Copy server files
echo "📁 Copying server files..."
cp -r server dist/
cp package.json dist/
cp .env* dist/ 2>/dev/null || true

# Copy client build
echo "📁 Copying client build..."
cp -r client/dist dist/client

echo "✅ Build completed successfully!" 