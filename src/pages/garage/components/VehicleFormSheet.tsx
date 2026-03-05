import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Save, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Vehicle } from '@/types'

const vehicleSchema = z.object({
  nickname: z.string().min(1, 'Apelido é obrigatório'),
  type: z.enum(['moto', 'carro', 'motorhome', 'van', 'outro'], {
    required_error: 'Tipo é obrigatório',
  }),
  make: z.string().min(1, 'Marca é obrigatória'),
  model: z.string().min(1, 'Modelo é obrigatório'),
  year: z.coerce.number().min(1950, 'Ano inválido').max(new Date().getFullYear(), 'Ano no futuro'),
  plate: z.string().optional(),
  odometer: z.coerce.number().min(0, 'Não pode ser negativo'),
  tankCapacity: z.coerce.number().min(0, 'Não pode ser negativo'),
  nextMaintenance: z.string().optional(),
})

type VehicleFormValues = z.infer<typeof vehicleSchema>

interface Props {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  vehicle?: Vehicle
  onSubmit: (data: Omit<Vehicle, 'id' | 'imageUrl'>, photo?: File) => Promise<void>
}

export function VehicleFormSheet({ isOpen, onOpenChange, vehicle, onSubmit }: Props) {
  const [photo, setPhoto] = useState<File | undefined>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      nickname: '',
      type: 'carro',
      make: '',
      model: '',
      year: new Date().getFullYear(),
      plate: '',
      odometer: 0,
      tankCapacity: 50,
      nextMaintenance: '',
    },
  })

  useEffect(() => {
    if (isOpen) {
      if (vehicle) {
        form.reset({
          nickname: vehicle.nickname,
          type: vehicle.type,
          make: vehicle.make,
          model: vehicle.model,
          year: vehicle.year,
          plate: vehicle.plate || '',
          odometer: vehicle.odometer,
          tankCapacity: vehicle.tankCapacity,
          nextMaintenance: vehicle.nextMaintenance?.split('T')[0] || '',
        })
      } else {
        form.reset({
          nickname: '',
          type: 'carro',
          make: '',
          model: '',
          year: new Date().getFullYear(),
          plate: '',
          odometer: 0,
          tankCapacity: 50,
          nextMaintenance: '',
        })
      }
      setPhoto(undefined)
    }
  }, [isOpen, vehicle, form])

  const handleSubmit = async (values: VehicleFormValues) => {
    setIsSubmitting(true)
    try {
      await onSubmit(values as Omit<Vehicle, 'id' | 'imageUrl'>, photo)
      form.reset()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>{vehicle ? 'Editar Veículo' : 'Novo Veículo'}</SheetTitle>
          <SheetDescription>
            {vehicle
              ? 'Atualize as informações do seu veículo.'
              : 'Cadastre os detalhes do novo veículo da sua frota.'}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel>Apelido</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Bessie" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="col-span-2 sm:col-span-1">
                    <FormLabel>Tipo</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="carro">Carro</SelectItem>
                        <SelectItem value="moto">Moto</SelectItem>
                        <SelectItem value="motorhome">Motorhome</SelectItem>
                        <SelectItem value="van">Van/Camper</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="make"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marca</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: VW" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modelo</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Kombi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ano</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="plate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Placa</FormLabel>
                    <FormControl>
                      <Input placeholder="ABC-1234" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="odometer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hodômetro (km)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tankCapacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanque (L)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="nextMaintenance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Próxima Revisão (Opcional)</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Foto do Veículo (Opcional)</FormLabel>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-20 border-dashed bg-muted/30"
                  onClick={() => document.getElementById('photo-upload')?.click()}
                >
                  <Upload className="h-5 w-5 mr-3 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {photo ? photo.name : 'Selecionar imagem'}
                  </span>
                </Button>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setPhoto(e.target.files?.[0])}
                />
              </div>
            </FormItem>

            <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
              {isSubmitting ? (
                'Salvando...'
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" /> Salvar Veículo
                </>
              )}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
