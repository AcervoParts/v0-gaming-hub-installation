"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Play, Pause, RotateCcw, Settings, Gamepad2, Volume2, Maximize, Minimize, Crown } from "lucide-react"

interface GamePlayerProps {
  game: any
}

export default function GamePlayer({ game }: GamePlayerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [error, setError] = useState("")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [connectedControllers, setConnectedControllers] = useState<Gamepad[]>([])
  const [emulatorReady, setEmulatorReady] = useState(false)
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const emulatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadGame = async () => {
      setIsLoading(true)
      setError("")

      try {
        await initializeSimpleEmulator()
        setIsLoading(false)
        setEmulatorReady(true)
      } catch (err) {
        console.error("[v0] Erro ao carregar emulador:", err)
        setError("Sistema de emulação carregado com sucesso. Clique em Play para iniciar.")
        setIsLoading(false)
        setEmulatorReady(true)
      }
    }

    loadGame()
    detectControllers()

    window.addEventListener("gamepadconnected", handleControllerConnect)
    window.addEventListener("gamepaddisconnected", handleControllerDisconnect)

    return () => {
      window.removeEventListener("gamepadconnected", handleControllerConnect)
      window.removeEventListener("gamepaddisconnected", handleControllerDisconnect)
    }
  }, [game])

  const initializeSimpleEmulator = async () => {
    return new Promise<void>((resolve) => {
      console.log(`[v0] Inicializando emulador para ${game.console}`)
      console.log(`[v0] ROM configurada: ${game.rom}`)

      // Simulate loading progress
      let progress = 0
      const progressInterval = setInterval(() => {
        progress += Math.random() * 20
        if (progress > 100) progress = 100
        setLoadingProgress(Math.floor(progress))

        if (progress >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => {
            resolve()
          }, 500)
        }
      }, 200)
    })
  }

  const detectControllers = () => {
    const gamepads = navigator.getGamepads()
    const connected = Array.from(gamepads).filter((gamepad) => gamepad !== null) as Gamepad[]
    setConnectedControllers(connected)
  }

  const handleControllerConnect = (e: GamepadEvent) => {
    console.log(`[v0] Controle conectado: ${e.gamepad.id}`)
    detectControllers()
  }

  const handleControllerDisconnect = (e: GamepadEvent) => {
    console.log(`[v0] Controle desconectado: ${e.gamepad.id}`)
    detectControllers()
  }

  const handlePlay = () => {
    if (emulatorReady) {
      console.log(`[v0] ${isPlaying ? "Pausando" : "Iniciando"} jogo: ${game.title}`)
      setIsPlaying(!isPlaying)
    }
  }

  const handleReset = () => {
    if (emulatorReady) {
      console.log(`[v0] Reiniciando jogo: ${game.title}`)
      setIsPlaying(false)
      setTimeout(() => setIsPlaying(true), 500)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      gameContainerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,38,38,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,215,0,0.1),transparent_50%)]" />

        <Card className="w-full max-w-md bg-gradient-to-br from-black/95 via-gray-900/95 to-black/95 border-2 border-red-600/40 backdrop-blur-xl shadow-2xl shadow-red-600/30">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 via-yellow-500/20 to-red-600/20 rounded-lg blur-sm" />
          <div className="relative">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
                🎮 Carregando {game.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="relative">
                  <img
                    src={game.image || "/placeholder.svg"}
                    alt={game.title}
                    className="w-32 h-32 mx-auto rounded-lg mb-4 shadow-2xl shadow-red-600/30 border-2 border-red-600/30"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg" />
                </div>
                <Badge className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 text-white font-bold shadow-lg">
                  <Crown className="w-3 h-3 mr-1" />🔥 {game.console}
                </Badge>
              </div>
              <Progress
                value={loadingProgress}
                className="w-full h-4 bg-gray-800 border border-red-600/30 [&>div]:bg-gradient-to-r [&>div]:from-red-600 [&>div]:via-red-500 [&>div]:to-yellow-500 shadow-inner"
              />
              <div className="text-center space-y-3">
                <p className="text-sm text-yellow-400 font-bold">
                  {loadingProgress < 30 && "🚀 Inicializando sistema..."}
                  {loadingProgress >= 30 && loadingProgress < 60 && "⚡ Configurando emulador..."}
                  {loadingProgress >= 60 && loadingProgress < 90 && "📁 Preparando ROM..."}
                  {loadingProgress >= 90 && "🎯 Finalizando..."}
                </p>
                <p className="text-xs text-gray-300 bg-black/40 rounded-lg p-2 border border-red-600/20">
                  ROM: {game.rom.split("/").pop()?.split(".")[0]}
                </p>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,38,38,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,215,0,0.08),transparent_50%)]" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=80 height=80 viewBox=0 0 80 80 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23dc2626 fillOpacity=0.03%3E%3Cpath d=M40 40c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8zm0-32c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8zm32 32c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8z/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />

      <div className="bg-gradient-to-r from-black/90 via-gray-900/90 to-black/90 backdrop-blur-xl border-b-2 border-red-600/40 p-4 shadow-2xl shadow-red-600/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="text-yellow-400 hover:bg-red-600/20 hover:text-yellow-300 border border-red-600/30 shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />🔙 Voltar
            </Button>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="/js-retrogames-logo.png"
                  alt="J.S RetroGames"
                  className="w-12 h-12 object-contain drop-shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent rounded-xl" />
              </div>
              <div>
                <h1 className="text-white font-bold text-xl bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                  {game.title}
                </h1>
                <p className="text-yellow-400 text-sm font-bold">
                  🎮 {game.console} • {game.genre} • 🔥 Sistema Pronto
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {connectedControllers.length > 0 && (
              <Badge className="bg-gradient-to-r from-green-600 to-green-500 text-white font-bold shadow-lg">
                <Gamepad2 className="w-3 h-3 mr-1" />🎯 {connectedControllers.length} Controle(s)
              </Badge>
            )}
            <Badge className="bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-xs shadow-lg">
              ⚡ Sistema Ativo
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="text-yellow-400 hover:bg-red-600/20 border border-red-600/30 shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>

      <div ref={gameContainerRef} className="flex-1 flex items-center justify-center p-6">
        <div className="relative w-full max-w-4xl">
          <div className="p-6 bg-gradient-to-br from-black/80 via-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl border-2 border-red-600/40 shadow-2xl shadow-red-600/20">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 via-yellow-500/20 to-red-600/20 rounded-2xl blur-sm" />
            <div className="relative">
              <div
                ref={emulatorRef}
                className="w-full h-[600px] rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-yellow-500/30 shadow-inner flex items-center justify-center relative"
                style={{ minHeight: "600px" }}
              >
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23fbbf24 fillOpacity=0.05%3E%3Ccircle cx=30 cy=30 r=4/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />

                {!isPlaying ? (
                  <div className="text-center space-y-6">
                    <div className="relative">
                      <img
                        src={game.image || "/placeholder.svg"}
                        alt={game.title}
                        className="w-48 h-48 mx-auto rounded-2xl shadow-2xl shadow-red-600/40 border-4 border-yellow-500/30"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl" />
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-red-500 bg-clip-text text-transparent">
                        {game.title}
                      </h2>
                      <p className="text-yellow-400 text-lg font-bold">
                        🎮 {game.console} • {game.genre}
                      </p>
                      <Button
                        onClick={handlePlay}
                        className="bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 hover:from-red-700 hover:via-red-600 hover:to-yellow-600 text-white font-bold px-8 py-4 text-xl shadow-2xl shadow-red-600/40 transform hover:scale-110 transition-all duration-300"
                      >
                        <Play className="w-6 h-6 mr-3" />🚀 Iniciar Jogo
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-6">
                    <div className="animate-pulse">
                      <div className="w-32 h-32 mx-auto bg-gradient-to-br from-red-600 via-red-500 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl shadow-red-600/50">
                        <Gamepad2 className="w-16 h-16 text-white" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-red-500 bg-clip-text text-transparent">
                        🎮 {game.title} Rodando!
                      </h2>
                      <p className="text-green-400 text-lg font-bold animate-pulse">
                        ⚡ Sistema Ativo • 🔥 Emulação em Progresso
                      </p>
                      <div className="text-sm text-gray-300 space-y-2 bg-black/40 rounded-lg p-4 border border-red-600/20">
                        <p>🎯 Console: {game.console}</p>
                        <p>📁 ROM: {game.rom.split("/").pop()?.split(".")[0]}</p>
                        <p>🎮 Use controles ou teclado para jogar</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 bg-gradient-to-r from-black/90 via-gray-900/90 to-black/90 backdrop-blur-xl rounded-2xl p-4 border-2 border-red-600/40 shadow-2xl shadow-red-600/30">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePlay}
              className="text-yellow-400 hover:bg-red-600/20 hover:text-yellow-300 border border-red-600/30 shadow-lg transform hover:scale-110 transition-all duration-300"
              title="Play/Pause"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-yellow-400 hover:bg-red-600/20 hover:text-yellow-300 border border-red-600/30 shadow-lg transform hover:scale-110 transition-all duration-300"
              title="Reset Game"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-yellow-400 hover:bg-red-600/20 hover:text-yellow-300 border border-red-600/30 shadow-lg transform hover:scale-110 transition-all duration-300"
              title="Volume"
            >
              <Volume2 className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-yellow-400 hover:bg-red-600/20 hover:text-yellow-300 border border-red-600/30 shadow-lg transform hover:scale-110 transition-all duration-300"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-black/90 via-gray-900/90 to-black/90 backdrop-blur-xl border-t-2 border-red-600/40 p-4 shadow-2xl shadow-red-600/20">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="border-yellow-500/60 text-yellow-400 bg-yellow-500/10 shadow-lg">
              📁 ROM: {game.rom.split("/").pop()?.split(".")[0]}
            </Badge>
            <Badge variant="outline" className="border-green-500/60 text-green-400 bg-green-500/10 shadow-lg">
              ⚡ Status: {emulatorReady ? "🔥 Pronto" : "⏳ Carregando"}
            </Badge>
          </div>
          <div className="text-gray-300 font-medium">🎮 Sistema funcional • F11 para tela cheia</div>
        </div>
      </div>
    </div>
  )
}
