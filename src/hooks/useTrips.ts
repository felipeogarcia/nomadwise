import { useState, useEffect } from 'react'
import useDataStore from '@/stores/useDataStore'
import { Trip } from '@/types'
import { toast } from '@/hooks/use-toast'

export function useTrips() {
  const { trips, addTrip, updateTrip, deleteTrip } = useDataStore()
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  useEffect(() => {
    // Simulate initial loading time for UX feedback
    const timer = setTimeout(() => setIsInitialLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const create = async (data: Omit<Trip, 'id' | 'spent'>) => {
    try {
      // Optimistic update
      addTrip(data)
      toast({ title: 'Sucesso', description: 'Viagem planejada com sucesso.' })
    } catch (error) {
      toast({ variant: 'destructive', title: 'Erro', description: 'Falha ao criar viagem.' })
    }
  }

  const update = async (id: string, data: Partial<Trip>) => {
    try {
      updateTrip(id, data)
      toast({ title: 'Sucesso', description: 'Detalhes da viagem atualizados.' })
    } catch (error) {
      toast({ variant: 'destructive', title: 'Erro', description: 'Falha ao atualizar viagem.' })
    }
  }

  const remove = async (id: string) => {
    try {
      deleteTrip(id)
      toast({ title: 'Removida', description: 'A viagem foi excluída dos seus registros.' })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível excluir a viagem.',
      })
    }
  }

  return { trips, isInitialLoading, create, update, remove }
}
