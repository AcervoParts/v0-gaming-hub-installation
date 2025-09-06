"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, File, ImageIcon, Link, AlertCircle, CheckCircle, ExternalLink, Database } from "lucide-react"

interface ROMUpload {
  title: string
  console: string
  genre: string
  description: string
  romFile: File | null
  imageFile: File | null
  romUrl: string
  imageUrl: string
  rating: number
}

const consoles = [
  "SNES",
  "N64",
  "PS1",
  "PS2",
  "Xbox 360",
  "GameBoy",
  "GBA",
  "NDS",
  "Genesis",
  "Master System",
  "Atari 2600",
  "NES",
  "Game Gear",
  "PSP",
]

const genres = [
  "Ação",
  "Aventura",
  "RPG",
  "Plataforma",
  "Corrida",
  "Esporte",
  "Luta",
  "Puzzle",
  "Estratégia",
  "FPS",
  "Terror",
  "Simulação",
  "Arcade",
  "Beat 'em Up",
  "Shoot 'em Up",
  "Visual Novel",
]

const romCollections = {
  SNES: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/",
  N64: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/",
  PS1: "https://archive.org/download/chd_psx/",
  PS2: "https://archive.org/download/chd_ps2/",
  NES: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%20Entertainment%20System/",
  GameBoy: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Game%20Boy/",
  GBA: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Game%20Boy%20Advance/",
}

export default function ROMUploader() {
  const [uploadData, setUploadData] = useState<ROMUpload>({
    title: "",
    console: "",
    genre: "",
    description: "",
    romFile: null,
    imageFile: null,
    romUrl: "",
    imageUrl: "",
    rating: 4.0,
  })
  const [uploadMethod, setUploadMethod] = useState<"file" | "url">("url")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [uploadedRoms, setUploadedRoms] = useState<any[]>([])

  const validateRomFile = (file: File): boolean => {
    const validExtensions = [
      ".zip",
      ".rar",
      ".smc",
      ".sfc",
      ".n64",
      ".z64",
      ".bin",
      ".cue",
      ".iso",
      ".chd",
      ".nes",
      ".gb",
      ".gba",
    ]
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf("."))
    return validExtensions.includes(fileExtension)
  }

  const validateImageFile = (file: File): boolean => {
    const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"]
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf("."))
    return validExtensions.includes(fileExtension) && file.size <= 5 * 1024 * 1024 // 5MB limit
  }

  const handleFileChange = (type: "rom" | "image", file: File | null) => {
    if (file) {
      if (type === "rom" && !validateRomFile(file)) {
        alert("Formato de ROM não suportado. Use: ZIP, RAR, SMC, SFC, N64, Z64, BIN, CUE, ISO, CHD, NES, GB, GBA")
        return
      }
      if (type === "image" && !validateImageFile(file)) {
        alert("Formato de imagem não suportado ou arquivo muito grande (máx. 5MB). Use: JPG, PNG, GIF, WebP")
        return
      }
    }

    setUploadData((prev) => ({
      ...prev,
      [type === "rom" ? "romFile" : "imageFile"]: file,
    }))
  }

  const handleUrlChange = (type: "rom" | "image", url: string) => {
    setUploadData((prev) => ({
      ...prev,
      [type === "rom" ? "romUrl" : "imageUrl"]: url,
    }))
  }

  const validateForm = () => {
    if (!uploadData.title || !uploadData.console || !uploadData.genre) {
      return false
    }

    if (uploadMethod === "file") {
      return uploadData.romFile !== null
    } else {
      // Basic URL validation
      try {
        new URL(uploadData.romUrl)
        return uploadData.romUrl !== ""
      } catch {
        return false
      }
    }
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("Preencha todos os campos obrigatórios e verifique se a URL é válida")
      return
    }

    setIsUploading(true)
    setUploadStatus("idle")

    try {
      console.log("[v0] Iniciando upload de ROM:", uploadData.title)

      // Simulate upload progress
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create ROM entry
      const newRom = {
        id: Date.now(),
        title: uploadData.title,
        console: uploadData.console,
        genre: uploadData.genre,
        description: uploadData.description,
        rating: uploadData.rating,
        image:
          uploadData.imageUrl ||
          uploadData.imageFile?.name ||
          "/placeholder.svg?height=200&width=300&text=" + encodeURIComponent(uploadData.title),
        rom: uploadData.romUrl || `uploaded/${uploadData.romFile?.name}`,
        fileType: uploadData.console.toLowerCase(),
        uploadDate: new Date().toISOString(),
        uploader: "admin",
      }

      const existingRoms = JSON.parse(localStorage.getItem("uploadedRoms") || "[]")
      const updatedRoms = [...existingRoms, newRom]
      localStorage.setItem("uploadedRoms", JSON.stringify(updatedRoms))
      setUploadedRoms(updatedRoms)

      console.log("[v0] ROM adicionada com sucesso:", newRom)
      setUploadStatus("success")

      // Reset form
      setUploadData({
        title: "",
        console: "",
        genre: "",
        description: "",
        romFile: null,
        imageFile: null,
        romUrl: "",
        imageUrl: "",
        rating: 4.0,
      })

      // Trigger page refresh to show new ROM
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      console.error("[v0] Erro ao fazer upload:", error)
      setUploadStatus("error")
    } finally {
      setIsUploading(false)
    }
  }

  const handleConsoleChange = (console: string) => {
    setUploadData((prev) => ({ ...prev, console }))

    // Auto-suggest collection URL
    if (romCollections[console as keyof typeof romCollections]) {
      const baseUrl = romCollections[console as keyof typeof romCollections]
      if (!uploadData.romUrl) {
        setUploadData((prev) => ({ ...prev, romUrl: baseUrl }))
      }
    }
  }

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto">
      {/* Upload Method Selection */}
      <Card className="bg-gray-900/50 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="text-yellow-400 flex items-center">
            <Database className="w-5 h-5 mr-2" />
            Método de Upload
          </CardTitle>
          <CardDescription className="text-gray-300">
            Escolha como deseja adicionar as ROMs ao sistema. URLs são recomendadas para melhor performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button
              onClick={() => setUploadMethod("url")}
              variant={uploadMethod === "url" ? "default" : "outline"}
              className={uploadMethod === "url" ? "bg-yellow-500 text-black" : "border-yellow-500/50 text-yellow-400"}
            >
              <Link className="w-4 h-4 mr-2" />
              URL (Recomendado)
            </Button>
            <Button
              onClick={() => setUploadMethod("file")}
              variant={uploadMethod === "file" ? "default" : "outline"}
              className={uploadMethod === "file" ? "bg-yellow-500 text-black" : "border-yellow-500/50 text-yellow-400"}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload de Arquivo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ROM Information */}
      <Card className="bg-gray-900/50 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="text-yellow-400">Informações do Jogo</CardTitle>
          <CardDescription className="text-gray-300">Preencha os dados básicos do jogo</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className="text-white">
                Título do Jogo *
              </Label>
              <Input
                id="title"
                value={uploadData.title}
                onChange={(e) => setUploadData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Ex: Super Mario World"
                className="bg-gray-800/50 border-gray-600 text-white"
              />
            </div>

            <div>
              <Label htmlFor="console" className="text-white">
                Console *
              </Label>
              <Select value={uploadData.console} onValueChange={handleConsoleChange}>
                <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                  <SelectValue placeholder="Selecione o console" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {consoles.map((console) => (
                    <SelectItem key={console} value={console} className="text-white">
                      {console}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="genre" className="text-white">
                Gênero *
              </Label>
              <Select
                value={uploadData.genre}
                onValueChange={(value) => setUploadData((prev) => ({ ...prev, genre: value }))}
              >
                <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                  <SelectValue placeholder="Selecione o gênero" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre} className="text-white">
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="rating" className="text-white">
                Avaliação (1-5)
              </Label>
              <Input
                id="rating"
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={uploadData.rating}
                onChange={(e) =>
                  setUploadData((prev) => ({ ...prev, rating: Number.parseFloat(e.target.value) || 4.0 }))
                }
                className="bg-gray-800/50 border-gray-600 text-white"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-white">
              Descrição
            </Label>
            <Textarea
              id="description"
              value={uploadData.description}
              onChange={(e) => setUploadData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Descrição opcional do jogo..."
              className="bg-gray-800/50 border-gray-600 text-white"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* ROM Upload */}
      <Card className="bg-gray-900/50 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="text-yellow-400">ROM do Jogo</CardTitle>
          <CardDescription className="text-gray-300">
            {uploadMethod === "url"
              ? "Forneça a URL da ROM (recomendado: Internet Archive)"
              : "Faça upload do arquivo ROM"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {uploadMethod === "url" ? (
            <div>
              <Label htmlFor="romUrl" className="text-white">
                URL da ROM *
              </Label>
              <Input
                id="romUrl"
                value={uploadData.romUrl}
                onChange={(e) => handleUrlChange("rom", e.target.value)}
                placeholder="https://archive.org/download/..."
                className="bg-gray-800/50 border-gray-600 text-white"
              />
              {uploadData.console && romCollections[uploadData.console as keyof typeof romCollections] && (
                <div className="mt-2 p-3 bg-blue-900/20 border border-blue-500/20 rounded-lg">
                  <p className="text-xs text-blue-300 mb-2">
                    <strong>Coleção sugerida para {uploadData.console}:</strong>
                  </p>
                  <div className="flex items-center space-x-2">
                    <code className="text-xs text-blue-200 bg-blue-900/30 px-2 py-1 rounded flex-1">
                      {romCollections[uploadData.console as keyof typeof romCollections]}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        window.open(romCollections[uploadData.console as keyof typeof romCollections], "_blank")
                      }
                      className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <Label htmlFor="romFile" className="text-white">
                Arquivo ROM *
              </Label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-yellow-500/50 transition-colors">
                <File className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400 mb-2">Arraste o arquivo ROM aqui ou clique para selecionar</p>
                <Input
                  id="romFile"
                  type="file"
                  accept=".zip,.rar,.smc,.sfc,.n64,.z64,.bin,.cue,.iso,.chd,.nes,.gb,.gba"
                  onChange={(e) => handleFileChange("rom", e.target.files?.[0] || null)}
                  className="bg-gray-800/50 border-gray-600 text-white"
                />
                {uploadData.romFile && (
                  <Badge className="mt-2 bg-green-600">
                    {uploadData.romFile.name} ({(uploadData.romFile.size / 1024 / 1024).toFixed(2)} MB)
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Image Upload */}
      <Card className="bg-gray-900/50 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="text-yellow-400">Imagem do Jogo</CardTitle>
          <CardDescription className="text-gray-300">
            {uploadMethod === "url" ? "URL da imagem de capa (opcional)" : "Upload da imagem de capa (opcional)"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {uploadMethod === "url" ? (
            <div>
              <Label htmlFor="imageUrl" className="text-white">
                URL da Imagem
              </Label>
              <Input
                id="imageUrl"
                value={uploadData.imageUrl}
                onChange={(e) => handleUrlChange("image", e.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
                className="bg-gray-800/50 border-gray-600 text-white"
              />
              {uploadData.imageUrl && (
                <div className="mt-2">
                  <img
                    src={uploadData.imageUrl || "/placeholder.svg"}
                    alt="Preview"
                    className="w-32 h-24 object-cover rounded border border-gray-600"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).style.display = "none"
                    }}
                  />
                </div>
              )}
            </div>
          ) : (
            <div>
              <Label htmlFor="imageFile" className="text-white">
                Arquivo de Imagem
              </Label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-yellow-500/50 transition-colors">
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-400 mb-2">Arraste a imagem aqui ou clique para selecionar</p>
                <Input
                  id="imageFile"
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif,.webp"
                  onChange={(e) => handleFileChange("image", e.target.files?.[0] || null)}
                  className="bg-gray-800/50 border-gray-600 text-white"
                />
                {uploadData.imageFile && (
                  <Badge className="mt-2 bg-green-600">
                    {uploadData.imageFile.name} ({(uploadData.imageFile.size / 1024).toFixed(1)} KB)
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Card className="bg-gray-900/50 border-yellow-500/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {uploadStatus === "success" && (
                <>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-green-400">ROM adicionada com sucesso! Recarregando...</span>
                </>
              )}
              {uploadStatus === "error" && (
                <>
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <span className="text-red-400">Erro ao adicionar ROM. Tente novamente.</span>
                </>
              )}
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!validateForm() || isUploading}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold"
            >
              {isUploading ? (
                <>
                  <Upload className="w-4 h-4 mr-2 animate-spin" />
                  Adicionando...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Adicionar ROM ao Sistema
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Instructions */}
      <Card className="bg-blue-900/20 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-blue-400">📋 Instruções e URLs Recomendadas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-gray-300">
          <div>
            <p className="font-semibold text-blue-300 mb-2">🌐 URLs Base Recomendadas (Internet Archive):</p>
            <div className="space-y-1 ml-4">
              <p>
                • <strong>SNES:</strong>{" "}
                <code className="text-xs bg-gray-800 px-1 rounded">
                  https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/
                </code>
              </p>
              <p>
                • <strong>N64:</strong>{" "}
                <code className="text-xs bg-gray-800 px-1 rounded">
                  https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/
                </code>
              </p>
              <p>
                • <strong>PS1:</strong>{" "}
                <code className="text-xs bg-gray-800 px-1 rounded">https://archive.org/download/chd_psx/</code>
              </p>
            </div>
          </div>
          <div>
            <p className="font-semibold text-blue-300 mb-2">⚙️ Para Implementar ROMs Reais:</p>
            <div className="space-y-1 ml-4">
              <p>
                • <strong>EmulatorJS</strong> para emulação web (já integrado)
              </p>
              <p>
                • <strong>RetroArch</strong> compilado para WebAssembly
              </p>
              <p>
                • <strong>CORS configurado</strong> para carregar ROMs externas
              </p>
            </div>
          </div>
          <div>
            <p className="font-semibold text-blue-300 mb-2">📝 Requisitos:</p>
            <div className="space-y-1 ml-4">
              <p>
                • <strong>Formatos:</strong> ZIP, RAR, SMC, SFC, N64, Z64, BIN, CUE, ISO, CHD
              </p>
              <p>
                • <strong>Imagens:</strong> JPG, PNG, GIF, WebP (máx. 5MB, recomendado: 300x200px)
              </p>
              <p>
                • <strong>Legalidade:</strong> Certifique-se de possuir os direitos das ROMs
              </p>
              <p>
                • <strong>Teste:</strong> Verifique se as ROMs funcionam antes de adicionar
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
