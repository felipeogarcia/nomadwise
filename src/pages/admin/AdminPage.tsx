import { ShieldAlert, Users, Tag, ListChecks } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AdminPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 border-b pb-4 border-destructive/20">
        <ShieldAlert className="h-8 w-8 text-destructive" />
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Painel Administrativo</h2>
          <p className="text-muted-foreground">
            Área restrita. Acesso permitido apenas para administradores.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-border/50">
          <CardHeader>
            <Tag className="h-6 w-6 text-primary mb-2" />
            <CardTitle>Gestão de Cupons</CardTitle>
            <CardDescription>Crie e gerencie cupons de desconto para assinaturas.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" className="w-full">
              Gerenciar Cupons
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <ListChecks className="h-6 w-6 text-primary mb-2" />
            <CardTitle>Templates de Checklist</CardTitle>
            <CardDescription>Crie templates globais que os usuários podem clonar.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" className="w-full">
              Editar Templates
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <Users className="h-6 w-6 text-primary mb-2" />
            <CardTitle>Métricas de Usuários</CardTitle>
            <CardDescription>Visualize o crescimento da plataforma e retenção.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" className="w-full">
              Ver Relatórios
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
