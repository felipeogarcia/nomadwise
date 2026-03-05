import { useLocation, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { MapPinOff } from 'lucide-react'
import { Button } from '@/components/ui/button'

const NotFound = () => {
  const location = useLocation()

  useEffect(() => {
    console.error('404 Error: Rota não encontrada:', location.pathname)
  }, [location.pathname])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="text-center animate-fade-in-up">
        <MapPinOff className="h-20 w-20 mx-auto text-muted-foreground mb-6 opacity-80" />
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">404</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
          Parece que você pegou a saída errada. Essa página não existe no nosso mapa.
        </p>
        <Button asChild size="lg">
          <Link to="/">Voltar para o Início</Link>
        </Button>
      </div>
    </div>
  )
}

export default NotFound
