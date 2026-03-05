import { useState } from 'react'
import { Plus, MoreHorizontal, Calendar, MapPin } from 'lucide-react'
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
} from '@/components/ui/dropdown-menu'
import { Progress } from '@/components/ui/progress'
import useDataStore from '@/stores/useDataStore'
import { TripStatus } from '@/types'

export default function TripsPage() {
  const { trips } = useDataStore()
  const [filter, setFilter] = useState<TripStatus | 'todas'>('todas')

  const filteredTrips = trips.filter((t) => (filter === 'todas' ? true : t.status === filter))

  const getStatusBadge = (status: TripStatus) => {
    switch (status) {
      case 'planejada':
        return (
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
          >
            Planejada
          </Badge>
        )
      case 'em_andamento':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-100">
            Em Andamento
          </Badge>
        )
      case 'concluida':
        return (
          <Badge variant="outline" className="text-muted-foreground">
            Concluída
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Minhas Viagens</h2>
          <p className="text-muted-foreground">Gerencie seus roteiros e orçamentos.</p>
        </div>
        <Button className="shadow-sm">
          <Plus className="h-4 w-4 mr-2" />
          Nova Viagem
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {(['todas', 'planejada', 'em_andamento', 'concluida'] as const).map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(f)}
            className="capitalize"
          >
            {f === 'todas' ? 'Todas' : f.replace('_', ' ')}
          </Button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTrips.map((trip) => {
          const budgetPercentage =
            trip.budget > 0 ? Math.min((trip.spent / trip.budget) * 100, 100) : 0

          return (
            <Card
              key={trip.id}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  {getStatusBadge(trip.status)}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Editar Detalhes</DropdownMenuItem>
                      <DropdownMenuItem>Adicionar Despesa</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className="text-xl mt-3 line-clamp-1 group-hover:text-primary transition-colors">
                  {trip.title}
                </CardTitle>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <MapPin className="h-3.5 w-3.5 mr-1 shrink-0" />
                  <span className="truncate">{trip.destination}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 pb-3">
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Calendar className="h-3.5 w-3.5 mr-1 shrink-0" />
                  <span>
                    {format(new Date(trip.startDate), "dd 'de' MMM", { locale: ptBR })}
                    {trip.endDate &&
                      ` - ${format(new Date(trip.endDate), "dd 'de' MMM, yyyy", { locale: ptBR })}`}
                    {!trip.endDate && ` (${new Date(trip.startDate).getFullYear()})`}
                  </span>
                </div>

                <div className="space-y-1.5 mt-auto">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Orçamento</span>
                    <span className="font-medium">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(trip.spent)}{' '}
                      /{' '}
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(trip.budget)}
                    </span>
                  </div>
                  <Progress
                    value={budgetPercentage}
                    className={budgetPercentage > 90 ? '[&>div]:bg-destructive' : ''}
                  />
                </div>
              </CardContent>
              <CardFooter className="pt-0 pb-4 px-6 border-t mt-4">
                <Button
                  variant="ghost"
                  className="w-full justify-between px-0 hover:bg-transparent hover:text-primary"
                >
                  <span>Ver planejamento completo</span>
                  <Plus className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )
        })}

        {filteredTrips.length === 0 && (
          <div className="col-span-full py-12 text-center border-2 border-dashed rounded-xl">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium">Nenhuma viagem encontrada</h3>
            <p className="text-muted-foreground mb-4">Que tal planejar sua próxima aventura?</p>
            <Button>Criar Viagem</Button>
          </div>
        )}
      </div>
    </div>
  )
}
