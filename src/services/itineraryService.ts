import { ItineraryStop } from '@/types'

/**
 * Service for abstracting itinerary logic.
 * Follows the service-to-hook architecture.
 */
export const ItineraryService = {
  /**
   * Reorders an array of stops based on a drag and drop action and assigns new orderIndexes.
   */
  reorderStops: (
    stops: ItineraryStop[],
    sourceIndex: number,
    destinationIndex: number,
  ): ItineraryStop[] => {
    if (sourceIndex === destinationIndex) return stops

    const result = Array.from(stops).sort((a, b) => a.orderIndex - b.orderIndex)
    const [removed] = result.splice(sourceIndex, 1)
    result.splice(destinationIndex, 0, removed)

    // Reassign correct sequential orderIndex to the batch
    return result.map((stop, index) => ({
      ...stop,
      orderIndex: index,
    }))
  },

  /**
   * Calculates a simple estimated distance progress for the trip summary
   * based on visited vs total stops.
   */
  calculateProgress: (stops: ItineraryStop[]) => {
    if (stops.length === 0) return 0
    const completed = stops.filter((s) => s.status === 'visited' || s.status === 'skipped').length
    return Math.round((completed / stops.length) * 100)
  },
}
