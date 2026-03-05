import { useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { ArrowLeft, Plus, Tent } from 'lucide-react'
import { useTrips } from '@/hooks/useTrips'
import { Button } from '@/components/ui/button'
import { Overnight } from '@/stores/useOvernightStore'
import OvernightMap from './components/OvernightMap'
import OvernightList from './components/OvernightList'
import OvernightFormSheet from './components/OvernightFormSheet'

export default function OvernightsPage() {
  const { id } = useParams<{ id: string }>()
  const { trips } = useTrips()
  const trip = trips.find((t) => t.id === id)

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingOvernight, setEditingOvernight] = useState<Overnight | null>(null)

  if (!trip) return <Navigate to="/app/trips" replace />

  const handleEdit = (overnight: Overnight) => {
    setEditingOvernight(overnight)
    setIsFormOpen(true)
  }

  const handleOpenChange = (open: boolean) => {
    setIsFormOpen(open)
    if (!open) setTimeout(() => setEditingOvernight(null), 300)
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4 animate-fade-in">
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            asChild
            className="-ml-4 text-muted-foreground hover:text-foreground"
          >
            <Link to={`/app/trips/${trip.id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para Viagem
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Tent className="h-6 w-6 text-primary" /> Pernoites
          </h1>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="shadow-sm">
          <Plus className="h-4 w-4 mr-2" /> Novo Pernoite
        </Button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden min-h-0">
        {/* Map occupies top on mobile (h-[280px]) and 55% width on desktop */}
        <div className="h-[280px] lg:h-full lg:w-[55%] rounded-xl border bg-card shadow-sm overflow-hidden shrink-0 lg:shrink">
          <OvernightMap tripId={trip.id} />
        </div>

        {/* List occupies remaining space below on mobile, and 45% width on desktop */}
        <div className="flex-1 lg:w-[45%] rounded-xl border bg-card shadow-sm overflow-hidden flex flex-col min-h-0">
          <OvernightList tripId={trip.id} onEdit={handleEdit} onAdd={() => setIsFormOpen(true)} />
        </div>
      </div>

      <OvernightFormSheet
        tripId={trip.id}
        open={isFormOpen}
        onOpenChange={handleOpenChange}
        overnight={editingOvernight}
      />
    </div>
  )
}
