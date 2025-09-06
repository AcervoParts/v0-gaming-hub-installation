"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Smartphone, Monitor, Tv, Gamepad2, Bluetooth, Usb, Wifi, Crown } from "lucide-react"

export default function DeviceCompatibility() {
  const devices = [
    {
      name: "iPhone/iPad",
      icon: <Smartphone className="w-6 h-6" />,
      status: "Compatível",
      features: ["Touch Controls", "Safari Browser", "PWA Support"],
      color: "bg-gradient-to-r from-green-500 to-green-600",
    },
    {
      name: "Android",
      icon: <Smartphone className="w-6 h-6" />,
      status: "Compatível",
      features: ["Touch Controls", "Chrome Browser", "PWA Support"],
      color: "bg-gradient-to-r from-green-500 to-green-600",
    },
    {
      name: "Notebooks/PC",
      icon: <Monitor className="w-6 h-6" />,
      status: "Totalmente Compatível",
      features: ["Keyboard Controls", "USB Gamepads", "Full Performance"],
      color: "bg-gradient-to-r from-yellow-500 to-yellow-600",
    },
    {
      name: "Smart TV Android",
      icon: <Tv className="w-6 h-6" />,
      status: "Compatível",
      features: ["Remote Control", "Bluetooth Gamepads", "Big Screen"],
      color: "bg-gradient-to-r from-green-500 to-green-600",
    },
    {
      name: "Samsung Gaming Hub",
      icon: <Tv className="w-6 h-6" />,
      status: "Premium",
      features: ["Gaming Mode", "Low Latency", "Controller Support"],
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
    },
  ]

  const controllers = [
    {
      name: "Controles USB",
      icon: <Usb className="w-5 h-5" />,
      description: "Xbox, PlayStation, genéricos",
      status: "Plug & Play",
    },
    {
      name: "Controles Bluetooth",
      icon: <Bluetooth className="w-5 h-5" />,
      description: "PS4, PS5, Xbox One/Series",
      status: "Pareamento automático",
    },
    {
      name: "Controles Wireless",
      icon: <Wifi className="w-5 h-5" />,
      description: "Receptores 2.4GHz",
      status: "Detecção automática",
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-yellow-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-yellow-400">
            <Monitor className="w-5 h-5 mr-2" />
            Compatibilidade de Dispositivos
          </CardTitle>
          <CardDescription className="text-gray-300">
            O J.S Gaming Hub funciona em diversos dispositivos e plataformas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {devices.map((device, index) => (
              <Card key={index} className="bg-black/50 border-yellow-500/20 hover:border-yellow-500/40 transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 text-white">
                      {device.icon}
                      <h3 className="font-semibold">{device.name}</h3>
                    </div>
                    <CheckCircle className="w-5 h-5 text-yellow-400" />
                  </div>

                  <Badge className={`${device.color} text-white mb-3 font-bold`}>
                    {device.status === "Premium" && <Crown className="w-3 h-3 mr-1" />}
                    {device.status}
                  </Badge>

                  <ul className="space-y-1">
                    {device.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-300 flex items-center">
                        <CheckCircle className="w-3 h-3 text-yellow-400 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-yellow-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-yellow-400">
            <Gamepad2 className="w-5 h-5 mr-2" />
            Suporte a Controles
          </CardTitle>
          <CardDescription className="text-gray-300">
            Conecte seus controles favoritos via USB, Bluetooth ou Wireless
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {controllers.map((controller, index) => (
              <Card key={index} className="bg-black/50 border-yellow-500/20 hover:border-yellow-500/40 transition-all">
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-full flex items-center justify-center">
                      <div className="text-yellow-400">{controller.icon}</div>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2 text-white">{controller.name}</h3>
                  <p className="text-sm text-gray-300 mb-2">{controller.description}</p>
                  <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                    {controller.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900/50 border-yellow-500/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-yellow-400">Requisitos do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-black/30 rounded-lg border border-yellow-500/20">
              <h3 className="font-semibold mb-3 text-yellow-400">Mínimo</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Navegador moderno (Chrome, Firefox, Safari)</li>
                <li>• Conexão com internet</li>
                <li>• 2GB RAM disponível</li>
                <li>• Resolução mínima: 800x600</li>
              </ul>
            </div>
            <div className="p-4 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-lg border border-yellow-500/30">
              <h3 className="font-semibold mb-3 text-yellow-400 flex items-center">
                <Crown className="w-4 h-4 mr-1" />
                Recomendado
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Chrome/Edge mais recente</li>
                <li>• Conexão banda larga</li>
                <li>• 4GB RAM ou mais</li>
                <li>• Resolução Full HD (1920x1080)</li>
                <li>• Controle USB/Bluetooth</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
