#!/bin/bash

# J.S_RetroGames - Installation Script
echo "🎮 Installing J.S_RetroGames..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create admin credentials
echo "🔐 Setting up admin credentials..."
ADMIN_PASS=$(openssl rand -hex 12)
printf "ADMIN_EMAIL=%s\nADMIN_PASS=%s\n" "jadsonreserva98@gmail.com" "$ADMIN_PASS" > .env.local

echo "✅ Admin credentials created:"
echo "Email: jadsonreserva98@gmail.com"
echo "Password: $ADMIN_PASS"

# Create games directory and copy images
echo "🎯 Setting up game assets..."
mkdir -p public/games
mkdir -p public/roms
cp -v ./game_images/* public/games/ 2>/dev/null || echo "No game images found - will use placeholders"

# Configure build settings
echo "⚙️ Configuring build settings..."
node -e '
const fs = require("fs");
try {
  const pkg = JSON.parse(fs.readFileSync("package.json"));
  
  if (pkg.dependencies && pkg.dependencies["react-scripts"]) {
    pkg.homepage = ".";
    fs.writeFileSync("package.json", JSON.stringify(pkg, null, 2));
    console.log("CRA detected - homepage set to .");
  } else if (fs.existsSync("next.config.js") || fs.existsSync("next.config.mjs")) {
    const configFile = fs.existsSync("next.config.mjs") ? "next.config.mjs" : "next.config.js";
    let existing = {};
    
    try {
      if (configFile.endsWith(".mjs")) {
        // For ES modules, we need to handle differently
        const configContent = fs.readFileSync(configFile, "utf8");
        console.log("Next.js detected - config already exists");
      } else {
        existing = require(process.cwd() + "/" + configFile);
      }
    } catch(e) {}
    
    const cfg = `/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: "",
  basePath: "",
  images: {
    unoptimized: true,
    domains: ["archive.org", "blob.v0.dev"]
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Cross-Origin-Embedder-Policy",
          value: "require-corp"
        },
        {
          key: "Cross-Origin-Opener-Policy", 
          value: "same-origin"
        }
      ]
    }
  ]
};

export default nextConfig;`;
    
    fs.writeFileSync("next.config.mjs", cfg);
    console.log("Next.js detected - next.config.mjs updated");
  } else {
    console.log("No CRA/Next.js detected - please verify asset paths");
  }
} catch(e) {
  console.error("Error patching config:", e);
}'

echo "🚀 Installation complete!"
echo ""
echo "Next steps:"
echo "1. Run 'npm run dev' to start development server"
echo "2. Run 'npm run build' to build for production"
echo "3. Run './scripts/deploy.sh' to deploy to Vercel"
echo ""
echo "Admin Login:"
echo "Email: jadsonreserva98@gmail.com"
echo "Password: $ADMIN_PASS"
