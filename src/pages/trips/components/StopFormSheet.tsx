import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { MapPin, Info } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ItineraryStop } from '@/types'

const stopSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  address: z.string().optional(),
  date: z.string().optional(),
  status: z.enum(['planned', 'visited', 'skipped']),
  lat: z.coerce.number().optional().or(z.literal('')),
  lng: z.coerce.number().optional().or(z.literal('')),
  notes: z.string().optional(),
})

type FormData = z.infer<typeof stopSchema>

interface StopFormSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  stop: ItineraryStop | null
  onSave: (data: Omit<ItineraryStop, 'id' | 'tripId' | 'orderIndex'>) => void
}

export default function StopFormSheet({ open, onOpenChange, stop, onSave }: StopFormSheetProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(stopSchema),
    defaultValues: {
      name: '',
      address: '',
      date: '',
      status: 'planned',
      lat: '',
      lng: '',
      notes: '',
    },
  })

  useEffect(() => {
    if (open) {
      if (stop) {
        form.reset({
          name: stop.name,
          address: stop.address || '',
          date: stop.date || '',
          status: stop.status,
          lat: stop.lat ?? '',
          lng: stop.lng ?? '',
          notes: stop.notes || '',
        })
      } else {
        form.reset({
          name: '',
          address: '',
          date: '',
          status: 'planned',
          lat: '',
          lng: '',
          notes: '',
        })
      }
    }
  }, [stop, open, form])

  const onSubmit = (data: FormData) => {
    const payload = {
      ...data,
      lat: data.lat === '' ? undefined : Number(data.lat),
      lng: data.lng === '' ? undefined : Number(data.lng),
    }
    onSave(payload as any)
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 h-[100dvh]">
        <div className="px-6 py-4 border-b">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              {stop ? 'Editar Parada' : 'Nova Parada'}
            </SheetTitle>
            <SheetDescription>Defina os detalhes deste ponto no itinerário.</SheetDescription>
          </SheetHeader>
        </div>

        <ScrollArea className="flex-1 px-6 py-4">
          <Form {...form}>
            <form id="stop-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pb-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Local / Ponto</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Parque Nacional Tierra del Fuego" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data Planejada</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="planned">Planejado</SelectItem>
                          <SelectItem value="visited">Visitado</SelectItem>
                          <SelectItem value="skipped">Pulado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço / Referência</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: R. San Martín, Ushuaia" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="p-4 bg-muted/30 border rounded-lg space-y-4">
                <div className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Info className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
                  <p>
                    Coordenadas são necessárias para exibir a parada no mapa. Você pode copiá-las do
                    Google Maps clicando com o botão direito no local desejado.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="lat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input placeholder="-54.8019" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lng"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                          <Input placeholder="-68.3030" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Anotações</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="O que fazer, onde comer, dicas..."
                        className="resize-none h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>

        <div className="p-6 border-t bg-background">
          <Button type="submit" form="stop-form" className="w-full">
            {stop ? 'Salvar Alterações' : 'Adicionar ao Roteiro'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
