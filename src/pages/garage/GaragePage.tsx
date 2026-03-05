import { Plus, Settings, AlertCircle, FileText } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useDataStore from '@/stores/useDataStore'

export default function GaragePage() {
  const { vehicles } = useDataStore()

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Garagem</h2>
          <p className="text-muted-foreground">Gerencie seus veículos, manutenções e documentos.</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="shadow-sm">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Veículo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Veículo</DialogTitle>
              <DialogDescription>
                Cadastre um novo veículo para acompanhar manutenções. (Mock demonstrativo)
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="make">Marca</Label>
                  <Input id="make" placeholder="Ex: Fiat" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="model">Modelo</Label>
                  <Input id="model" placeholder="Ex: Ducato" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="plate">Placa</Label>
                <Input id="plate" placeholder="ABC-1234" />
              </div>
              <Button type="submit" className="w-full mt-4">
                Salvar Veículo
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {vehicles.map((vehicle) => {
          const nextMaint = new Date(vehicle.nextMaintenance)
          const isUrgent = nextMaint.getTime() - new Date().getTime() < 1000 * 60 * 60 * 24 * 30

          return (
            <Card
              key={vehicle.id}
              className="overflow-hidden flex flex-col md:flex-row group hover:shadow-lg transition-all"
            >
              <div className="md:w-2/5 relative h-48 md:h-auto overflow-hidden">
                <img
                  src={vehicle.imageUrl}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur font-mono">
                    {vehicle.plate}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6 md:w-3/5 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {vehicle.make} {vehicle.model}
                    </h3>
                    <p className="text-sm text-muted-foreground">Ano {vehicle.year}</p>
                  </div>
                </div>

                <div className="space-y-3 flex-1">
                  <div
                    className={`flex items-center gap-2 text-sm p-2 rounded-md border ${isUrgent ? 'bg-destructive/10 border-destructive/20 text-destructive' : 'bg-muted/50 border-transparent'}`}
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <div>
                      <span className="font-medium block">Próxima Revisão</span>
                      <span className="opacity-90">{nextMaint.toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <Button variant="outline" className="flex-1 h-9 text-xs">
                    <Settings className="h-3.5 w-3.5 mr-1.5" />
                    Serviços
                  </Button>
                  <Button variant="outline" className="flex-1 h-9 text-xs">
                    <FileText className="h-3.5 w-3.5 mr-1.5" />
                    Docs
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
