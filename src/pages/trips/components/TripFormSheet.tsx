import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Trip } from '@/types'
import { useTrips } from '@/hooks/useTrips'
import useDataStore from '@/stores/useDataStore'

const tripSchema = z
  .object({
    title: z.string().min(3, 'Título deve ter no mínimo 3 caracteres'),
    destination: z.string().min(2, 'Destino obrigatório'),
    status: z.enum(['planejada', 'em_andamento', 'concluida']),
    budget: z.coerce.number().min(0, 'Orçamento não pode ser negativo'),
    startDate: z.string().min(10, 'Data inicial obrigatória'),
    endDate: z.string().optional(),
    vehicleId: z.string().optional(),
    estimatedKm: z.coerce.number().min(0).optional(),
  })
  .refine(
    (data) => {
      if (data.endDate && new Date(data.endDate) < new Date(data.startDate)) return false
      return true
    },
    { message: 'Data final deve ser após a inicial', path: ['endDate'] },
  )

type FormData = z.infer<typeof tripSchema>

interface TripFormSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  trip: Trip | null
}

export default function TripFormSheet({ open, onOpenChange, trip }: TripFormSheetProps) {
  const { create, update } = useTrips()
  const { vehicles } = useDataStore()

  const form = useForm<FormData>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      title: '',
      destination: '',
      status: 'planejada',
      budget: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      vehicleId: 'none',
      estimatedKm: 0,
    },
  })

  useEffect(() => {
    if (trip && open) {
      form.reset({
        title: trip.title,
        destination: trip.destination,
        status: trip.status,
        budget: trip.budget,
        startDate: trip.startDate,
        endDate: trip.endDate || '',
        vehicleId: trip.vehicleId || 'none',
        estimatedKm: trip.estimatedKm || 0,
      })
    } else if (open) {
      form.reset({
        title: '',
        destination: '',
        status: 'planejada',
        budget: 0,
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        vehicleId: 'none',
        estimatedKm: 0,
      })
    }
  }, [trip, form, open])

  const onSubmit = (data: FormData) => {
    const payload = {
      ...data,
      vehicleId: data.vehicleId === 'none' ? undefined : data.vehicleId,
      endDate: data.endDate || undefined,
    }
    if (trip) update(trip.id, payload)
    else create(payload)
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 h-[100dvh]">
        <div className="px-6 py-4 border-b">
          <SheetHeader>
            <SheetTitle>{trip ? 'Editar Viagem' : 'Nova Viagem'}</SheetTitle>
            <SheetDescription>Preencha os detalhes da sua aventura.</SheetDescription>
          </SheetHeader>
        </div>

        <ScrollArea className="flex-1 px-6 py-4">
          <Form {...form}>
            <form id="trip-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pb-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título da Expedição</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Patagônia 2024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="destination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destino</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Ushuaia" {...field} />
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
                          <SelectItem value="planejada">Planejada</SelectItem>
                          <SelectItem value="em_andamento">Em Andamento</SelectItem>
                          <SelectItem value="concluida">Concluída</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data Inicial</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data Final</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Orçamento (R$)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="estimatedKm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Distância (KM)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 5000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="vehicleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Veículo</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um veículo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">Nenhum veículo</SelectItem>
                        {vehicles.map((v) => (
                          <SelectItem key={v.id} value={v.id}>
                            {v.nickname} ({v.model})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Qual veículo te levará nessa viagem?</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>

        <div className="p-6 border-t bg-background">
          <Button type="submit" form="trip-form" className="w-full">
            {trip ? 'Salvar Alterações' : 'Criar Viagem'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
