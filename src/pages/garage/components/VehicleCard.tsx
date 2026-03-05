import { Fuel, Settings, AlertCircle, Edit2, Trash2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Vehicle, VehicleType } from '@/types'

const typeColors: Record<VehicleType, string> = {
  moto: 'bg-indigo-500 hover:bg-indigo-600 text-white',
  carro: 'bg-blue-600 hover:bg-blue-700 text-white',
  motorhome: 'bg-emerald-600 hover:bg-emerald-700 text-white',
  van: 'bg-orange-500 hover:bg-orange-600 text-white',
  outro: 'bg-slate-500 hover:bg-slate-600 text-white',
}

interface Props {
  vehicle: Vehicle
  onEdit: () => void
  onDelete: () => void
}

export function VehicleCard({ vehicle, onEdit, onDelete }: Props) {
  const nextMaint = vehicle.nextMaintenance ? new Date(vehicle.nextMaintenance) : null
  const isUrgent = nextMaint
    ? nextMaint.getTime() - new Date().getTime() < 1000 * 60 * 60 * 24 * 30
    : false

  return (
    <Card className="overflow-hidden flex flex-col group hover:shadow-lg transition-all border-border/50">
      <div className="relative h-48 overflow-hidden">
        <img
          src={vehicle.imageUrl || 'https://img.usecurling.com/p/400/300?q=vehicle'}
          alt={vehicle.nickname}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className={`${typeColors[vehicle.type]} font-medium capitalize border-none`}>
            {vehicle.type}
          </Badge>
          {vehicle.plate && (
            <Badge
              variant="secondary"
              className="bg-background/90 backdrop-blur font-mono border-none shadow-sm"
            >
              {vehicle.plate}
            </Badge>
          )}
        </div>
        <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 bg-background/90 shadow-sm"
            onClick={onEdit}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="destructive" className="h-8 w-8 shadow-sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir veículo?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. O veículo "{vehicle.nickname}" e todos os seus
                  registros serão removidos permanentemente.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onDelete}
                  className="bg-destructive hover:bg-destructive/90"
                >
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <CardContent className="p-5 flex-1 flex flex-col">
        <div className="mb-5">
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-1">
            {vehicle.nickname}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {vehicle.make} {vehicle.model} • {vehicle.year}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5 flex-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Settings className="h-4 w-4 shrink-0 text-primary/70" />
            <span className="truncate">{vehicle.odometer.toLocaleString('pt-BR')} km</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Fuel className="h-4 w-4 shrink-0 text-primary/70" />
            <span className="truncate">{vehicle.tankCapacity}L Tanque</span>
          </div>
        </div>

        <div
          className={`flex items-center justify-between text-sm p-3 rounded-lg border ${isUrgent ? 'bg-destructive/10 border-destructive/20 text-destructive' : 'bg-muted/50 border-transparent'}`}
        >
          <div className="flex items-center gap-2">
            <AlertCircle className={`h-4 w-4 shrink-0 ${isUrgent ? 'animate-pulse' : ''}`} />
            <span className="font-medium">Próx. Revisão</span>
          </div>
          <span className="font-mono opacity-90">
            {nextMaint ? nextMaint.toLocaleDateString('pt-BR') : 'Não agendada'}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
