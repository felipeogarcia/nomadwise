import { Suspense } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Compass, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './ThemeToggle'
import { ErrorBoundary } from './ErrorBoundary'
import useAuthStore from '@/stores/useAuthStore'

const PageLoader = () => (
  <div className="flex-1 flex items-center justify-center min-h-[50vh]">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
)

export default function PublicLayout() {
  const { login } = useAuthStore()

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground transition-colors duration-300">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight group">
            <Compass className="h-6 w-6 text-primary group-hover:rotate-45 transition-transform duration-500" />
            <span>
              Nomad<span className="text-primary">wise</span>
            </span>
          </Link>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link
                  to="/login"
                  onClick={(e) => {
                    e.preventDefault()
                    login()
                  }}
                >
                  Entrar
                </Link>
              </Button>
              <ThemeToggle />
            </div>
            <Button size="sm" className="md:h-10 md:px-4 md:py-2" asChild>
              <Link
                to="/login"
                onClick={(e) => {
                  e.preventDefault()
                  login()
                }}
              >
                Começar grátis
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>

      <footer className="bg-zinc-950 text-zinc-400 py-12 border-t border-zinc-900">
        <div className="container flex flex-col md:flex-row items-center md:items-start justify-between gap-8 px-4 md:px-6">
          <div className="flex flex-col items-center md:items-start gap-4 max-w-xs text-center md:text-left">
            <Link
              to="/"
              className="flex items-center gap-2 font-bold text-xl tracking-tight text-white group"
            >
              <Compass className="h-6 w-6 text-primary group-hover:rotate-45 transition-transform duration-500" />
              <span>
                Nomad<span className="text-primary">wise</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              A plataforma definitiva para nômades e viajantes de longa distância.
            </p>
          </div>
          <div className="flex gap-12 text-sm text-center md:text-left">
            <div className="flex flex-col gap-3">
              <h4 className="font-semibold text-zinc-100">Produto</h4>
              <a href="#features" className="hover:text-white transition-colors">
                Funcionalidades
              </a>
              <a href="#pricing" className="hover:text-white transition-colors">
                Preços
              </a>
              <a href="#faq" className="hover:text-white transition-colors">
                FAQ
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-semibold text-zinc-100">Legal</h4>
              <a href="#" className="hover:text-white transition-colors">
                Termos de Serviço
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Política de Privacidade
              </a>
            </div>
          </div>
        </div>
        <div className="container mt-12 pt-8 border-t border-zinc-900 flex flex-col items-center">
          <p className="text-sm">© 2024 Nomadwise. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
