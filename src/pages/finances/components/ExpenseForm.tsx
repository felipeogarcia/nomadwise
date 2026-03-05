import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Plus, RefreshCw } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { toast } from '@/hooks/use-toast'
import useFinanceStore from '@/stores/useFinanceStore'
import { formatCurrency, cn } from '@/lib/utils'

const expenseSchema = z
  .object({
    description: z.string().min(1, 'Descrição é obrigatória'),
    amount: z.coerce.number().min(0.01, 'Maior que zero'),
    currency: z.string().min(1, 'Obrigatório'),
    exchangeRate: z.coerce.number().min(0.0001, 'Taxa inválida'),
    categoryId: z.string().optional(),
    date: z.string().min(1, 'Obrigatório'),
    paymentMethod: z.string().min(1, 'Obrigatório'),
    iofApplied: z.boolean().default(false),
    isFuel: z.boolean().default(false),
    liters: z.coerce.number().optional(),
    odometer: z.coerce.number().optional(),
  })
  .refine((data) => !data.isFuel || (!!data.liters && !!data.odometer), {
    message: 'Litros e Odômetro são obrigatórios para combustível',
    path: ['liters'],
  })

export function ExpenseForm() {
  const { categories, addExpense, activeTripId } = useFinanceStore()
  const [open, setOpen] = useState(false)
  const [isLoadingRate, setIsLoadingRate] = useState(false)

  const form = useForm<z.infer<typeof expenseSchema>>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      description: '',
      amount: 0,
      currency: 'BRL',
      exchangeRate: 1,
      date: new Date().toISOString().slice(0, 16),
      paymentMethod: 'credit',
      iofApplied: false,
      isFuel: false,
      categoryId: categories[0]?.id,
    },
  })

  const currency = form.watch('currency')
  const amount = form.watch('amount')
  const rate = form.watch('exchangeRate')
  const iof = form.watch('iofApplied')
  const isFuel = form.watch('isFuel')

  const fetchRate = async () => {
    if (currency === 'BRL') {
      form.setValue('exchangeRate', 1)
      return
    }
    setIsLoadingRate(true)
    try {
      const res = await fetch(`https://economia.awesomeapi.com.br/last/${currency}-BRL`)
      if (!res.ok) throw new Error()
      const data = await res.json()
      form.setValue('exchangeRate', parseFloat(data[`${currency}BRL`].ask))
      toast({ title: 'Cotação atualizada', description: `Taxa obtida com sucesso.` })
    } catch {
      toast({ title: 'Erro', description: 'Insira manualmente.', variant: 'destructive' })
    } finally {
      setIsLoadingRate(false)
    }
  }

  const previewAmount = (amount || 0) * (rate || 1) * (iof ? 1.0538 : 1)

  const onSubmit = async (values: z.infer<typeof expenseSchema>) => {
    if (!activeTripId) return
    const finalAmount = values.amount * values.exchangeRate * (values.iofApplied ? 1.0538 : 1)
    await addExpense({
      ...values,
      tripId: activeTripId,
      finalAmount,
      date: new Date(values.date).toISOString(),
    })
    setOpen(false)
    form.reset()
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nova Despesa
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Registrar Despesa</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Valor Original</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem className="w-24">
                    <FormLabel>Moeda</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="BRL">BRL</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="ARS">ARS</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            {currency !== 'BRL' && (
              <div className="flex gap-4 items-end">
                <FormField
                  control={form.control}
                  name="exchangeRate"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Taxa Câmbio</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.0001" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={fetchRate}
                  disabled={isLoadingRate}
                  className="mb-2"
                >
                  <RefreshCw className={cn('h-4 w-4', isLoadingRate && 'animate-spin')} />
                </Button>
              </div>
            )}
            {currency !== 'BRL' && (
              <FormField
                control={form.control}
                name="iofApplied"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Aplicar IOF</FormLabel>
                      <FormDescription>Calcula +5.38% sobre o valor.</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Categoria</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Método</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="credit">Crédito</SelectItem>
                        <SelectItem value="debit">Débito</SelectItem>
                        <SelectItem value="cash">Dinheiro</SelectItem>
                        <SelectItem value="pix">PIX</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFuel"
              render={({ field }) => (
                <FormItem className="flex justify-between items-center rounded-lg border p-4 bg-muted/20">
                  <div className="space-y-0.5">
                    <FormLabel>É abastecimento?</FormLabel>
                    <FormDescription>Habilita métricas de combustível.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
            {isFuel && (
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="liters"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Litros</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="odometer"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Odômetro</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            <div className="p-4 bg-primary/10 rounded-lg text-center my-6">
              <span className="text-sm text-muted-foreground block mb-1">
                Custo Final Estimado (BRL)
              </span>
              <span className="text-2xl font-bold text-primary">
                {formatCurrency(previewAmount)}
              </span>
            </div>
            <Button type="submit" className="w-full">
              Salvar Despesa
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
