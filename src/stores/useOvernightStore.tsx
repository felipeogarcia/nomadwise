import React, { createContext, useContext, useState, ReactNode } from 'react'
import { toast } from '@/hooks/use-toast'

export interface Overnight {
  id: string
  tripId: string
  name: string
  type: string
  checkinDate: string
  checkoutDate?: string
  cost: number
  rating: number
  notes?: string
  isPublic: boolean
  lat?: number
  lng?: number
  amenities: string[]
}

interface OvernightState {
  overnights: Overnight[]
  addOvernight: (data: Omit<Overnight, 'id'>) => Promise<void>
  updateOvernight: (id: string, data: Partial<Overnight>) => Promise<void>
  deleteOvernight: (id: string) => Promise<void>
}

const mockOvernights: Overnight[] = [
  {
    id: 'o1',
    tripId: 't1',
    name: 'Camping Tierra del Fuego',
    type: 'campground',
    checkinDate: '2024-01-28T14:00:00Z',
    checkoutDate: '2024-01-30T10:00:00Z',
    cost: 120,
    rating: 5,
    notes: 'Vista incrível para o lago. Muito frio à noite, mas a estrutura é ótima.',
    isPublic: true,
    lat: -54.8019,
    lng: -68.303,
    amenities: ['wifi', 'water', 'security'],
  },
]

const OvernightContext = createContext<OvernightState | undefined>(undefined)

export function OvernightProvider({ children }: { children: ReactNode }) {
  const [overnights, setOvernights] = useState<Overnight[]>(mockOvernights)

  const addOvernight = async (data: Omit<Overnight, 'id'>) => {
    const newOvernight = { ...data, id: crypto.randomUUID() }
    setOvernights((prev) => [newOvernight, ...prev])

    try {
      await new Promise((resolve, reject) => {
        if (data.cost === 9999) setTimeout(() => reject(new Error('Simulated Error')), 400)
        else setTimeout(resolve, 300)
      })
      toast({ title: 'Sucesso', description: 'Pernoite registrado em seu diário.' })
    } catch (error) {
      setOvernights((prev) => prev.filter((o) => o.id !== newOvernight.id))
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Falha ao salvar pernoite. A ação foi desfeita.',
      })
    }
  }

  const updateOvernight = async (id: string, data: Partial<Overnight>) => {
    const previous = overnights.find((o) => o.id === id)
    if (!previous) return

    setOvernights((prev) => prev.map((o) => (o.id === id ? { ...o, ...data } : o)))

    try {
      await new Promise((resolve) => setTimeout(resolve, 300))
      toast({ title: 'Atualizado', description: 'Detalhes do pernoite salvos com sucesso.' })
    } catch (error) {
      setOvernights((prev) => prev.map((o) => (o.id === id ? previous : o)))
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Falha ao atualizar. Ação desfeita.',
      })
    }
  }

  const deleteOvernight = async (id: string) => {
    const previous = overnights.find((o) => o.id === id)
    if (!previous) return

    setOvernights((prev) => prev.filter((o) => o.id !== id))

    try {
      await new Promise((resolve) => setTimeout(resolve, 300))
      toast({ title: 'Removido', description: 'O registro foi apagado do histórico.' })
    } catch (error) {
      setOvernights((prev) => [...prev, previous])
      toast({ variant: 'destructive', title: 'Erro', description: 'Falha ao remover pernoite.' })
    }
  }

  return React.createElement(
    OvernightContext.Provider,
    { value: { overnights, addOvernight, updateOvernight, deleteOvernight } },
    children,
  )
}

export function useOvernightStore() {
  const context = useContext(OvernightContext)
  if (!context) throw new Error('useOvernightStore deve ser usado dentro de um OvernightProvider')
  return context
}
