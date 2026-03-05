import { useMemo } from 'react'
import useDataStore from '@/stores/useDataStore'
import { ItineraryService } from '@/services/itineraryService'
import { ItineraryStop } from '@/types'
import { toast } from '@/hooks/use-toast'

export function useItinerary(tripId: string) {
  const { stops, addStop, updateStop, deleteStop, updateStopsBatch } = useDataStore()

  const tripStops = useMemo(() => {
    return stops.filter((s) => s.tripId === tripId).sort((a, b) => a.orderIndex - b.orderIndex)
  }, [stops, tripId])

  const handleAddStop = (data: Omit<ItineraryStop, 'id' | 'tripId' | 'orderIndex'>) => {
    const maxOrder = tripStops.length > 0 ? Math.max(...tripStops.map((s) => s.orderIndex)) : -1
    addStop({
      ...data,
      tripId,
      orderIndex: maxOrder + 1,
    })
    toast({ title: 'Parada Adicionada', description: 'Sua rota foi atualizada.' })
  }

  const handleUpdateStop = (id: string, data: Partial<ItineraryStop>) => {
    updateStop(id, data)
    toast({ title: 'Parada Atualizada', description: 'Os detalhes foram salvos.' })
  }

  const handleDeleteStop = (id: string) => {
    deleteStop(id)
    toast({ title: 'Parada Removida', description: 'Item removido do itinerário.' })
  }

  const handleReorder = (sourceIndex: number, destinationIndex: number) => {
    const updatedBatch = ItineraryService.reorderStops(tripStops, sourceIndex, destinationIndex)
    // Optimistic batch update
    updateStopsBatch(updatedBatch)
  }

  const progress = useMemo(() => ItineraryService.calculateProgress(tripStops), [tripStops])

  return {
    stops: tripStops,
    progress,
    addStop: handleAddStop,
    updateStop: handleUpdateStop,
    deleteStop: handleDeleteStop,
    reorderStops: handleReorder,
  }
}
