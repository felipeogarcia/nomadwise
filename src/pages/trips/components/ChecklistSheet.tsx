import { useState } from 'react'
import { Plus, Trash2, CheckCircle2 } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useChecklist } from '@/hooks/useChecklist'
import { Trip } from '@/types'

interface ChecklistSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  trip: Trip
}

export default function ChecklistSheet({ open, onOpenChange, trip }: ChecklistSheetProps) {
  const { items, categories, toggleStatus, addCustomItem, deleteCustomItem } = useChecklist(trip.id)
  const [newItemTitles, setNewItemTitles] = useState<Record<string, string>>({})

  const completedCount = items.filter((i) => i.isCompleted).length
  const progress = items.length > 0 ? (completedCount / items.length) * 100 : 0

  const handleAddItem = (categoryId: string) => {
    const title = newItemTitles[categoryId]?.trim()
    if (title) {
      addCustomItem(categoryId, title)
      setNewItemTitles((prev) => ({ ...prev, [categoryId]: '' }))
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto flex flex-col h-[100dvh]">
        <SheetHeader className="pb-6 pt-2 border-b">
          <SheetTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Checklist Pré-viagem
          </SheetTitle>
          <SheetDescription>
            Preparativos para: <span className="font-semibold text-foreground">{trip.title}</span>
          </SheetDescription>

          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground font-medium">Itens concluídos</span>
              <span className="font-semibold text-primary">
                {completedCount} de {items.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </SheetHeader>

        <div className="flex-1 py-6 overflow-y-auto pr-2 -mr-2">
          <Accordion
            type="multiple"
            defaultValue={categories.map((c) => c.id)}
            className="space-y-4"
          >
            {categories.map((category) => {
              const catItems = items.filter((i) => i.categoryId === category.id)
              const completedCatItems = catItems.filter((i) => i.isCompleted).length

              return (
                <AccordionItem
                  key={category.id}
                  value={category.id}
                  className="border rounded-lg px-4 bg-card shadow-sm data-[state=open]:border-primary/20"
                >
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-2 font-semibold">
                      {category.title}
                      <span className="text-xs font-medium bg-muted/80 text-muted-foreground px-2 py-0.5 rounded-full ml-2">
                        {completedCatItems}/{catItems.length}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 pb-5 space-y-3">
                    {catItems.map((item) => (
                      <div key={item.id} className="flex items-start gap-3 group/item">
                        <Checkbox
                          id={`item-${item.id}`}
                          checked={item.isCompleted}
                          onCheckedChange={(c) => toggleStatus(item.id, !!c)}
                          className="mt-0.5"
                        />
                        <label
                          htmlFor={`item-${item.id}`}
                          className={`flex-1 text-sm cursor-pointer leading-tight transition-colors ${item.isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}
                        >
                          {item.title}
                        </label>
                        {item.isCustom && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover/item:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10 -mt-1 -mr-1"
                            onClick={() => deleteCustomItem(item.id)}
                            title="Remover item"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                    ))}

                    <div className="flex gap-2 mt-4 pt-3 border-t border-dashed border-border/60">
                      <Input
                        placeholder="Adicionar novo item..."
                        className="h-8 text-sm bg-muted/30"
                        value={newItemTitles[category.id] || ''}
                        onChange={(e) =>
                          setNewItemTitles((p) => ({ ...p, [category.id]: e.target.value }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddItem(category.id)
                        }}
                      />
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0 shrink-0"
                        disabled={!newItemTitles[category.id]?.trim()}
                        onClick={() => handleAddItem(category.id)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  )
}
