import { useOvernightStore, Overnight } from '@/stores/useOvernightStore'
import { ScrollArea } from '@/components/ui/scroll-area'
import OvernightEmptyState from './OvernightEmptyState'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { MapPin, Star, MoreVertical, Wifi, Droplet, Shield, Edit, Trash } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'

interface OvernightListProps {
  tripId: string
  onEdit: (o: Overnight) => void
  onAdd: () => void
}

export default function OvernightList({ tripId, onEdit, onAdd }: OvernightListProps) {
  const { overnights, deleteOvernight } = useOvernightStore()

  const tripOvernights = overnights
    .filter((o) => o.tripId === tripId)
    .sort((a, b) => new Date(b.checkinDate).getTime() - new Date(a.checkinDate).getTime())

  if (tripOvernights.length === 0) {
    return <OvernightEmptyState onAdd={onAdd} />
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi':
        return <Wifi className="h-3 w-3 mr-1" />
      case 'water':
        return <Droplet className="h-3 w-3 mr-1" />
      case 'security':
        return <Shield className="h-3 w-3 mr-1" />
      default:
        return null
    }
  }

  const translateAmenity = (amenity: string) => {
    switch (amenity) {
      case 'wifi':
        return 'Wi-Fi'
      case 'water':
        return 'Água'
      case 'security':
        return 'Segurança'
      default:
        return amenity
    }
  }

  return (
    <div className="flex flex-col h-full bg-muted/10">
      <div className="px-4 py-3 border-b bg-background flex justify-between items-center shrink-0">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          Histórico <Badge variant="secondary">{tripOvernights.length}</Badge>
        </h3>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {tripOvernights.map((o) => (
            <div
              key={o.id}
              className="bg-background border rounded-lg p-4 shadow-sm group transition-all hover:border-primary/50"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-base flex items-center gap-2">
                    {o.name}
                    {o.isPublic && (
                      <Badge
                        variant="outline"
                        className="text-[10px] h-5 px-1.5 font-medium border-primary/30 text-primary"
                      >
                        Público
                      </Badge>
                    )}
                  </h4>
                  <p className="text-xs text-muted-foreground capitalize flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3" /> {o.type}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 -mt-2">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(o)}>
                      <Edit className="h-4 w-4 mr-2" /> Editar Detalhes
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => deleteOvernight(o.id)}
                      className="text-destructive"
                    >
                      <Trash className="h-4 w-4 mr-2" /> Remover Pernoite
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center gap-4 text-sm mb-3">
                <div className="flex items-center text-muted-foreground font-medium">
                  {format(new Date(o.checkinDate), 'dd MMM yy', { locale: ptBR })}
                  {o.checkoutDate &&
                    ` - ${format(new Date(o.checkoutDate), 'dd MMM yy', { locale: ptBR })}`}
                </div>
                <div className="flex items-center font-semibold">
                  {o.cost > 0 ? (
                    formatCurrency(o.cost)
                  ) : (
                    <span className="text-emerald-600 dark:text-emerald-500">Gratuito</span>
                  )}
                </div>
              </div>

              {o.rating > 0 && (
                <div className="flex items-center mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${i < o.rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted border-muted-foreground/30'}`}
                    />
                  ))}
                </div>
              )}

              {o.notes && (
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3 bg-muted/40 p-2.5 rounded-md italic border border-border/50">
                  "{o.notes}"
                </p>
              )}

              {o.amenities && o.amenities.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {o.amenities.map((a) => (
                    <Badge
                      key={a}
                      variant="secondary"
                      className="text-[10px] font-medium px-2 py-0.5 bg-muted"
                    >
                      {getAmenityIcon(a)} {translateAmenity(a)}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
