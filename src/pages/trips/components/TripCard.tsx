import { MapPin, Calendar, CheckSquare, MoreHorizontal, CarFront } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { Progress } from '@/components/ui/progress'
import { Trip, TripStatus } from '@/types'
import useDataStore from '@/stores/useDataStore'

interface TripCardProps {
  trip: Trip
  onEdit: () => void
  onChecklist: () => void
  onStatusChange: (status: TripStatus) => void
  onDelete: () => void
}

export default function TripCard({
  trip,
  onEdit,
  onChecklist,
  onStatusChange,
  onDelete,
}: TripCardProps) {
  const { vehicles, checklistItems } = useDataStore()

  const vehicle = vehicles.find((v) => v.id === trip.vehicleId)

  const items = checklistItems.filter((i) => i.tripId === trip.id)
  const completedItems = items.filter((i) => i.isCompleted).length
  const checklistProgress = items.length > 0 ? Math.round((completedItems / items.length) * 100) : 0

  const getStatusConfig = (status: TripStatus) => {
    switch (status) {
      case 'planejada':
        return {
          label: 'Planejada',
          classes:
            'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200',
        }
      case 'em_andamento':
        return {
          label: 'Em Andamento',
          classes:
            'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-200',
        }
      case 'concluida':
        return { label: 'Concluída', classes: 'bg-muted text-muted-foreground' }
    }
  }

  const statusConfig = getStatusConfig(trip.status)

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden h-full">
      <CardHeader className="pb-3 bg-muted/20">
        <div className="flex justify-between items-start">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Badge
                variant="outline"
                className={`cursor-pointer transition-colors ${statusConfig.classes} hover:opacity-80`}
              >
                {statusConfig.label}
              </Badge>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Atualizar Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onStatusChange('planejada')}>
                Planejada
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange('em_andamento')}>
                Em Andamento
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onStatusChange('concluida')}>
                Concluída
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>Editar Detalhes</DropdownMenuItem>
              <DropdownMenuItem onClick={onChecklist}>Ver Checklist</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onDelete}
                className="text-destructive focus:text-destructive"
              >
                Excluir Viagem
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardTitle className="text-xl mt-3 line-clamp-1 group-hover:text-primary transition-colors">
          {trip.title}
        </CardTitle>
        <div className="flex items-center text-sm text-muted-foreground mt-1 gap-4">
          <div className="flex items-center">
            <MapPin className="h-3.5 w-3.5 mr-1 shrink-0" />
            <span className="truncate max-w-[120px]" title={trip.destination}>
              {trip.destination}
            </span>
          </div>
          {vehicle && (
            <div className="flex items-center text-xs">
              <CarFront className="h-3.5 w-3.5 mr-1 shrink-0" />
              <span className="truncate max-w-[100px]" title={vehicle.nickname}>
                {vehicle.nickname}
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-4 pt-4">
        <div className="flex items-center text-sm text-muted-foreground mb-5">
          <Calendar className="h-4 w-4 mr-2 shrink-0 text-primary/70" />
          <span>
            {trip.startDate && format(new Date(trip.startDate), "dd 'de' MMM", { locale: ptBR })}
            {trip.endDate
              ? ` - ${format(new Date(trip.endDate), "dd 'de' MMM, yy", { locale: ptBR })}`
              : ` (${new Date(trip.startDate).getFullYear()})`}
          </span>
        </div>

        <div className="space-y-5">
          {/* Orçamento */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground font-medium">Orçamento</span>
              <span className="font-semibold text-foreground">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                  trip.spent,
                )}
                <span className="text-muted-foreground font-normal mx-1">/</span>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  maximumFractionDigits: 0,
                }).format(trip.budget)}
              </span>
            </div>
            <Progress
              value={trip.budget > 0 ? Math.min((trip.spent / trip.budget) * 100, 100) : 0}
              className={`h-1.5 ${trip.budget > 0 && trip.spent / trip.budget > 0.9 ? '[&>div]:bg-destructive' : ''}`}
            />
          </div>

          {/* Checklist Mini */}
          <div className="space-y-1.5 cursor-pointer group/chk" onClick={onChecklist}>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground flex items-center gap-1.5 font-medium group-hover/chk:text-primary transition-colors">
                <CheckSquare className="h-3.5 w-3.5" />
                Checklist
              </span>
              <span className="font-medium text-foreground">{checklistProgress}%</span>
            </div>
            <Progress value={checklistProgress} className="h-1.5 bg-muted" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 pb-4 px-6 gap-2 mt-auto">
        <Button variant="outline" className="w-full text-xs" onClick={onChecklist}>
          Preparativos
        </Button>
        <Button className="w-full text-xs" onClick={onEdit}>
          Detalhes
        </Button>
      </CardFooter>
    </Card>
  )
}
