import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  onAdd: () => void
}

export function EmptyVehicles({ onAdd }: Props) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-xl bg-muted/10 animate-fade-in">
      <div className="bg-primary/10 p-5 rounded-full mb-5">
        <Plus className="h-10 w-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold tracking-tight mb-2">Nenhum veículo cadastrado</h3>
      <p className="text-muted-foreground max-w-md mb-8">
        Você ainda não registrou nenhum veículo na sua garagem. Adicione seu primeiro veículo para
        acompanhar manutenções, gastos e logística de viagens.
      </p>
      <Button size="lg" onClick={onAdd} className="shadow-sm">
        <Plus className="h-5 w-5 mr-2" />
        Adicionar Primeiro Veículo
      </Button>
    </div>
  )
}
