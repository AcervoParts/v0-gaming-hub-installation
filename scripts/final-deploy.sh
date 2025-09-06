#!/bin/bash

echo "🚀 J.S_RetroGames - Final Deployment Script"
echo "==========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: System Verification
echo -e "${BLUE}🔍 Step 1: System Verification${NC}"
npm run verify-system
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ System verification failed. Fix errors before deployment.${NC}"
    exit 1
fi

# Step 2: Clean Install
echo -e "${BLUE}📦 Step 2: Clean Install${NC}"
rm -rf node_modules package-lock.json
npm install

# Step 3: Build Test
echo -e "${BLUE}🔨 Step 3: Build Test${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed. Check for errors.${NC}"
    exit 1
fi

# Step 4: Production Setup
echo -e "${BLUE}⚙️ Step 4: Production Setup${NC}"
npm run setup-production

# Step 5: Final Verification
echo -e "${BLUE}✅ Step 5: Final Verification${NC}"
echo "Checking critical files..."

# Check games.json
if [ -f "public/games.json" ]; then
    echo -e "${GREEN}✅ Games database ready${NC}"
else
    echo -e "${RED}❌ Games database missing${NC}"
    exit 1
fi

# Check logo
if [ -f "public/js-retrogames-logo.png" ]; then
    echo -e "${GREEN}✅ Logo ready${NC}"
else
    echo -e "${RED}❌ Logo missing${NC}"
    exit 1
fi

# Check vercel config
if [ -f "vercel.json" ]; then
    echo -e "${GREEN}✅ Vercel config ready${NC}"
else
    echo -e "${RED}❌ Vercel config missing${NC}"
    exit 1
fi

# Step 6: Deploy to Vercel
echo -e "${BLUE}🚀 Step 6: Deploy to Vercel${NC}"
echo "Deploying to production..."

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}⚠️ Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
fi

# Deploy
vercel --prod --confirm

if [ $? -eq 0 ]; then
    echo -e "${GREEN}🎉 DEPLOYMENT SUCCESSFUL!${NC}"
    echo ""
    echo -e "${GREEN}✅ J.S_RetroGames is now live!${NC}"
    echo ""
    echo -e "${BLUE}📋 Post-deployment checklist:${NC}"
    echo "1. Test admin login: jadsonreserva98@gmail.com / admin9809"
    echo "2. Upload a test ROM via admin panel"
    echo "3. Test game emulation"
    echo "4. Verify PWA installation"
    echo "5. Test on mobile devices"
    echo ""
    echo -e "${YELLOW}🎮 Your retro gaming hub is ready for players!${NC}"
else
    echo -e "${RED}❌ Deployment failed. Check Vercel logs.${NC}"
    exit 1
fi
