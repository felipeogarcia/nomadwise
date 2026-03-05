import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, TrendingUp, AlertTriangle, Wallet } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import useDataStore from '@/stores/useDataStore'
import useAuthStore from '@/stores/useAuthStore'

export default function DashboardPage() {
  const { trips, vehicles } = useDataStore()
  const { user } = useAuthStore()

  const activeTrips = useMemo(() => trips.filter((t) => t.status === 'em_andamento'), [trips])

  const totalBudget = useMemo(
    () => activeTrips.reduce((acc, t) => acc + t.budget, 0),
    [activeTrips],
  )
  const totalSpent = useMemo(() => activeTrips.reduce((acc, t) => acc + t.spent, 0), [activeTrips])
  const budgetPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0

  const needsMaintenance = useMemo(() => {
    const today = new Date()
    return vehicles.filter((v) => {
      const maintDate = new Date(v.nextMaintenance)
      const diffTime = maintDate.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays <= 30
    })
  }, [vehicles])

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Olá, {user?.name?.split(' ')[0] || 'Viajante'}!
        </h2>
        <p className="text-muted-foreground mt-1">
          Aqui está o resumo das suas aventuras e veículos.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Viagens Ativas</CardTitle>
            <MapPin className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeTrips.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {trips.filter((t) => t.status === 'planejada').length} planejadas
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orçamento Atual</CardTitle>
            <Wallet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                totalSpent,
              )}
            </div>
            <Progress value={budgetPercentage} className="h-2 mt-3" />
            <p className="text-xs text-muted-foreground mt-2">
              {budgetPercentage.toFixed(1)}% do total planejado consumido
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Veículos na Garagem</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vehicles.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Prontos para a estrada</p>
          </CardContent>
        </Card>

        <Card className="border-destructive/50 bg-destructive/5 hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-destructive">
              Atenção Necessária
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{needsMaintenance.length}</div>
            <p className="text-xs text-destructive/80 mt-1">Veículos próximos da manutenção</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Viagens em Andamento</CardTitle>
            <CardDescription>Acompanhamento das suas expedições atuais.</CardDescription>
          </CardHeader>
          <CardContent>
            {activeTrips.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <MapPin className="h-10 w-10 text-muted-foreground mb-4 opacity-50" />
                <p className="text-muted-foreground">Nenhuma viagem em andamento.</p>
                <Button asChild variant="link" className="mt-2">
                  <Link to="/app/trips">Planejar nova viagem</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {activeTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{trip.title}</p>
                      <p className="text-sm text-muted-foreground">Destino: {trip.destination}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(trip.spent)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        de{' '}
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(trip.budget)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Avisos de Manutenção</CardTitle>
            <CardDescription>Próximas revisões programadas.</CardDescription>
          </CardHeader>
          <CardContent>
            {needsMaintenance.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                Tudo em dia com seus veículos!
              </p>
            ) : (
              <div className="space-y-4">
                {needsMaintenance.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    className="flex items-start gap-4 p-3 rounded-lg border bg-card text-card-foreground shadow-sm"
                  >
                    <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                    <div className="space-y-1 flex-1">
                      <p className="text-sm font-medium leading-none">
                        {vehicle.make} {vehicle.model}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Revisão até: {new Date(vehicle.nextMaintenance).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <Button asChild variant="outline" size="sm" className="h-7 text-xs">
                      <Link to="/app/garage">Ver</Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
