const fs = require("fs")
const path = require("path")

console.log("🔍 J.S_RetroGames - System Verification")
console.log("=====================================")

const errors = []
const warnings = []

// Check required files
const requiredFiles = [
  "app/page.tsx",
  "app/layout.tsx",
  "components/game-player.tsx",
  "components/admin-panel.tsx",
  "components/rom-uploader.tsx",
  "public/js-retrogames-logo.png",
  "public/games.json",
  "vercel.json",
  "next.config.mjs",
]

console.log("📁 Checking required files...")
requiredFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`)
  } else {
    errors.push(`❌ Missing file: ${file}`)
  }
})

// Check games.json structure
console.log("\n🎮 Checking games database...")
try {
  const gamesData = JSON.parse(fs.readFileSync("public/games.json", "utf8"))
  const consoles = Object.keys(gamesData)
  let totalGames = 0

  consoles.forEach((console) => {
    const games = gamesData[console]
    totalGames += games.length
    console.log(`✅ ${console}: ${games.length} games`)
  })

  console.log(`✅ Total: ${totalGames} games across ${consoles.length} consoles`)
} catch (error) {
  errors.push(`❌ Games database error: ${error.message}`)
}

// Check package.json scripts
console.log("\n📦 Checking package.json scripts...")
try {
  const packageData = JSON.parse(fs.readFileSync("package.json", "utf8"))
  const requiredScripts = ["dev", "build", "start", "setup-production", "deploy-vercel"]

  requiredScripts.forEach((script) => {
    if (packageData.scripts[script]) {
      console.log(`✅ Script: ${script}`)
    } else {
      warnings.push(`⚠️ Missing script: ${script}`)
    }
  })
} catch (error) {
  errors.push(`❌ Package.json error: ${error.message}`)
}

// Check authentication system
console.log("\n🔐 Checking authentication system...")
try {
  const pageContent = fs.readFileSync("app/page.tsx", "utf8")

  if (pageContent.includes("jadsonreserva98@gmail.com")) {
    console.log("✅ Admin credentials configured")
  } else {
    errors.push("❌ Admin credentials not found")
  }

  if (pageContent.includes("ADMIN_CREDENTIALS")) {
    console.log("✅ Authentication system present")
  } else {
    errors.push("❌ Authentication system not found")
  }
} catch (error) {
  errors.push(`❌ Authentication check error: ${error.message}`)
}

// Final report
console.log("\n📊 VERIFICATION REPORT")
console.log("=====================")

if (errors.length === 0) {
  console.log("🎉 ALL SYSTEMS OPERATIONAL!")
  console.log("✅ J.S_RetroGames is ready for deployment")

  if (warnings.length > 0) {
    console.log("\n⚠️ Warnings:")
    warnings.forEach((warning) => console.log(warning))
  }

  console.log("\n🚀 Ready to deploy:")
  console.log("   npm run deploy-vercel")

  process.exit(0)
} else {
  console.log("❌ ERRORS FOUND:")
  errors.forEach((error) => console.log(error))

  if (warnings.length > 0) {
    console.log("\n⚠️ Warnings:")
    warnings.forEach((warning) => console.log(warning))
  }

  console.log("\n🔧 Fix errors before deployment")
  process.exit(1)
}
