import { useState, useEffect, useCallback } from 'react'
import { Vehicle } from '@/types'
import { vehicleService } from '@/services/vehicleService'
import { useToast } from '@/hooks/use-toast'

export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const { toast } = useToast()

  const fetchVehicles = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await vehicleService.getVehicles()
      setVehicles(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Falha ao carregar veículos'))
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível carregar sua frota.',
      })
    } finally {
      setIsLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchVehicles()
  }, [fetchVehicles])

  const addVehicle = async (vehicle: Omit<Vehicle, 'id'>, photo?: File) => {
    const tempId = `temp-${Date.now()}`
    const optimisticVehicle: Vehicle = { ...vehicle, id: tempId, imageUrl: vehicle.imageUrl || '' }
    setVehicles((prev) => [optimisticVehicle, ...prev])

    try {
      const newVehicle = await vehicleService.createVehicle(vehicle, photo)
      setVehicles((prev) => prev.map((v) => (v.id === tempId ? newVehicle : v)))
      toast({ title: 'Sucesso', description: 'Veículo adicionado com sucesso.' })
    } catch (err) {
      setVehicles((prev) => prev.filter((v) => v.id !== tempId))
      toast({ variant: 'destructive', title: 'Erro', description: 'Falha ao adicionar veículo.' })
      throw err
    }
  }

  const editVehicle = async (id: string, updates: Partial<Vehicle>, photo?: File) => {
    const previousVehicles = [...vehicles]
    setVehicles((prev) => prev.map((v) => (v.id === id ? { ...v, ...updates } : v)))

    try {
      const updatedVehicle = await vehicleService.updateVehicle(id, updates, photo)
      setVehicles((prev) => prev.map((v) => (v.id === id ? updatedVehicle : v)))
      toast({ title: 'Sucesso', description: 'Informações atualizadas.' })
    } catch (err) {
      setVehicles(previousVehicles)
      toast({ variant: 'destructive', title: 'Erro', description: 'Falha ao atualizar veículo.' })
      throw err
    }
  }

  const removeVehicle = async (id: string) => {
    const previousVehicles = [...vehicles]
    setVehicles((prev) => prev.filter((v) => v.id !== id))

    try {
      await vehicleService.deleteVehicle(id)
      toast({ title: 'Removido', description: 'Veículo excluído com sucesso.' })
    } catch (err) {
      setVehicles(previousVehicles)
      toast({ variant: 'destructive', title: 'Erro', description: 'Falha ao excluir veículo.' })
      throw err
    }
  }

  return {
    vehicles,
    isLoading,
    error,
    addVehicle,
    editVehicle,
    removeVehicle,
    refetch: fetchVehicles,
  }
}
