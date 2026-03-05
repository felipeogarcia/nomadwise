import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useNavigate } from 'react-router-dom'
import { Loader2, Ticket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useOnboarding } from '@/hooks/useOnboarding'

const profileFormSchema = z.object({
  fullName: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres.' }),
  phone: z.string().regex(/^\d{10,11}$/, 'Telefone deve conter 10 ou 11 dígitos numéricos.'),
  cpf: z.string().regex(/^\d{11}$/, 'CPF deve conter 11 dígitos numéricos.'),
  birthDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: 'Data de nascimento inválida.' }),
  couponCode: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function Onboarding() {
  const navigate = useNavigate()
  const { submitProfile, isLoading } = useOnboarding()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      cpf: '',
      birthDate: '',
      couponCode: '',
    },
  })

  async function onSubmit(data: ProfileFormValues) {
    const success = await submitProfile(data)
    if (success) {
      navigate('/app/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background/50 items-center justify-center p-4 animate-fade-in-up">
      <div className="w-full max-w-lg mb-8 text-center space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight">Falta pouco!</h1>
        <p className="text-muted-foreground">
          Precisamos de mais alguns detalhes para configurar sua conta Nomadwise.
        </p>
      </div>

      <Card className="w-full max-w-lg shadow-elevation border-muted">
        <CardHeader>
          <CardTitle className="text-xl">Complete seu Perfil</CardTitle>
          <CardDescription>Suas informações são mantidas de forma segura.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="João da Silva" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <Input placeholder="Apenas números" maxLength={11} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 11999999999" maxLength={11} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Nascimento</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4 border-t">
                <FormField
                  control={form.control}
                  name="couponCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Ticket className="h-4 w-4 text-primary" />
                        Código de Cupom{' '}
                        <span className="text-muted-foreground font-normal">(Opcional)</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: NOMAD2024" className="uppercase" {...field} />
                      </FormControl>
                      <FormDescription>Insira seu código promocional, se tiver um.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 text-base shadow-md"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Validando e Salvando...
                  </>
                ) : (
                  'Finalizar Cadastro'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
