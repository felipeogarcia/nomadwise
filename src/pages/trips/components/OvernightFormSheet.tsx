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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { useOvernightStore, Overnight } from '@/stores/useOvernightStore'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Wifi, Droplet, Shield } from 'lucide-react'

const formSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  type: z.string().min(1, 'Tipo é obrigatório'),
  checkinDate: z.string().min(1, 'Data de check-in é obrigatória'),
  checkoutDate: z.string().optional(),
  cost: z.coerce.number().min(0, 'Custo não pode ser negativo').default(0),
  rating: z.array(z.number()).default([0]),
  notes: z.string().optional(),
  isPublic: z.boolean().default(false),
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
  amenities: z.array(z.string()).default([]),
})

type FormValues = z.infer<typeof formSchema>

interface OvernightFormSheetProps {
  tripId: string
  open: boolean
  onOpenChange: (open: boolean) => void
  overnight?: Overnight | null
}

export default function OvernightFormSheet({
  tripId,
  open,
  onOpenChange,
  overnight,
}: OvernightFormSheetProps) {
  const { addOvernight, updateOvernight } = useOvernightStore()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: 'campground',
      checkinDate: new Date().toISOString().split('T')[0],
      checkoutDate: '',
      cost: 0,
      rating: [0],
      notes: '',
      isPublic: false,
      lat: undefined,
      lng: undefined,
      amenities: [],
    },
  })

  useEffect(() => {
    if (open) {
      if (overnight) {
        form.reset({
          ...overnight,
          checkinDate: overnight.checkinDate.split('T')[0],
          checkoutDate: overnight.checkoutDate?.split('T')[0] || '',
          rating: [overnight.rating],
        })
      } else {
        form.reset({
          name: '',
          type: 'campground',
          checkinDate: new Date().toISOString().split('T')[0],
          checkoutDate: '',
          cost: 0,
          rating: [0],
          notes: '',
          isPublic: false,
          lat: undefined,
          lng: undefined,
          amenities: [],
        })
      }
    }
  }, [open, overnight, form])

  const onSubmit = (data: FormValues) => {
    if (data.checkoutDate && new Date(data.checkoutDate) < new Date(data.checkinDate)) {
      form.setError('checkoutDate', { message: 'O check-out não pode ser anterior ao check-in' })
      return
    }

    const payload = {
      ...data,
      tripId,
      rating: data.rating[0] || 0,
      checkinDate: new Date(data.checkinDate).toISOString(),
      checkoutDate: data.checkoutDate ? new Date(data.checkoutDate).toISOString() : undefined,
    }

    if (overnight) updateOvernight(overnight.id, payload)
    else addOvernight(payload)

    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>{overnight ? 'Editar Pernoite' : 'Registrar Pernoite'}</SheetTitle>
          <SheetDescription>
            Guarde os detalhes de onde você dormiu durante a viagem.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Local</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Camping da Serra" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="wild">Camping Selvagem</SelectItem>
                        <SelectItem value="campground">Camping Pago</SelectItem>
                        <SelectItem value="hotel">Hotel/Pousada</SelectItem>
                        <SelectItem value="hostel">Hostel</SelectItem>
                        <SelectItem value="other">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custo (R$)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="checkinDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Check-in</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="checkoutDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Check-out</FormLabel>
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
                name="lat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Latitude (Opcional)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="any"
                        placeholder="-15.78"
                        {...field}
                        value={field.value ?? ''}
                      />
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
                    <FormLabel>Longitude (Opcional)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="any"
                        placeholder="-47.92"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between">
                    <span>Avaliação</span>
                    <span className="font-bold text-primary">{field.value[0]} / 5</span>
                  </FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={5}
                      step={1}
                      value={field.value}
                      onValueChange={field.onChange}
                      className="py-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amenities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comodidades</FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="multiple"
                      value={field.value}
                      onValueChange={field.onChange}
                      className="justify-start gap-2"
                    >
                      <ToggleGroupItem
                        value="wifi"
                        aria-label="Toggle Wifi"
                        className="data-[state=on]:bg-primary/20 data-[state=on]:text-primary border"
                      >
                        <Wifi className="h-4 w-4 mr-2" /> Wi-Fi
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="water"
                        aria-label="Toggle Water"
                        className="data-[state=on]:bg-primary/20 data-[state=on]:text-primary border"
                      >
                        <Droplet className="h-4 w-4 mr-2" /> Água
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="security"
                        aria-label="Toggle Security"
                        className="data-[state=on]:bg-primary/20 data-[state=on]:text-primary border"
                      >
                        <Shield className="h-4 w-4 mr-2" /> Segurança
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anotações e Dicas</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Como foi a estadia? Algo a destacar?"
                      className="resize-none h-20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm mt-2">
                  <div className="space-y-0.5">
                    <FormLabel>Tornar Público</FormLabel>
                    <div className="text-xs text-muted-foreground">
                      Compartilhar localização com a comunidade
                    </div>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full mt-4">
              {overnight ? 'Salvar Alterações' : 'Adicionar Pernoite'}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
