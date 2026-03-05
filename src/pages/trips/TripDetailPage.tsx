import { useParams, Navigate, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useTrips } from '@/hooks/useTrips'
import { Button } from '@/components/ui/button'
import TripSummaryBar from './components/TripSummaryBar'
import ItineraryMap from './components/ItineraryMap'
import ItineraryList from './components/ItineraryList'

export default function TripDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { trips } = useTrips()

  const trip = trips.find((t) => t.id === id)

  if (!trip) {
    return <Navigate to="/app/trips" replace />
  }

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <Button
        variant="ghost"
        asChild
        className="-ml-4 mb-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <Link to="/app/trips">
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para Viagens
        </Link>
      </Button>

      <TripSummaryBar trip={trip} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:h-[650px]">
        <div className="lg:col-span-3 rounded-xl border bg-card overflow-hidden shadow-sm flex flex-col relative h-[400px] lg:h-auto order-2 lg:order-1">
          <ItineraryMap tripId={trip.id} />
        </div>
        <div className="lg:col-span-2 rounded-xl border bg-card shadow-sm flex flex-col h-[500px] lg:h-auto overflow-hidden order-1 lg:order-2">
          <ItineraryList tripId={trip.id} />
        </div>
      </div>
    </div>
  )
}
