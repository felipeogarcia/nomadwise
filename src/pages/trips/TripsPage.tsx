import { useState, useMemo } from 'react'
import { Plus, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { useTrips } from '@/hooks/useTrips'
import { TripStatus, Trip } from '@/types'

import TripCard from './components/TripCard'
import TripFormSheet from './components/TripFormSheet'
import ChecklistSheet from './components/ChecklistSheet'

export default function TripsPage() {
  const { trips, isInitialLoading, update, remove } = useTrips()
  const [filter, setFilter] = useState<TripStatus | 'todas'>('todas')

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null)

  const [isChecklistOpen, setIsChecklistOpen] = useState(false)
  const [checklistTrip, setChecklistTrip] = useState<Trip | null>(null)

  const filteredTrips = useMemo(() => {
    return trips.filter((t) => filter === 'todas' || t.status === filter)
  }, [trips, filter])

  const handleEdit = (trip: Trip) => {
    setEditingTrip(trip)
    setIsFormOpen(true)
  }

  const handleOpenChecklist = (trip: Trip) => {
    setChecklistTrip(trip)
    setIsChecklistOpen(true)
  }

  return (
    <div className="space-y-8 animate-fade-in pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Minhas Viagens</h2>
          <p className="text-muted-foreground mt-1">
            Gerencie seus roteiros, veículos e checklists.
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingTrip(null)
            setIsFormOpen(true)
          }}
          className="shadow-sm shrink-0"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Viagem
        </Button>
      </div>

      <div className="flex items-center overflow-x-auto pb-2 border-b">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="w-full">
          <TabsList className="bg-transparent h-auto p-0 space-x-1 sm:space-x-2">
            {(['todas', 'planejada', 'em_andamento', 'concluida'] as const).map((f) => (
              <TabsTrigger
                key={f}
                value={f}
                className="rounded-full px-4 py-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary capitalize border border-transparent data-[state=active]:border-primary/20"
              >
                {f === 'todas' ? 'Todas' : f.replace('_', ' ')}
                <span className="ml-2 text-xs font-medium bg-muted px-1.5 py-0.5 rounded-full text-muted-foreground">
                  {f === 'todas' ? trips.length : trips.filter((t) => t.status === f).length}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {isInitialLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="flex flex-col overflow-hidden">
              <CardHeader className="pb-3 bg-muted/10">
                <Skeleton className="h-6 w-1/3 mb-4" />
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </CardHeader>
              <CardContent className="flex-1 space-y-4 py-4">
                <Skeleton className="h-4 w-3/4" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              </CardContent>
              <CardFooter className="pt-0 pb-4 px-6 gap-2">
                <Skeleton className="h-9 w-full rounded-md" />
                <Skeleton className="h-9 w-full rounded-md" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTrips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              onEdit={() => handleEdit(trip)}
              onChecklist={() => handleOpenChecklist(trip)}
              onStatusChange={(status) => update(trip.id, { status })}
              onDelete={() => remove(trip.id)}
            />
          ))}

          {filteredTrips.length === 0 && (
            <div className="col-span-full py-16 px-4 text-center border-2 border-dashed rounded-xl bg-muted/10">
              <div className="mx-auto h-16 w-16 bg-muted flex items-center justify-center rounded-full mb-4">
                <MapPin className="h-8 w-8 text-muted-foreground/60" />
              </div>
              <h3 className="text-xl font-medium tracking-tight">Nenhuma viagem encontrada</h3>
              <p className="text-muted-foreground mt-2 mb-6 max-w-sm mx-auto">
                Que tal organizar sua próxima aventura? Adicione um novo roteiro e comece a preparar
                seu checklist.
              </p>
              <Button
                onClick={() => {
                  setEditingTrip(null)
                  setIsFormOpen(true)
                }}
              >
                <Plus className="h-4 w-4 mr-2" /> Planejar Nova Viagem
              </Button>
            </div>
          )}
        </div>
      )}

      <TripFormSheet open={isFormOpen} onOpenChange={setIsFormOpen} trip={editingTrip} />

      {checklistTrip && (
        <ChecklistSheet
          open={isChecklistOpen}
          onOpenChange={setIsChecklistOpen}
          trip={checklistTrip}
        />
      )}
    </div>
  )
}
