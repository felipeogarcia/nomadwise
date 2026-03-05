import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { useVehicles } from '@/hooks/useVehicles'
import { Vehicle } from '@/types'
import { VehicleCard } from './components/VehicleCard'
import { VehicleFormSheet } from './components/VehicleFormSheet'
import { EmptyVehicles } from './components/EmptyVehicles'

function GaragePageContent() {
  const { vehicles, isLoading, error, addVehicle, editVehicle, removeVehicle } = useVehicles()
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | undefined>()

  if (error) {
    throw error // Let ErrorBoundary handle it
  }

  const handleAdd = () => {
    setEditingVehicle(undefined)
    setIsSheetOpen(true)
  }

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle)
    setIsSheetOpen(true)
  }

  const handleSubmit = async (data: Omit<Vehicle, 'id' | 'imageUrl'>, photo?: File) => {
    if (editingVehicle) {
      await editVehicle(editingVehicle.id, data, photo)
    } else {
      await addVehicle({ ...data, imageUrl: '' }, photo)
    }
    setIsSheetOpen(false)
  }

  return (
    <div className="space-y-8 animate-fade-in pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-6 rounded-xl border shadow-sm">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-1">Garagem e Frota</h2>
          <p className="text-muted-foreground">
            Gerencie seus veículos, acompanhe manutenções e organize sua logística.
          </p>
        </div>
        <Button className="shadow-sm shrink-0" onClick={handleAdd} size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Novo Veículo
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[380px] w-full rounded-xl" />
          ))}
        </div>
      ) : vehicles.length === 0 ? (
        <EmptyVehicles onAdd={handleAdd} />
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onEdit={() => handleEdit(vehicle)}
              onDelete={() => removeVehicle(vehicle.id)}
            />
          ))}
        </div>
      )}

      <VehicleFormSheet
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        vehicle={editingVehicle}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default function GaragePage() {
  return (
    <ErrorBoundary>
      <GaragePageContent />
    </ErrorBoundary>
  )
}
