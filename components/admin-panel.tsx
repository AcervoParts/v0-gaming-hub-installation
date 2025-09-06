"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { UserCheck, UserX, Clock, Users, Shield } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  isAdmin: boolean
  isApproved: boolean
  joinDate: string
}

interface AdminPanelProps {
  pendingUsers: User[]
  approvedUsers: User[]
  onApproveUser: (userId: string) => void
  onRejectUser: (userId: string) => void
}

export default function AdminPanel({ pendingUsers, approvedUsers, onApproveUser, onRejectUser }: AdminPanelProps) {
  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-900/50 border-yellow-500/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Clock className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold text-white">{pendingUsers.length}</p>
                <p className="text-sm text-gray-400">Aguardando Aprovação</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-white">{approvedUsers.length}</p>
                <p className="text-sm text-gray-400">Usuários Aprovados</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-white">{pendingUsers.length + approvedUsers.length}</p>
                <p className="text-sm text-gray-400">Total de Usuários</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Users */}
      <Card className="bg-gray-900/50 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="text-yellow-400 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            Usuários Pendentes ({pendingUsers.length})
          </CardTitle>
          <CardDescription className="text-gray-300">
            Usuários aguardando aprovação para acessar o sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingUsers.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Nenhum usuário pendente</p>
          ) : (
            <div className="space-y-4">
              {pendingUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700/50"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10 border-2 border-yellow-500/50">
                      <AvatarFallback className="bg-yellow-500 text-black font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-white">{user.name}</p>
                      <p className="text-sm text-gray-400">{user.email}</p>
                      <p className="text-xs text-gray-500">
                        Solicitado em: {new Date(user.joinDate).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => onApproveUser(user.id)}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <UserCheck className="w-4 h-4 mr-1" />
                      Aprovar
                    </Button>
                    <Button onClick={() => onRejectUser(user.id)} size="sm" variant="destructive">
                      <UserX className="w-4 h-4 mr-1" />
                      Rejeitar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Approved Users */}
      <Card className="bg-gray-900/50 border-green-500/20">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Usuários Aprovados ({approvedUsers.length})
          </CardTitle>
          <CardDescription className="text-gray-300">Usuários com acesso liberado ao sistema</CardDescription>
        </CardHeader>
        <CardContent>
          {approvedUsers.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Nenhum usuário aprovado</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {approvedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50"
                >
                  <Avatar className="w-8 h-8 border-2 border-green-500/50">
                    <AvatarFallback className="bg-green-500 text-white font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-white text-sm">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                  <Badge variant="outline" className="border-green-500/50 text-green-400">
                    Ativo
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
