#!/bin/bash

echo "🎮 J.S_RetroGames - Production Setup Script"
echo "============================================="

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p public/games
mkdir -p public/images
mkdir -p public/roms

# Set permissions
echo "🔒 Setting permissions..."
chmod 755 public/games
chmod 755 public/images
chmod 755 public/roms

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

# Create environment file template
echo "⚙️ Creating environment template..."
cat > .env.local.template << EOF
# J.S_RetroGames Environment Variables
NEXT_PUBLIC_APP_NAME=J.S_RetroGames
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_ADMIN_EMAIL=jadsonreserva98@gmail.com

# Production URLs
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app/api

# Security
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=https://your-domain.vercel.app
EOF

echo "✅ Production setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Copy .env.local.template to .env.local"
echo "2. Update environment variables with your values"
echo "3. Deploy to Vercel: vercel --prod"
echo ""
echo "🚀 Your J.S_RetroGames system is ready for deployment!"
