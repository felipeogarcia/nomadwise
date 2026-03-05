import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useNavigate } from 'react-router-dom'
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
import useAuthStore from '@/stores/useAuthStore'

const profileFormSchema = z.object({
  fullName: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres.' }),
  phone: z.string().min(10, { message: 'Telefone inválido.' }),
  cpf: z
    .string()
    .length(11, { message: 'CPF deve conter 11 dígitos numéricos.' })
    .regex(/^\d+$/, 'Apenas números'),
  birthDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: 'Data de nascimento inválida.' }),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function Onboarding() {
  const { completeProfile } = useAuthStore()
  const navigate = useNavigate()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      cpf: '',
      birthDate: '',
    },
  })

  function onSubmit(data: ProfileFormValues) {
    completeProfile(data)
    navigate('/app/dashboard')
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center animate-fade-in-up">
      <Card className="w-full max-w-lg shadow-elevation border-muted">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Complete seu Perfil</CardTitle>
          <CardDescription>
            Precisamos de mais alguns detalhes para configurar sua conta Nomadwise.
          </CardDescription>
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
                        <Input placeholder="(11) 99999-9999" {...field} />
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
              <Button type="submit" className="w-full h-11 text-base shadow-md">
                Finalizar Cadastro
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
