import { Link, Navigate } from 'react-router-dom'
import { ArrowRight, MapPin, ShieldCheck, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useAuthStore from '@/stores/useAuthStore'

export default function Index() {
  const { isAuthenticated, login, loginAsAdmin } = useAuthStore()

  if (isAuthenticated) {
    return <Navigate to="/app/dashboard" replace />
  }

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/40 via-background to-background" />
        <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-6 animate-fade-in-down">
            Novidade: Gestão de orçamentos v2.0
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl animate-fade-in-up">
            Viaje mais,{' '}
            <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              preocupe-se menos.
            </span>
          </h1>
          <p
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl animate-fade-in-up"
            style={{ animationDelay: '100ms' }}
          >
            A plataforma definitiva para nômades e viajantes de longa distância. Gerencie roteiros,
            finanças, documentos e a manutenção do seu veículo em um só lugar.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up"
            style={{ animationDelay: '200ms' }}
          >
            <Button
              size="lg"
              className="h-12 px-8 text-base shadow-lg hover:shadow-primary/25 transition-all"
              onClick={login}
            >
              Começar Agora <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base"
              onClick={loginAsAdmin}
            >
              Acesso Admin
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50 border-y">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Tudo que você precisa para a estrada
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Projetado especificamente para as necessidades de quem vive em movimento.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow group">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Gestão de Roteiros</h3>
              <p className="text-muted-foreground">
                Planeje cada parada, registre experiências e mantenha um diário organizado das suas
                viagens de longa duração.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow group">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Controle Financeiro</h3>
              <p className="text-muted-foreground">
                Acompanhe orçamentos por viagem, registre gastos com combustível, pedágios e
                alimentação com relatórios visuais.
              </p>
            </div>
            <div className="bg-card p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow group">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Garagem Virtual</h3>
              <p className="text-muted-foreground">
                Controle manutenções preventivas, armazene documentos do veículo e receba alertas
                antes que problemas aconteçam.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
