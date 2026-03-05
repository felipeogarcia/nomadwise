import React, { createContext, useContext, useState, ReactNode } from 'react'
import { toast } from '@/hooks/use-toast'
import { Profile } from '@/types'

interface AuthState {
  user: Profile | null
  isAuthenticated: boolean
  login: () => void
  loginAsAdmin: () => void
  logout: () => void
  completeProfile: (data: Partial<Profile>) => void
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null)

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

  const completeProfile = (data: Partial<Profile>) => {
    if (!user) return
    setUser({
      ...user,
      ...data,
      status: 'active',
    })
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
