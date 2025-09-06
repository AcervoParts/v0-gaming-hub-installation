"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { ExternalLink, Shield, Code, Database, Gamepad2, Crown, AlertTriangle, CheckCircle, Globe } from "lucide-react"

export default function ROMDocumentation() {
  const romSources = [
    {
      name: "Internet Archive",
      url: "https://archive.org/download/",
      status: "Recomendado",
      description: "Coleção legal e verificada de ROMs preservadas",
      color: "bg-gradient-to-r from-green-500 to-green-600",
      collections: [
        {
          console: "SNES",
          url: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/",
          example: "Chrono%20Trigger%20%28USA%29.zip",
        },
        {
          console: "N64",
          url: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/",
          example: "Super%20Mario%2064%20%28USA%29.z64",
        },
        {
          console: "PS1",
          url: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Sony%20-%20PlayStation/",
          example: "Final%20Fantasy%20VII%20%28USA%29.bin",
        },
      ],
    },
  ]

  const emulatorLibraries = [
    {
      name: "EmulatorJS",
      description: "Biblioteca JavaScript moderna para emulação web",
      features: ["Múltiplos consoles", "Interface customizável", "Controles web"],
      installation: "npm install emulatorjs",
      status: "Recomendado",
    },
    {
      name: "RetroArch (WebAssembly)",
      description: "Emulador de alta qualidade compilado para web",
      features: ["Cores libretro", "Shaders avançados", "Save states"],
      installation: "Compilação WebAssembly necessária",
      status: "Avançado",
    },
    {
      name: "JSNES",
      description: "Emulador NES puro em JavaScript",
      features: ["NES específico", "Leve", "Fácil integração"],
      installation: "npm install jsnes",
      status: "Específico",
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-yellow-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-yellow-400">
            <Database className="w-5 h-5 mr-2" />
            Documentação de ROMs e Emulação
          </CardTitle>
          <CardDescription className="text-gray-300">
            Guia completo para implementação de emulação real e fontes legais de ROMs
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="roms" className="space-y-4">
        <TabsList className="bg-gray-900/50 border border-yellow-500/30 grid w-full grid-cols-4">
          <TabsTrigger value="roms" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
            ROMs Legais
          </TabsTrigger>
          <TabsTrigger value="emulators" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
            Emuladores
          </TabsTrigger>
          <TabsTrigger
            value="implementation"
            className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black"
          >
            Implementação
          </TabsTrigger>
          <TabsTrigger value="legal" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
            Legal
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roms" className="space-y-4">
          <Card className="bg-gray-900/50 border-yellow-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-400">
                <Globe className="w-5 h-5 mr-2" />
                URLs Base para ROMs Legais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {romSources.map((source, index) => (
                <div key={index} className="p-4 bg-black/30 rounded-lg border border-yellow-500/20">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-white flex items-center">
                      <Crown className="w-4 h-4 mr-2 text-yellow-400" />
                      {source.name}
                    </h3>
                    <Badge className={source.color}>{source.status}</Badge>
                  </div>

                  <p className="text-gray-300 mb-4">{source.description}</p>

                  <div className="space-y-3">
                    <div className="p-3 bg-gray-800/50 rounded border border-yellow-500/10">
                      <p className="text-sm text-yellow-400 font-mono">Base URL:</p>
                      <code className="text-green-400 text-sm">{source.url}</code>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {source.collections.map((collection, idx) => (
                        <div key={idx} className="p-3 bg-black/40 rounded border border-yellow-500/10">
                          <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 mb-2">
                            {collection.console}
                          </Badge>
                          <p className="text-xs text-gray-400 mb-2">Exemplo:</p>
                          <code className="text-xs text-green-400 break-all">
                            {collection.url}
                            {collection.example}
                          </code>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="mt-4 border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 bg-transparent"
                    onClick={() => window.open(source.url, "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visitar {source.name}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emulators" className="space-y-4">
          <Card className="bg-gray-900/50 border-yellow-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-400">
                <Gamepad2 className="w-5 h-5 mr-2" />
                Bibliotecas de Emulação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {emulatorLibraries.map((lib, index) => (
                <Card key={index} className="bg-black/50 border-yellow-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-white">{lib.name}</h3>
                      <Badge
                        className={
                          lib.status === "Recomendado"
                            ? "bg-gradient-to-r from-green-500 to-green-600"
                            : lib.status === "Avançado"
                              ? "bg-gradient-to-r from-purple-500 to-purple-600"
                              : "bg-gradient-to-r from-blue-500 to-blue-600"
                        }
                      >
                        {lib.status}
                      </Badge>
                    </div>

                    <p className="text-gray-300 mb-3">{lib.description}</p>

                    <div className="mb-3">
                      <p className="text-sm text-yellow-400 mb-2">Características:</p>
                      <div className="flex flex-wrap gap-2">
                        {lib.features.map((feature, idx) => (
                          <Badge key={idx} variant="outline" className="border-yellow-500/30 text-gray-300">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-gray-800/50 rounded border border-yellow-500/10">
                      <p className="text-sm text-yellow-400 mb-1">Instalação:</p>
                      <code className="text-green-400 text-sm">{lib.installation}</code>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="implementation" className="space-y-4">
          <Card className="bg-gray-900/50 border-yellow-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-400">
                <Code className="w-5 h-5 mr-2" />
                Implementação Técnica
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-black/30 rounded-lg border border-yellow-500/20">
                <h3 className="font-semibold mb-3 text-yellow-400">1. Configuração CORS</h3>
                <div className="p-3 bg-gray-800/50 rounded border border-yellow-500/10">
                  <pre className="text-sm text-green-400 overflow-x-auto">
                    {`// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
        ],
      },
    ]
  },
}`}
                  </pre>
                </div>
              </div>

              <div className="p-4 bg-black/30 rounded-lg border border-yellow-500/20">
                <h3 className="font-semibold mb-3 text-yellow-400">2. Componente de Emulador</h3>
                <div className="p-3 bg-gray-800/50 rounded border border-yellow-500/10">
                  <pre className="text-sm text-green-400 overflow-x-auto">
                    {`// components/emulator.tsx
import { useEffect, useRef } from 'react'

interface EmulatorProps {
  romUrl: string
  console: string
}

export default function Emulator({ romUrl, console }: EmulatorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (containerRef.current) {
      const emulator = new EJS_emulator(console, {
        gameUrl: romUrl,
        element: containerRef.current,
        biosUrl: \`/bios/\${console}/\`,
      })
    }
  }, [romUrl, console])
  
  return <div ref={containerRef} className="w-full h-full" />
}`}
                  </pre>
                </div>
              </div>

              <div className="p-4 bg-black/30 rounded-lg border border-yellow-500/20">
                <h3 className="font-semibold mb-3 text-yellow-400">3. Carregador de ROMs</h3>
                <div className="p-3 bg-gray-800/50 rounded border border-yellow-500/10">
                  <pre className="text-sm text-green-400 overflow-x-auto">
                    {`// lib/rom-loader.ts
export async function loadROM(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url, {
    mode: 'cors',
    headers: {
      'Accept': 'application/octet-stream',
    },
  })
  
  if (!response.ok) {
    throw new Error(\`Erro ao carregar ROM: \${response.statusText}\`)
  }
  
  return response.arrayBuffer()
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="legal" className="space-y-4">
          <Card className="bg-gray-900/50 border-yellow-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-400">
                <Shield className="w-5 h-5 mr-2" />
                Aspectos Legais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-green-500/30 bg-green-500/10">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <AlertDescription className="text-green-300">
                  <strong>Fontes Legais Recomendadas:</strong>
                  <ul className="mt-2 space-y-1">
                    <li>• Internet Archive - Preservação digital legal</li>
                    <li>• Dumps próprios de jogos que você possui</li>
                    <li>• Distribuidores oficiais quando disponível</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <Alert className="border-yellow-500/30 bg-yellow-500/10">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                <AlertDescription className="text-yellow-300">
                  <strong>Considerações Importantes:</strong>
                  <ul className="mt-2 space-y-1">
                    <li>• Verifique as leis de direitos autorais em sua região</li>
                    <li>• ROMs devem ser obtidas de fontes legítimas</li>
                    <li>• Este projeto é apenas para fins educacionais</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="p-4 bg-black/30 rounded-lg border border-yellow-500/20">
                <h3 className="font-semibold mb-3 text-yellow-400">Diretrizes de Uso</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5" />
                    Use apenas ROMs que você possui legalmente
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5" />
                    Prefira coleções preservadas como Internet Archive
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5" />
                    Respeite os direitos autorais dos desenvolvedores
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5" />
                    Use para fins educacionais e preservação
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
