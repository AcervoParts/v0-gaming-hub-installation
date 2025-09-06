"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Server, Wifi, Users, HardDrive, Crown, Zap } from "lucide-react"

export default function CloudServerStatus() {
  const [status, setStatus] = useState({
    online: true,
    latency: 45,
    activeUsers: 12,
    serverLoad: 23,
    uptime: "99.9%",
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus((prev) => ({
        ...prev,
        latency: Math.floor(Math.random() * 50) + 20,
        activeUsers: Math.floor(Math.random() * 20) + 5,
        serverLoad: Math.floor(Math.random() * 40) + 10,
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = () => {
    if (status.latency < 50) return "bg-gradient-to-r from-green-500 to-green-600"
    if (status.latency < 100) return "bg-gradient-to-r from-yellow-500 to-yellow-600"
    return "bg-gradient-to-r from-red-500 to-red-600"
  }

  const getLoadColor = () => {
    if (status.serverLoad < 30) return "text-green-400"
    if (status.serverLoad < 70) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <Card className="bg-gray-900/50 border-yellow-500/30 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center text-yellow-400">
          <Server className="w-5 h-5 mr-2" />
          Status do Servidor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer p-3 bg-black/30 rounded-lg border border-yellow-500/20 hover:border-yellow-500/40 transition-all">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${getStatusColor()}`} />
                <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold">
                  <Zap className="w-3 h-3 mr-1" />
                  {status.latency}ms
                </Badge>
              </div>
              <Badge
                className={
                  status.online
                    ? "bg-gradient-to-r from-green-500 to-green-600"
                    : "bg-gradient-to-r from-red-500 to-red-600"
                }
              >
                <Crown className="w-3 h-3 mr-1" />
                {status.online ? "Online" : "Offline"}
              </Badge>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-black/90 border-yellow-500/30 backdrop-blur-xl">
            <Card className="bg-transparent border-none">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-yellow-400">Status Premium do Servidor</h3>
                    <Badge
                      className={
                        status.online
                          ? "bg-gradient-to-r from-green-500 to-green-600"
                          : "bg-gradient-to-r from-red-500 to-red-600"
                      }
                    >
                      <Crown className="w-3 h-3 mr-1" />
                      {status.online ? "Online" : "Offline"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-black/30 rounded-lg border border-yellow-500/20">
                      <Wifi className="w-5 h-5 mx-auto mb-1 text-blue-400" />
                      <p className="text-sm font-medium text-white">{status.latency}ms</p>
                      <p className="text-xs text-gray-400">Latência</p>
                    </div>

                    <div className="text-center p-3 bg-black/30 rounded-lg border border-yellow-500/20">
                      <Users className="w-5 h-5 mx-auto mb-1 text-green-400" />
                      <p className="text-sm font-medium text-white">{status.activeUsers}</p>
                      <p className="text-xs text-gray-400">Usuários Online</p>
                    </div>

                    <div className="text-center p-3 bg-black/30 rounded-lg border border-yellow-500/20">
                      <HardDrive className={`w-5 h-5 mx-auto mb-1 ${getLoadColor()}`} />
                      <p className={`text-sm font-medium ${getLoadColor()}`}>{status.serverLoad}%</p>
                      <p className="text-xs text-gray-400">Carga do Servidor</p>
                    </div>

                    <div className="text-center p-3 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-lg border border-yellow-500/30">
                      <Server className="w-5 h-5 mx-auto mb-1 text-yellow-400" />
                      <p className="text-sm font-medium text-white">{status.uptime}</p>
                      <p className="text-xs text-gray-400">Uptime</p>
                    </div>
                  </div>

                  <div className="text-xs text-yellow-400 text-center font-medium bg-black/30 p-2 rounded border border-yellow-500/20">
                    🇧🇷 Servidor Premium: São Paulo, Brasil
                  </div>
                </div>
              </CardContent>
            </Card>
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  )
}
