const fs = require("fs")
const path = require("path")

console.log("🎮 J.S_RetroGames - Populating Games Database...")

// Create necessary directories
const dirs = ["public/games", "public/images", "public/roms"]
dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    console.log(`📁 Created directory: ${dir}`)
  }
})

const gamesFile = "public/games.json"

// Comprehensive games list organized by console
const gamesList = {
  SNES: [
    "ActRaiser",
    "Chrono Trigger",
    "Contra III: The Alien Wars",
    "Donkey Kong Country 1",
    "Donkey Kong Country 2",
    "Donkey Kong Country 3",
    "EarthBound",
    "Final Fantasy III", // Final Fantasy VI no Japão
    "F-Zero",
    "Kirby Super Star",
    "Mega Man X",
    "Mortal Kombat",
    "Mortal Kombat II",
    "Secret of Mana",
    "Star Fox",
    "Street Fighter II Champion Edition",
    "Street Fighter II Hyper Fighting",
    "Street Fighter II Turbo",
    "Super Castlevania IV",
    "Super Mario Kart",
    "Super Mario RPG: Legend of the Seven Stars",
    "Super Mario World",
    "Super Metroid",
    "The Legend of Zelda: A Link to the Past",
    "Yoshi's Island: Super Mario World 2",
  ],
  N64: [
    "1080° Snowboarding",
    "Banjo-Kazooie",
    "Banjo-Tooie",
    "Conker's Bad Fur Day",
    "Donkey Kong 64",
    "F-Zero X",
    "GoldenEye 007",
    "Mario Kart 64",
    "Mario Party 1",
    "Mario Party 2",
    "Mario Party 3",
    "Mario Tennis",
    "Paper Mario",
    "Perfect Dark",
    "Pokémon Snap",
    "Pokémon Stadium",
    "Star Fox 64",
    "Star Wars: Rogue Squadron",
    "Star Wars: Shadows of the Empire",
    "Super Mario 64",
    "Super Smash Bros.",
    "The Legend of Zelda: Ocarina of Time",
    "The Legend of Zelda: Majora's Mask",
    "Turok: Dinosaur Hunter",
    "Wave Race 64",
  ],
  PS1: [
    "Breath of Fire III",
    "Castlevania: Symphony of the Night",
    "Chrono Cross",
    "Crash Bandicoot 2: Cortex Strikes Back",
    "Final Fantasy VII",
    "Final Fantasy IX",
    "Final Fantasy Tactics",
    "Gran Turismo 1",
    "Gran Turismo 2",
    "Legend of Mana",
    "Legacy of Kain: Soul Reaver",
    "MediEvil",
    "Metal Gear Solid",
    "Oddworld: Abe's Oddysee",
    "Parasite Eve",
    "Resident Evil 2",
    "Ridge Racer Type 4",
    "Silent Hill",
    "Spyro the Dragon",
    "Suikoden II",
    "Tekken 3",
    "Tomb Raider",
    "Tony Hawk's Pro Skater",
    "Vagrant Story",
    "Wipeout XL",
  ],
  PS2: [
    "Devil May Cry",
    "Devil May Cry 3",
    "Final Fantasy X",
    "God of War",
    "God of War 2",
    "Grand Theft Auto III",
    "Grand Theft Auto: Vice City",
    "Grand Theft Auto: San Andreas",
    "Gran Turismo 4",
    "Ico",
    "Jak and Daxter: The Precursor Legacy",
    "Kingdom Hearts",
    "Kingdom Hearts II",
    "Metal Gear Solid 2",
    "Metal Gear Solid 3",
    "Need for Speed: Most Wanted",
    "Okami",
    "Persona 4",
    "Prince of Persia: The Sands of Time",
    "Ratchet & Clank: Up Your Arsenal",
    "Resident Evil 4",
    "Shadow Hearts: Covenant",
    "Shadow of the Colossus",
    "Silent Hill 2",
    "Tony Hawk's Pro Skater 3",
  ],
  XBOX: [
    "Alan Wake",
    "Assassin's Creed II",
    "Batman: Arkham City",
    "BioShock",
    "Borderlands 2",
    "Call of Duty 4: Modern Warfare",
    "Call of Duty: Modern Warfare 2",
    "Dark Souls",
    "Fallout 3",
    "Forza Horizon",
    "Gears of War",
    "Gears of War 2",
    "Grand Theft Auto IV",
    "Halo 3",
    "Halo: Reach",
    "Limbo",
    "Mass Effect 2",
    "Minecraft",
    "Ori and the Blind Forest",
    "Portal 2",
    "Red Dead Redemption",
    "Splinter Cell: Chaos Theory",
    "Sunset Overdrive",
    "The Elder Scrolls V: Skyrim",
    "The Witcher 3: Wild Hunt",
  ],
}

// Load existing games data if it exists
let existingGames = {}
if (fs.existsSync(gamesFile)) {
  try {
    existingGames = JSON.parse(fs.readFileSync(gamesFile, "utf8"))
    console.log("📖 Loaded existing games database")
  } catch (error) {
    console.log("⚠️  Error reading existing games file, creating new one")
    existingGames = {}
  }
}

// Process each console and its games
for (const [console, games] of Object.entries(gamesList)) {
  if (!existingGames[console]) {
    existingGames[console] = []
  }

  console.log(`🎯 Processing ${console} games...`)

  for (const gameName of games) {
    // Check if game already exists
    const existingGame = existingGames[console].find((g) => g.name === gameName)

    if (!existingGame) {
      const gameSlug = gameName
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-")
        .replace(/--+/g, "-")
        .trim()

      const gameData = {
        name: gameName,
        console: console,
        rom: generateRomUrl(console, gameSlug),
        image: `/images/games/${gameSlug}.jpg`,
        description: generateDescription(gameName, console),
        year: getGameYear(console, gameName),
        genre: getGameGenre(gameName),
        rating: getGameRating(gameName),
        players: getPlayerCount(gameName),
        size: getGameSize(console),
        developer: getGameDeveloper(gameName),
        added: new Date().toISOString(),
      }

      existingGames[console].push(gameData)
      console.log(`  ✅ Added: ${gameName}`)
    } else {
      console.log(`  ⏭️  Exists: ${gameName}`)
    }
  }

  console.log(`📊 ${console}: ${existingGames[console].length} games total`)
}

// Helper functions
function generateRomUrl(console, gameSlug) {
  const baseUrls = {
    SNES: "https://archive.org/download/snes-complete-collection",
    N64: "https://archive.org/download/nintendo-64-complete-collection",
    PS1: "https://archive.org/download/playstation-1-complete-collection",
    PS2: "https://archive.org/download/playstation-2-complete-collection",
    XBOX: "https://archive.org/download/xbox-complete-collection",
  }

  const extensions = {
    SNES: ".smc",
    N64: ".z64",
    PS1: ".bin",
    PS2: ".iso",
    XBOX: ".iso",
  }

  return `${baseUrls[console]}/${gameSlug}${extensions[console]}`
}

function generateDescription(gameName, console) {
  const descriptions = {
    "Chrono Trigger": "Epic time-traveling RPG masterpiece with multiple endings",
    "Super Mario World": "Classic platformer featuring Yoshi and Cape Mario",
    "The Legend of Zelda: Ocarina of Time": "3D adventure that revolutionized gaming",
    "Final Fantasy VII": "Iconic RPG with Cloud Strife and unforgettable story",
    "GoldenEye 007": "Revolutionary FPS with split-screen multiplayer",
    "Super Metroid": "Atmospheric sci-fi adventure with perfect gameplay",
    "Metal Gear Solid": "Stealth action game that redefined storytelling",
  }

  return descriptions[gameName] || `Classic ${console} game featuring ${gameName}`
}

function getGameYear(console, gameName) {
  // Specific years for notable games
  const specificYears = {
    "Chrono Trigger": "1995",
    "Super Mario World": "1990",
    "The Legend of Zelda: Ocarina of Time": "1998",
    "Final Fantasy VII": "1997",
    "Super Mario 64": "1996",
    "GoldenEye 007": "1997",
  }

  if (specificYears[gameName]) return specificYears[gameName]

  const consoleYears = {
    SNES: "1990-1996",
    N64: "1996-2001",
    PS1: "1995-2001",
    PS2: "2000-2006",
    XBOX: "2001-2013",
  }
  return consoleYears[console] || "Unknown"
}

function getGameGenre(gameName) {
  const name = gameName.toLowerCase()
  if (name.includes("mario") && !name.includes("kart") && !name.includes("party")) return "Platform"
  if (name.includes("final fantasy") || name.includes("chrono") || name.includes("persona")) return "RPG"
  if (name.includes("street fighter") || name.includes("mortal kombat") || name.includes("tekken")) return "Fighting"
  if (name.includes("zelda") || name.includes("metroid")) return "Adventure"
  if (name.includes("kart") || name.includes("gran turismo") || name.includes("forza")) return "Racing"
  if (name.includes("call of duty") || name.includes("goldeneye") || name.includes("halo")) return "Shooter"
  if (name.includes("gta") || name.includes("grand theft")) return "Open World"
  if (name.includes("resident evil") || name.includes("silent hill")) return "Horror"
  if (name.includes("tony hawk")) return "Sports"
  return "Action"
}

function getGameRating(gameName) {
  // Higher ratings for legendary games
  const legendary = ["chrono trigger", "ocarina of time", "super mario world", "final fantasy vii", "super metroid"]
  const name = gameName.toLowerCase()

  if (legendary.some((game) => name.includes(game))) return 5.0
  return Math.round((Math.random() * 1.5 + 3.5) * 10) / 10 // 3.5-5.0 rating
}

function getPlayerCount(gameName) {
  const name = gameName.toLowerCase()
  if (name.includes("party") || name.includes("smash bros")) return "1-4"
  if (name.includes("kart") || name.includes("goldeneye")) return "1-4"
  if (name.includes("fighting") || name.includes("vs") || name.includes("tekken")) return "1-2"
  if (name.includes("co-op") || name.includes("gears of war")) return "1-2"
  return "1"
}

function getGameSize(console) {
  const sizes = {
    SNES: "1-4 MB",
    N64: "4-64 MB",
    PS1: "650 MB",
    PS2: "4.7 GB",
    XBOX: "8.5 GB",
  }
  return sizes[console] || "Unknown"
}

function getGameDeveloper(gameName) {
  const developers = {
    "Super Mario": "Nintendo",
    Zelda: "Nintendo",
    "Final Fantasy": "Square",
    Chrono: "Square",
    "Metal Gear": "Konami",
    Castlevania: "Konami",
    "Street Fighter": "Capcom",
    "Mega Man": "Capcom",
    Sonic: "Sega",
    GTA: "Rockstar",
    Halo: "Bungie",
    "Gears of War": "Epic Games",
  }

  for (const [key, dev] of Object.entries(developers)) {
    if (gameName.includes(key)) return dev
  }
  return "Various"
}

// Write the updated games database
try {
  fs.writeFileSync(gamesFile, JSON.stringify(existingGames, null, 2))

  // Calculate totals
  const totalGames = Object.values(existingGames).reduce((sum, games) => sum + games.length, 0)

  console.log("\n🎮 J.S_RetroGames Database Updated Successfully!")
  console.log(`📊 Total Games: ${totalGames}`)
  console.log(`💾 Database saved to: ${gamesFile}`)
  console.log("\n🚀 Ready for deployment!")
} catch (error) {
  console.error("❌ Error writing games database:", error)
  process.exit(1)
}
