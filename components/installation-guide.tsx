"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Smartphone, Monitor, Tv, Share, Plus, CheckCircle, Crown } from "lucide-react"

export default function InstallationGuide() {
  const handleInstallPWA = () => {
    if ("serviceWorker" in navigator) {
      console.log("[v0] Instalando PWA...")
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "J.S Gaming Hub",
        text: "Servidor de jogos retrô online",
        url: window.location.href,
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-yellow-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-yellow-400">
            <Download className="w-5 h-5 mr-2" />
            Guia de Instalação
          </CardTitle>
          <CardDescription className="text-gray-300">
            Instale o J.S Gaming Hub em seus dispositivos para acesso rápido
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="mobile" className="space-y-4">
        <TabsList className="bg-gray-900/50 border border-yellow-500/30 grid w-full grid-cols-4">
          <TabsTrigger value="mobile" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
            Mobile
          </TabsTrigger>
          <TabsTrigger value="desktop" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
            Desktop
          </TabsTrigger>
          <TabsTrigger value="tv" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
            Smart TV
          </TabsTrigger>
          <TabsTrigger value="pwa" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
            PWA
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mobile" className="space-y-4">
          <Card className="bg-gray-900/50 border-yellow-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-400">
                <Smartphone className="w-5 h-5 mr-2" />
                Instalação Mobile (iOS/Android)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-black/30 rounded-lg border border-yellow-500/20">
                  <h3 className="font-semibold mb-3 flex items-center text-yellow-400">📱 iPhone/iPad</h3>
                  <ol className="space-y-2 text-sm">
                    {[
                      "Abra o Safari e acesse o gaming hub",
                      "Toque no botão de compartilhar (📤)",
                      'Selecione "Adicionar à Tela Inicial"',
                      "Confirme a instalação",
                    ].map((step, index) => (
                      <li key={index} className="flex items-start text-gray-300">
                        <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5 font-bold">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="p-4 bg-black/30 rounded-lg border border-yellow-500/20">
                  <h3 className="font-semibold mb-3 flex items-center text-yellow-400">🤖 Android</h3>
                  <ol className="space-y-2 text-sm">
                    {[
                      "Abra o Chrome e acesse o gaming hub",
                      "Toque nos 3 pontos (⋮) no menu",
                      'Selecione "Adicionar à tela inicial"',
                      "Confirme a instalação",
                    ].map((step, index) => (
                      <li key={index} className="flex items-start text-gray-300">
                        <span className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5 font-bold">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={handleInstallPWA}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Instalar App
                </Button>
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 bg-transparent"
                >
                  <Share className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="desktop" className="space-y-4">
          <Card className="bg-gray-900/50 border-yellow-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-400">
                <Monitor className="w-5 h-5 mr-2" />
                Instalação Desktop
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-black/30 rounded-lg border border-yellow-500/20">
                  <h3 className="font-semibold mb-3 text-yellow-400">🖥️ Windows/Mac/Linux</h3>
                  <ol className="space-y-2 text-sm">
                    {[
                      "Abra Chrome, Edge ou Firefox",
                      "Acesse o gaming hub",
                      "Clique no ícone de instalação na barra de endereços",
                      "Confirme a instalação como app",
                    ].map((step, index) => (
                      <li key={index} className="flex items-start text-gray-300">
                        <CheckCircle className="w-4 h-4 text-yellow-400 mr-2 mt-0.5" />
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="p-4 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-lg border border-yellow-500/30">
                  <h3 className="font-semibold mb-3 text-yellow-400">⌨️ Atalhos de Teclado</h3>
                  <div className="space-y-2 text-sm">
                    {[
                      { action: "Buscar jogos:", key: "Ctrl + F" },
                      { action: "Tela cheia:", key: "F11" },
                      { action: "Voltar:", key: "Esc" },
                      { action: "Pausar jogo:", key: "Space" },
                    ].map((shortcut, index) => (
                      <div key={index} className="flex justify-between text-gray-300">
                        <span>{shortcut.action}</span>
                        <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                          {shortcut.key}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tv" className="space-y-4">
          <Card className="bg-gray-900/50 border-yellow-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-yellow-400">
                <Tv className="w-5 h-5 mr-2" />
                Smart TV & Gaming Hub
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-black/30 rounded-lg border border-yellow-500/20">
                  <h3 className="font-semibold mb-3 text-yellow-400">📺 Smart TV Android</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Abra o navegador da TV</li>
                    <li>• Acesse o gaming hub</li>
                    <li>• Use o controle remoto para navegar</li>
                    <li>• Conecte gamepad Bluetooth para melhor experiência</li>
                  </ul>
                </div>

                <div className="p-4 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-lg border border-yellow-500/30">
                  <h3 className="font-semibold mb-3 text-yellow-400 flex items-center">
                    <Crown className="w-4 h-4 mr-1" />🎮 Samsung Gaming Hub
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Acesse o Gaming Hub na TV</li>
                    <li>• Abra o navegador web</li>
                    <li>• Navegue até o gaming hub</li>
                    <li>• Ative o modo gaming para menor latência</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-500/10 to-transparent p-4 rounded-lg border border-yellow-500/30">
                <h4 className="font-semibold mb-2 text-yellow-400">💡 Dicas para TV</h4>
                <ul className="text-sm space-y-1 text-gray-300">
                  <li>• Use controles Bluetooth para melhor jogabilidade</li>
                  <li>• Ative o modo jogo da TV para reduzir input lag</li>
                  <li>• Conecte via cabo ethernet para conexão mais estável</li>
                  <li>• Ajuste o zoom do navegador se necessário</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pwa" className="space-y-4">
          <Card className="bg-gray-900/50 border-yellow-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-yellow-400">Progressive Web App (PWA)</CardTitle>
              <CardDescription className="text-gray-300">
                Instale como aplicativo nativo para melhor performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    icon: Download,
                    title: "Instalação Offline",
                    desc: "Funciona sem internet após instalação",
                    color: "text-blue-400",
                  },
                  {
                    icon: Monitor,
                    title: "App Nativo",
                    desc: "Comporta-se como app instalado",
                    color: "text-green-400",
                  },
                  {
                    icon: CheckCircle,
                    title: "Auto-Update",
                    desc: "Atualizações automáticas",
                    color: "text-purple-400",
                  },
                ].map((feature, index) => (
                  <Card key={index} className="bg-black/50 border-yellow-500/20">
                    <CardContent className="p-4 text-center">
                      <feature.icon className={`w-8 h-8 mx-auto mb-2 ${feature.color}`} />
                      <h3 className="font-semibold text-white">{feature.title}</h3>
                      <p className="text-sm text-gray-300">{feature.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button
                onClick={handleInstallPWA}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold"
                size="lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Instalar J.S Gaming Hub
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
