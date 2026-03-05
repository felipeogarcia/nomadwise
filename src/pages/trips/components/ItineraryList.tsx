import { useState, useRef } from 'react'
import {
  Plus,
  GripVertical,
  MoreVertical,
  Calendar,
  CheckCircle2,
  CircleDashed,
  XCircle,
} from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useItinerary } from '@/hooks/useItinerary'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import StopFormSheet from './StopFormSheet'
import { ItineraryStop } from '@/types'
import { cn } from '@/lib/utils'

interface ItineraryListProps {
  tripId: string
}

export default function ItineraryList({ tripId }: ItineraryListProps) {
  const { stops, addStop, updateStop, deleteStop, reorderStops } = useItinerary(tripId)

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingStop, setEditingStop] = useState<ItineraryStop | null>(null)

  // Drag and Drop State
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null)
  const dragItem = useRef<number | null>(null)
  const dragOverItem = useRef<number | null>(null)

  const handleDragStart = (e: React.DragEvent, index: number) => {
    dragItem.current = index
    setDraggedIdx(index)
    e.dataTransfer.effectAllowed = 'move'
    // Hack to hide HTML5 drag ghost image or just make it subtle
    if (e.target instanceof HTMLElement) {
      e.dataTransfer.setDragImage(e.target, 20, 20)
    }
  }

  const handleDragEnter = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    dragOverItem.current = index
  }

  const handleDragEnd = () => {
    if (
      dragItem.current !== null &&
      dragOverItem.current !== null &&
      dragItem.current !== dragOverItem.current
    ) {
      reorderStops(dragItem.current, dragOverItem.current)
    }
    dragItem.current = null
    dragOverItem.current = null
    setDraggedIdx(null)
  }

  const openNewForm = () => {
    setEditingStop(null)
    setIsFormOpen(true)
  }

  const openEditForm = (stop: ItineraryStop) => {
    setEditingStop(stop)
    setIsFormOpen(true)
  }

  const handleSave = (data: any) => {
    if (editingStop) updateStop(editingStop.id, data)
    else addStop(data)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'visited':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case 'skipped':
        return <XCircle className="h-4 w-4 text-muted-foreground" />
      default:
        return <CircleDashed className="h-4 w-4 text-primary" />
    }
  }

  return (
    <div className="flex flex-col h-full relative bg-muted/10">
      <div className="px-4 py-3 border-b bg-background flex items-center justify-between z-10 shrink-0">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          Itinerário{' '}
          <Badge variant="secondary" className="font-mono">
            {stops.length}
          </Badge>
        </h3>
        <Button size="sm" onClick={openNewForm} className="h-8">
          <Plus className="h-4 w-4 mr-1" /> Nova Parada
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3" onDragOver={(e) => e.preventDefault()}>
          {stops.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg bg-background">
              <p className="text-sm mb-4">Nenhuma parada cadastrada no roteiro.</p>
              <Button variant="outline" size="sm" onClick={openNewForm}>
                Começar a planejar
              </Button>
            </div>
          ) : (
            stops.map((stop, index) => (
              <div
                key={stop.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragEnter={(e) => handleDragEnter(e, index)}
                onDragEnd={handleDragEnd}
                className={cn(
                  'group relative flex items-start gap-3 p-3 bg-background border rounded-lg shadow-sm transition-all duration-200',
                  draggedIdx === index && 'opacity-40 scale-95 border-primary',
                  stop.status === 'skipped' && 'opacity-70 bg-muted/50',
                )}
              >
                <div className="mt-1 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground opacity-50 group-hover:opacity-100 transition-opacity">
                  <GripVertical className="h-5 w-5" />
                </div>

                <div className="flex flex-col items-center mt-1 w-6 shrink-0">
                  <div className="h-6 w-6 rounded-full bg-secondary text-xs font-bold flex items-center justify-center mb-1">
                    {index + 1}
                  </div>
                  {index < stops.length - 1 && <div className="w-0.5 h-full bg-border" />}
                </div>

                <div className="flex-1 min-w-0 py-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className={cn(
                        'font-medium text-sm truncate',
                        stop.status === 'visited' && 'text-muted-foreground',
                      )}
                    >
                      {stop.name}
                    </h4>
                    <div className="flex items-center gap-2 shrink-0">
                      {getStatusIcon(stop.status)}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditForm(stop)}>
                            Editar Detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              updateStop(stop.id, {
                                status: stop.status === 'visited' ? 'planned' : 'visited',
                              })
                            }
                          >
                            Marcar como {stop.status === 'visited' ? 'Planejado' : 'Visitado'}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => deleteStop(stop.id)}
                            className="text-destructive"
                          >
                            Remover Parada
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {stop.address && (
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{stop.address}</p>
                  )}

                  {stop.date && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2 bg-muted w-fit px-2 py-0.5 rounded-sm">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(stop.date), 'dd MMM yy', { locale: ptBR })}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      <StopFormSheet
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        stop={editingStop}
        onSave={handleSave}
      />
    </div>
  )
}
