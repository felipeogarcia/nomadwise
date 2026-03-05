import { Tent, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function OvernightEmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in bg-muted/10">
      <div className="h-16 w-16 bg-background border rounded-full flex items-center justify-center mb-5 shadow-sm">
        <Tent className="h-8 w-8 text-muted-foreground opacity-60" />
      </div>
      <h3 className="text-lg font-semibold mb-2">Nenhum pernoite registrado</h3>
      <p className="text-muted-foreground text-sm max-w-sm mb-6 leading-relaxed">
        Acompanhe onde você dormiu, os custos, os serviços disponíveis e a qualidade de cada local
        durante a viagem.
      </p>
      <Button onClick={onAdd} className="shadow-sm">
        <Plus className="h-4 w-4 mr-2" /> Registrar pernoite
      </Button>
    </div>
  )
}
