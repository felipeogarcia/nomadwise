import { useState } from 'react'
import { MapPin, Calendar, CarFront, Edit, Receipt } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Trip, TripStatus } from '@/types'
import useDataStore from '@/stores/useDataStore'
import TripFormSheet from './TripFormSheet'
import { useItinerary } from '@/hooks/useItinerary'

interface TripSummaryBarProps {
  trip: Trip
}

export default function TripSummaryBar({ trip }: TripSummaryBarProps) {
  const { vehicles } = useDataStore()
  const { progress: routeProgress } = useItinerary(trip.id)
  const [isEditing, setIsEditing] = useState(false)

  const vehicle = vehicles.find((v) => v.id === trip.vehicleId)

  const getStatusConfig = (status: TripStatus) => {
    switch (status) {
      case 'planejada':
        return { label: 'Planejada', classes: 'bg-blue-100 text-blue-800 border-blue-200' }
      case 'em_andamento':
        return { label: 'Em Andamento', classes: 'bg-green-100 text-green-800 border-green-200' }
      case 'concluida':
        return { label: 'Concluída', classes: 'bg-muted text-muted-foreground' }
    }
  }

  const statusConfig = getStatusConfig(trip.status)
  const budgetProgress = trip.budget > 0 ? Math.min((trip.spent / trip.budget) * 100, 100) : 0

  return (
    <>
      <Card className="border-border shadow-sm">
        <CardContent className="p-5 flex flex-col md:flex-row gap-6 items-center md:items-start justify-between">
          <div className="flex-1 space-y-3 w-full">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{trip.title}</h1>
              <Badge variant="outline" className={statusConfig.classes}>
                {statusConfig.label}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> <span>{trip.destination}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>
                  {format(new Date(trip.startDate), 'dd MMM yy', { locale: ptBR })}
                  {trip.endDate &&
                    ` - ${format(new Date(trip.endDate), 'dd MMM yy', { locale: ptBR })}`}
                </span>
              </div>
              {vehicle && (
                <div className="flex items-center gap-1.5">
                  <CarFront className="h-4 w-4" /> <span>{vehicle.nickname}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-6 w-full md:w-auto md:min-w-[280px]">
            <div className="flex-1 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="flex items-center gap-1.5">
                    <Receipt className="h-3.5 w-3.5" /> Orçamento
                  </span>
                  <span>{Math.round(budgetProgress)}%</span>
                </div>
                <Progress value={budgetProgress} className="h-1.5" />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" /> Rota (Paradas)
                  </span>
                  <span>{routeProgress}%</span>
                </div>
                <Progress value={routeProgress} className="h-1.5" />
              </div>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsEditing(true)}
              className="shrink-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <TripFormSheet open={isEditing} onOpenChange={setIsEditing} trip={trip} />
    </>
  )
}
