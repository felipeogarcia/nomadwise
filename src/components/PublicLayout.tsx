import { Outlet, Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

export default function PublicLayout() {
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
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground leading-loose text-center md:text-left">
            © 2024 Nomadwise. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
