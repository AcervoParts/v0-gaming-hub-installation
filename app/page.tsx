"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Star, Play, Users, Crown, Zap, Shield, UserCheck, Upload } from "lucide-react"
import GamePlayer from "@/components/game-player"
import DeviceCompatibility from "@/components/device-compatibility"
import InstallationGuide from "@/components/installation-guide"
import CloudServerStatus from "@/components/cloud-server-status"
import ROMDocumentation from "@/components/rom-documentation"
import AdminPanel from "@/components/admin-panel"
import ROMUploader from "@/components/rom-uploader"

interface Game {
  id?: number
  name: string
  title?: string
  console: string
  genre: string
  rating: number
  image: string
  rom: string
  fileType: string
  description?: string
  year?: string
  players?: string
  added?: string
}

interface User {
  id: string
  name: string
  email: string
  isAdmin: boolean
  isApproved: boolean
  joinDate: string
}

const ADMIN_CREDENTIALS = {
  email: "jadsonreserva98@gmail.com",
  password: "admin9809",
}

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [selectedGame, setSelectedGame] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedConsole, setSelectedConsole] = useState("Todos")
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "" })
  const [onlineUsers, setOnlineUsers] = useState(0)
  const [showRegister, setShowRegister] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [showROMUploader, setShowROMUploader] = useState(false)
  const [pendingUsers, setPendingUsers] = useState<User[]>([])
  const [approvedUsers, setApprovedUsers] = useState<User[]>([])
  const [featuredGames, setFeaturedGames] = useState<Game[]>([])
  const [consoles, setConsoles] = useState<{ name: string; count: number; icon: string }[]>([])
  const [isLoadingGames, setIsLoadingGames] = useState(true)

  useEffect(() => {
    const loadGamesDatabase = async () => {
      try {
        setIsLoadingGames(true)
        console.log("[v0] Loading games database...")

        let response
        try {
          response = await fetch("/games.json", {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
        } catch (fetchError) {
          console.log("[v0] Fetch failed:", fetchError)
          throw new Error("Network error fetching games database")
        }

        if (!response.ok) {
          console.log("[v0] Games database not found (status:", response.status, "), using fallback games")
          setFeaturedGames([
            {
              id: 1,
              name: "Super Mario World",
              title: "Super Mario World",
              console: "SNES",
              genre: "Plataforma",
              rating: 4.8,
              image: "/placeholder.svg?height=200&width=300&text=Super+Mario+World",
              rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/Super%20Mario%20World%20%28USA%29.zip",
              fileType: "snes",
            },
            {
              id: 2,
              name: "Super Mario 64",
              title: "Super Mario 64",
              console: "N64",
              genre: "Plataforma",
              rating: 4.9,
              image: "/placeholder.svg?height=200&width=300&text=Mario+64",
              rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/Super%20Mario%2064%20%28USA%29.zip",
              fileType: "n64",
            },
            {
              id: 3,
              name: "Final Fantasy VII",
              title: "Final Fantasy VII",
              console: "PS1",
              genre: "RPG",
              rating: 4.9,
              image: "/placeholder.svg?height=200&width=300&text=Final+Fantasy+VII",
              rom: "https://archive.org/download/psx-roms/FinalFantasy7.bin",
              fileType: "psx",
            },
            {
              id: 4,
              name: "The Legend of Zelda: Ocarina of Time",
              title: "The Legend of Zelda: Ocarina of Time",
              console: "N64",
              genre: "Aventura",
              rating: 4.9,
              image: "/placeholder.svg?height=200&width=300&text=Zelda+Ocarina",
              rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/Legend%20of%20Zelda%2C%20The%20-%20Ocarina%20of%20Time%20%28USA%29.zip",
              fileType: "n64",
            },
            {
              id: 5,
              name: "Donkey Kong Country",
              title: "Donkey Kong Country",
              console: "SNES",
              genre: "Plataforma",
              rating: 4.7,
              image: "/placeholder.svg?height=200&width=300&text=Donkey+Kong+Country",
              rom: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/Donkey%20Kong%20Country%20%28USA%29.zip",
              fileType: "snes",
            },
          ])
          setConsoles([
            { name: "SNES", count: 2, icon: "🎮" },
            { name: "N64", count: 2, icon: "🕹️" },
            { name: "PS1", count: 1, icon: "💿" },
          ])
          setIsLoadingGames(false)
          return
        }

        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          console.log("[v0] Response is not JSON (Content-Type:", contentType, "), using fallback games")
          setFeaturedGames([
            {
              id: 1,
              name: "Super Mario World",
              title: "Super Mario World",
              console: "SNES",
              genre: "Plataforma",
              rating: 4.8,
              image: "/placeholder.svg?height=200&width=300&text=Super+Mario+World",
              rom: "https://archive.org/download/snes-roms/SuperMarioWorld.smc",
              fileType: "snes",
            },
            {
              id: 2,
              name: "Super Mario 64",
              title: "Super Mario 64",
              console: "N64",
              genre: "Plataforma",
              rating: 4.9,
              image: "/placeholder.svg?height=200&width=300&text=Mario+64",
              rom: "https://archive.org/download/n64-roms/SuperMario64.z64",
              fileType: "n64",
            },
            {
              id: 3,
              name: "Final Fantasy VII",
              title: "Final Fantasy VII",
              console: "PS1",
              genre: "RPG",
              rating: 4.9,
              image: "/placeholder.svg?height=200&width=300&text=Final+Fantasy+VII",
              rom: "https://archive.org/download/psx-roms/FinalFantasy7.bin",
              fileType: "psx",
            },
            {
              id: 4,
              name: "The Legend of Zelda: Ocarina of Time",
              title: "The Legend of Zelda: Ocarina of Time",
              console: "N64",
              genre: "Aventura",
              rating: 4.9,
              image: "/placeholder.svg?height=200&width=300&text=Zelda+Ocarina",
              rom: "https://archive.org/download/n64-roms/ZeldaOcarina.z64",
              fileType: "n64",
            },
            {
              id: 5,
              name: "Donkey Kong Country",
              title: "Donkey Kong Country",
              console: "SNES",
              genre: "Plataforma",
              rating: 4.7,
              image: "/placeholder.svg?height=200&width=300&text=Donkey+Kong+Country",
              rom: "https://archive.org/download/snes-roms/DonkeyKongCountry.smc",
              fileType: "snes",
            },
            {
              id: 6,
              name: "Crash Bandicoot",
              title: "Crash Bandicoot",
              console: "PS1",
              genre: "Plataforma",
              rating: 4.6,
              image: "/placeholder.svg?height=200&width=300&text=Crash+Bandicoot",
              rom: "https://archive.org/download/psx-roms/CrashBandicoot.bin",
              fileType: "psx",
            },
          ])
          setConsoles([
            { name: "SNES", count: 2, icon: "🎮" },
            { name: "N64", count: 2, icon: "🕹️" },
            { name: "PS1", count: 2, icon: "💿" },
          ])
          setIsLoadingGames(false)
          return
        }

        let gamesData
        try {
          const responseText = await response.text()
          console.log("[v0] Response received, parsing JSON...")

          if (!responseText || responseText.trim() === "") {
            throw new Error("Empty response from games database")
          }

          if (responseText.trim().startsWith("<")) {
            throw new Error("Response appears to be HTML, not JSON")
          }

          gamesData = JSON.parse(responseText)

          if (!gamesData || typeof gamesData !== "object") {
            throw new Error("Invalid games database format")
          }
        } catch (parseError) {
          console.error("[v0] JSON parsing error:", parseError)
          throw new Error("Failed to parse games database JSON")
        }

        console.log("[v0] Games database loaded successfully")

        const allGames: Game[] = []
        let gameId = 1

        Object.entries(gamesData).forEach(([consoleName, games]: [string, any[]]) => {
          if (Array.isArray(games)) {
            games.forEach((game) => {
              if (game && typeof game === "object" && game.name) {
                allGames.push({
                  id: gameId++,
                  name: game.name,
                  title: game.name,
                  console: consoleName,
                  genre: game.genre || "Ação",
                  rating: game.rating || 4.5,
                  image: game.image || `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(game.name)}`,
                  rom: game.rom,
                  fileType: getFileType(consoleName),
                  description: game.description,
                  year: game.year,
                  players: game.players,
                })
              }
            })
          }
        })

        setFeaturedGames(allGames)

        const consoleCounts = Object.entries(gamesData).map(([consoleName, games]: [string, any[]]) => ({
          name: consoleName,
          count: Array.isArray(games) ? games.length : 0,
          icon: getConsoleIcon(consoleName),
        }))

        setConsoles(consoleCounts)
        console.log("[v0] Loaded", allGames.length, "games across", consoleCounts.length, "consoles")
      } catch (error) {
        console.log("[v0] Using fallback games due to error:", error.message)
        setFeaturedGames([
          {
            id: 1,
            name: "Super Mario World",
            title: "Super Mario World",
            console: "SNES",
            genre: "Plataforma",
            rating: 4.8,
            image: "/placeholder.svg?height=200&width=300&text=Super+Mario+World",
            rom: "https://archive.org/download/snes-roms/SuperMarioWorld.smc",
            fileType: "snes",
          },
          {
            id: 2,
            name: "Super Mario 64",
            title: "Super Mario 64",
            console: "N64",
            genre: "Plataforma",
            rating: 4.9,
            image: "/placeholder.svg?height=200&width=300&text=Mario+64",
            rom: "https://archive.org/download/n64-roms/SuperMario64.z64",
            fileType: "n64",
          },
          {
            id: 3,
            name: "Final Fantasy VII",
            title: "Final Fantasy VII",
            console: "PS1",
            genre: "RPG",
            rating: 4.9,
            image: "/placeholder.svg?height=200&width=300&text=Final+Fantasy+VII",
            rom: "https://archive.org/download/psx-roms/FinalFantasy7.bin",
            fileType: "psx",
          },
          {
            id: 4,
            name: "The Legend of Zelda: Ocarina of Time",
            title: "The Legend of Zelda: Ocarina of Time",
            console: "N64",
            genre: "Aventura",
            rating: 4.9,
            image: "/placeholder.svg?height=200&width=300&text=Zelda+Ocarina",
            rom: "https://archive.org/download/n64-roms/ZeldaOcarina.z64",
            fileType: "n64",
          },
          {
            id: 5,
            name: "Donkey Kong Country",
            title: "Donkey Kong Country",
            console: "SNES",
            genre: "Plataforma",
            rating: 4.7,
            image: "/placeholder.svg?height=200&width=300&text=Donkey+Kong+Country",
            rom: "https://archive.org/download/snes-roms/DonkeyKongCountry.smc",
            fileType: "snes",
          },
          {
            id: 6,
            name: "Crash Bandicoot",
            title: "Crash Bandicoot",
            console: "PS1",
            genre: "Plataforma",
            rating: 4.6,
            image: "/placeholder.svg?height=200&width=300&text=Crash+Bandicoot",
            rom: "https://archive.org/download/psx-roms/CrashBandicoot.bin",
            fileType: "psx",
          },
        ])
        setConsoles([
          { name: "SNES", count: 2, icon: "🎮" },
          { name: "N64", count: 2, icon: "🕹️" },
          { name: "PS1", count: 2, icon: "💿" },
        ])
      } finally {
        setIsLoadingGames(false)
      }
    }

    loadGamesDatabase()

    const savedSession = localStorage.getItem("gamingHubSession")
    if (savedSession) {
      const session = JSON.parse(savedSession)
      if (session.expiry > Date.now()) {
        setIsLoggedIn(true)
        setCurrentUser(session.user)
      } else {
        localStorage.removeItem("gamingHubSession")
      }
    }

    const updateOnlineUsers = () => {
      setOnlineUsers(Math.floor(Math.random() * 50) + 25)
    }
    updateOnlineUsers()
    const interval = setInterval(updateOnlineUsers, 30000)

    try {
      const savedPendingUsers = localStorage.getItem("pendingUsers")
      const savedApprovedUsers = localStorage.getItem("approvedUsers")

      if (savedPendingUsers) {
        setPendingUsers(JSON.parse(savedPendingUsers))
      }
      if (savedApprovedUsers) {
        setApprovedUsers(JSON.parse(savedApprovedUsers))
      }
    } catch (error) {
      console.error("Error loading user data:", error)
    }

    return () => clearInterval(interval)
  }, [])

  const getFileType = (console: string): string => {
    const fileTypes: { [key: string]: string } = {
      SNES: "snes",
      N64: "n64",
      PS1: "psx",
      PS2: "ps2",
      XBOX: "xbox",
    }
    return fileTypes[console] || "rom"
  }

  const getConsoleIcon = (console: string): string => {
    const icons: { [key: string]: string } = {
      SNES: "🎮",
      N64: "🕹️",
      PS1: "💿",
      PS2: "📀",
      XBOX: "🎯",
    }
    return icons[console] || "🎮"
  }

  const handleLogin = () => {
    if (!loginForm.email || !loginForm.password) {
      alert("Preencha todos os campos")
      return
    }

    if (loginForm.email === ADMIN_CREDENTIALS.email && loginForm.password === ADMIN_CREDENTIALS.password) {
      const adminUser: User = {
        id: "admin",
        name: "Jadson Silva",
        email: ADMIN_CREDENTIALS.email,
        isAdmin: true,
        isApproved: true,
        joinDate: new Date().toISOString(),
      }

      const session = {
        user: adminUser,
        expiry: Date.now() + 24 * 60 * 60 * 1000,
      }
      localStorage.setItem("gamingHubSession", JSON.stringify(session))

      setIsLoggedIn(true)
      setCurrentUser(adminUser)
      setLoginForm({ email: "", password: "" })
      return
    }

    const approvedUser = approvedUsers.find((user) => user.email === loginForm.email && user.isApproved)

    if (approvedUser) {
      const session = {
        user: approvedUser,
        expiry: Date.now() + 24 * 60 * 60 * 1000,
      }
      localStorage.setItem("gamingHubSession", JSON.stringify(session))

      setIsLoggedIn(true)
      setCurrentUser(approvedUser)
      setLoginForm({ email: "", password: "" })
    } else {
      alert("Credenciais inválidas ou usuário não aprovado pelo administrador")
    }
  }

  const handleRegister = () => {
    if (!registerForm.name || !registerForm.email || !registerForm.password) {
      alert("Preencha todos os campos")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(registerForm.email)) {
      alert("Email inválido")
      return
    }

    if (registerForm.password.length < 6) {
      alert("Senha deve ter pelo menos 6 caracteres")
      return
    }

    const existingUser = [...pendingUsers, ...approvedUsers].find((user) => user.email === registerForm.email)

    if (existingUser) {
      alert("Email já cadastrado")
      return
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: registerForm.name,
      email: registerForm.email,
      isAdmin: false,
      isApproved: false,
      joinDate: new Date().toISOString(),
    }

    try {
      const updatedPendingUsers = [...pendingUsers, newUser]
      setPendingUsers(updatedPendingUsers)
      localStorage.setItem("pendingUsers", JSON.stringify(updatedPendingUsers))

      alert("Cadastro realizado! Aguarde aprovação do administrador.")
      setShowRegister(false)
      setRegisterForm({ name: "", email: "", password: "" })
    } catch (error) {
      console.error("Error saving user:", error)
      alert("Erro ao salvar usuário. Tente novamente.")
    }
  }

  const handleApproveUser = (userId: string) => {
    try {
      const userToApprove = pendingUsers.find((user) => user.id === userId)
      if (!userToApprove) return

      const updatedPendingUsers = pendingUsers.filter((user) => user.id !== userId)
      const updatedApprovedUsers = [...approvedUsers, { ...userToApprove, isApproved: true }]

      setPendingUsers(updatedPendingUsers)
      setApprovedUsers(updatedApprovedUsers)

      localStorage.setItem("pendingUsers", JSON.stringify(updatedPendingUsers))
      localStorage.setItem("approvedUsers", JSON.stringify(updatedApprovedUsers))
    } catch (error) {
      console.error("Error approving user:", error)
      alert("Erro ao aprovar usuário")
    }
  }

  const handleRejectUser = (userId: string) => {
    try {
      const updatedPendingUsers = pendingUsers.filter((user) => user.id !== userId)
      setPendingUsers(updatedPendingUsers)
      localStorage.setItem("pendingUsers", JSON.stringify(updatedPendingUsers))
    } catch (error) {
      console.error("Error rejecting user:", error)
      alert("Erro ao rejeitar usuário")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("gamingHubSession")
    setIsLoggedIn(false)
    setCurrentUser(null)
    setSelectedGame(null)
  }

  const filteredGames = featuredGames.filter((game) => {
    if (selectedConsole !== "Todos" && game.console !== selectedConsole) return false
    if (
      !game.title?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !game.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false
    return true
  })

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,38,38,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,215,0,0.1),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23dc2626 fillOpacity=0.05%3E%3Cpath d=M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />

        <Card className="w-full max-w-md bg-gradient-to-br from-black/95 via-gray-900/95 to-black/95 border-2 border-red-600/40 backdrop-blur-xl shadow-2xl shadow-red-600/30 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 via-yellow-500/20 to-red-600/20 rounded-lg blur-sm" />
          <div className="relative">
            <CardHeader className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <img
                    src="/js-retrogames-logo.png"
                    alt="J.S RetroGames Logo"
                    className="w-32 h-32 object-contain drop-shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent rounded-2xl" />
                </div>
              </div>
              <div>
                <CardTitle className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
                  J.S_RetroGames
                </CardTitle>
                <CardDescription className="text-gray-300 mt-2 font-medium">
                  🎮 Servidor Premium de Jogos Retrô 🕹️
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {!showRegister ? (
                <>
                  <div className="space-y-4">
                    <Input
                      type="email"
                      placeholder="📧 Email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      className="bg-black/60 border-2 border-red-600/40 text-white placeholder:text-gray-400 focus:border-yellow-500/60 transition-all duration-300 shadow-inner"
                    />
                    <Input
                      type="password"
                      placeholder="🔒 Senha"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      className="bg-black/60 border-2 border-red-600/40 text-white placeholder:text-gray-400 focus:border-yellow-500/60 transition-all duration-300 shadow-inner"
                      onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                    />
                  </div>

                  <Button
                    onClick={handleLogin}
                    className="w-full bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 hover:from-red-700 hover:via-red-600 hover:to-yellow-600 text-white font-bold shadow-2xl shadow-red-600/40 transform hover:scale-105 transition-all duration-300 border border-yellow-500/30"
                  >
                    <Crown className="w-5 h-5 mr-2" />🚀 ENTRAR NO GAME HUB
                  </Button>

                  <div className="text-center">
                    <Button
                      variant="ghost"
                      onClick={() => setShowRegister(true)}
                      className="text-yellow-400 hover:text-yellow-300 hover:bg-red-600/20 transition-all duration-300"
                    >
                      ⚡ Não tem conta? Registre-se
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <Input
                      type="text"
                      placeholder="👤 Nome completo"
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                      className="bg-black/60 border-2 border-red-600/40 text-white placeholder:text-gray-400 focus:border-yellow-500/60 transition-all duration-300"
                    />
                    <Input
                      type="email"
                      placeholder="📧 Email"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      className="bg-black/60 border-2 border-red-600/40 text-white placeholder:text-gray-400 focus:border-yellow-500/60 transition-all duration-300"
                    />
                    <Input
                      type="password"
                      placeholder="🔒 Senha (mín. 6 caracteres)"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      className="bg-black/60 border-2 border-red-600/40 text-white placeholder:text-gray-400 focus:border-yellow-500/60 transition-all duration-300"
                    />
                  </div>

                  <Button
                    onClick={handleRegister}
                    className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold shadow-2xl shadow-green-600/40 transform hover:scale-105 transition-all duration-300"
                  >
                    <UserCheck className="w-5 h-5 mr-2" />🎯 CRIAR CONTA GAMER
                  </Button>

                  <div className="text-center">
                    <Button
                      variant="ghost"
                      onClick={() => setShowRegister(false)}
                      className="text-yellow-400 hover:text-yellow-300 hover:bg-red-600/20 transition-all duration-300"
                    >
                      🔙 Já tem conta? Faça login
                    </Button>
                  </div>
                </>
              )}

              <div className="text-center pt-4 border-t border-red-600/30">
                <p className="text-xs text-gray-400 font-medium">🛡️ Acesso controlado • Aprovação necessária</p>
                <div className="flex items-center justify-center mt-3 space-x-3">
                  <Badge
                    variant="outline"
                    className="border-green-500/60 text-green-400 text-xs bg-green-500/10 shadow-lg"
                  >
                    <Zap className="w-3 h-3 mr-1" />🔥 {onlineUsers} Gamers Online
                  </Badge>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,38,38,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,215,0,0.08),transparent_50%)]" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=80 height=80 viewBox=0 0 80 80 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23dc2626 fillOpacity=0.03%3E%3Cpath d=M40 40c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8zm0-32c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8zm32 32c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8z/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />

      <main className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8 bg-gradient-to-r from-black/60 via-gray-900/60 to-black/60 backdrop-blur-xl rounded-2xl p-6 border border-red-600/30 shadow-2xl shadow-red-600/20">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src="/js-retrogames-logo.png"
                alt="J.S RetroGames"
                className="w-16 h-16 object-contain drop-shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent rounded-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
                J.S_RetroGames
              </h1>
              <p className="text-sm text-gray-300 font-medium">🎮 Servidor Premium • Sistema Real • Live Action</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="border-yellow-500/60 text-yellow-400 bg-yellow-500/10 shadow-lg">
              <Users className="w-3 h-3 mr-1" />🔥 {onlineUsers} Gamers
            </Badge>

            {currentUser?.isAdmin && (
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => setShowAdminPanel(true)}
                  variant="outline"
                  size="sm"
                  className="border-red-500/60 text-red-400 hover:bg-red-500/20 bg-red-500/10 shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <Shield className="w-4 h-4 mr-1" />👑 Admin ({pendingUsers.length})
                </Button>
                <Button
                  onClick={() => setShowROMUploader(true)}
                  variant="outline"
                  size="sm"
                  className="border-blue-500/60 text-blue-400 hover:bg-blue-500/20 bg-blue-500/10 shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <Upload className="w-4 h-4 mr-1" />📁 Upload ROMs
                </Button>
              </div>
            )}

            <div className="flex items-center space-x-3 bg-gradient-to-r from-black/40 to-gray-900/40 rounded-xl p-3 border border-yellow-500/30">
              <Avatar className="w-10 h-10 border-2 border-yellow-500/60 shadow-lg">
                <AvatarFallback className="bg-gradient-to-r from-yellow-500 to-red-500 text-black font-bold text-lg">
                  {currentUser?.isAdmin ? "👑" : "🎮"}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-bold text-yellow-400">{currentUser?.name}</p>
                <p className="text-xs text-gray-300">{currentUser?.isAdmin ? "🔥 Administrador" : "⚡ Gamer"}</p>
              </div>
            </div>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-600/60 text-red-400 hover:bg-red-600/20 bg-red-600/10 shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              🚪 Sair
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="🔍 Buscar jogos retrô..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 bg-gradient-to-r from-black/60 to-gray-900/60 border-2 border-red-600/40 text-white placeholder:text-gray-400 focus:border-yellow-500/60 shadow-inner backdrop-blur-sm h-12 text-lg"
            />
          </div>

          <Tabs value={selectedConsole} onValueChange={setSelectedConsole}>
            <TabsList className="bg-gradient-to-r from-black/60 to-gray-900/60 border-2 border-red-600/40 shadow-lg backdrop-blur-sm h-12">
              <TabsTrigger
                value="Todos"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-red-500 data-[state=active]:text-black font-bold transition-all duration-300"
              >
                🎯 Todos ({featuredGames.length})
              </TabsTrigger>
              {consoles.map((console) => (
                <TabsTrigger
                  key={console.name}
                  value={console.name}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-red-500 data-[state=active]:text-black font-bold transition-all duration-300"
                >
                  {console.icon} {console.name} ({console.count})
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {isLoadingGames ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-yellow-500 border-t-transparent mx-auto"></div>
              <p className="text-yellow-400 font-bold text-xl">🎮 Carregando Biblioteca de Jogos...</p>
              <p className="text-gray-400">Preparando sua experiência gaming premium</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {filteredGames.map((game) => (
              <Card
                key={game.id}
                className="bg-gradient-to-br from-black/80 via-gray-900/80 to-black/80 border-2 border-red-600/30 hover:border-yellow-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/20 transform hover:scale-105 backdrop-blur-sm"
              >
                <CardHeader className="pb-2">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={game.image || "/placeholder.svg"}
                      alt={game.title || game.name}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <CardTitle className="text-lg text-yellow-400 line-clamp-1 font-bold drop-shadow-lg">
                    {game.title || game.name}
                  </CardTitle>
                  <CardDescription className="text-gray-300 font-medium">
                    🎮 {game.console} • {game.genre}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current drop-shadow-lg" />
                      <span className="text-sm text-gray-300 font-bold">{game.rating}</span>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-yellow-500/60 text-yellow-400 text-xs bg-yellow-500/10 shadow-lg"
                    >
                      {game.console}
                    </Badge>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 hover:from-red-700 hover:via-red-600 hover:to-yellow-600 text-white font-bold shadow-2xl shadow-red-600/40 transform hover:scale-105 transition-all duration-300 border border-yellow-500/30"
                        onClick={() => setSelectedGame(game)}
                      >
                        <Play className="w-4 h-4 mr-2" />🚀 JOGAR AGORA
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl bg-gradient-to-br from-black/95 to-gray-900/95 border-2 border-red-600/40 backdrop-blur-xl shadow-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-yellow-400 text-2xl font-bold">
                          🎮 {game.title || game.name}
                        </DialogTitle>
                        <DialogDescription className="text-gray-300 font-medium">
                          {game.console} • {game.genre} • 🔥 Sistema de Emulação Real
                        </DialogDescription>
                      </DialogHeader>
                      {selectedGame && <GamePlayer game={selectedGame} />}
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <CloudServerStatus />
          <DeviceCompatibility />
          <InstallationGuide />
        </div>

        <div className="mb-8">
          <ROMDocumentation />
        </div>
      </main>

      <Dialog open={showAdminPanel} onOpenChange={setShowAdminPanel}>
        <DialogContent className="max-w-4xl bg-gradient-to-br from-black/95 to-gray-900/95 border-2 border-red-600/40 backdrop-blur-xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-yellow-400 text-2xl font-bold">👑 Painel Administrativo</DialogTitle>
            <DialogDescription className="text-gray-300 font-medium">
              🛡️ Gerenciar usuários e aprovações do sistema
            </DialogDescription>
          </DialogHeader>
          <AdminPanel
            pendingUsers={pendingUsers}
            approvedUsers={approvedUsers}
            onApproveUser={handleApproveUser}
            onRejectUser={handleRejectUser}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showROMUploader} onOpenChange={setShowROMUploader}>
        <DialogContent className="max-w-4xl bg-gradient-to-br from-black/95 to-gray-900/95 border-2 border-red-600/40 backdrop-blur-xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-yellow-400 text-2xl font-bold">📁 Upload de ROMs</DialogTitle>
            <DialogDescription className="text-gray-300 font-medium">
              🚀 Adicionar novos jogos ao sistema com URLs reais
            </DialogDescription>
          </DialogHeader>
          <ROMUploader />
        </DialogContent>
      </Dialog>
    </div>
  )
}
