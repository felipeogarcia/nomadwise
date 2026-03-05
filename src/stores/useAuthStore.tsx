import React, { createContext, useContext, useState, ReactNode } from 'react'
import { toast } from '@/hooks/use-toast'

export type UserRole = 0 | 1 // 0: Admin, 1: User
export type UserStatus = 'pending_profile' | 'active'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  status: UserStatus
  avatar?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: () => void
  loginAsAdmin: () => void
  logout: () => void
  completeProfile: (data: {
    fullName: string
    phone: string
    cpf: string
    birthDate: string
  }) => void
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = () => {
    setUser({
      id: 'usr_123',
      email: 'viajante@exemplo.com',
      name: '',
      role: 1,
      status: 'pending_profile',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=male&seed=5',
    })
    toast({ title: 'Login realizado com sucesso', description: 'Bem-vindo de volta!' })
  }

  const loginAsAdmin = () => {
    setUser({
      id: 'usr_000',
      email: 'admin@nomadwise.com',
      name: 'Administrador',
      role: 0,
      status: 'active',
      avatar: 'https://img.usecurling.com/ppl/thumbnail?gender=female&seed=1',
    })
    toast({ title: 'Login Administrativo', description: 'Acesso concedido.' })
  }

  const logout = () => {
    setUser(null)
    toast({ title: 'Sessão encerrada', description: 'Até logo!' })
  }

  const completeProfile = (data: {
    fullName: string
    phone: string
    cpf: string
    birthDate: string
  }) => {
    if (!user) return
    setUser({
      ...user,
      name: data.fullName,
      status: 'active',
    })
    toast({ title: 'Perfil atualizado', description: 'Seu perfil foi ativado com sucesso.' })
  }

  return React.createElement(
    AuthContext.Provider,
    {
      value: {
        user,
        isAuthenticated: !!user,
        login,
        loginAsAdmin,
        logout,
        completeProfile,
      },
    },
    children,
  )
}

export default function useAuthStore() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthStore deve ser usado dentro de um AuthProvider')
  }
  return context
}
