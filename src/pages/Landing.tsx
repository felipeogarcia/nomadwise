import { Link, Navigate } from 'react-router-dom'
import { ArrowRight, CheckCircle2, ChevronDown, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import useAuthStore from '@/stores/useAuthStore'
import { features, testimonials, faqs } from './landing/data'

export default function Landing() {
  const { user, isAuthenticated, login } = useAuthStore()

  if (isAuthenticated) {
    return <Navigate to={user?.status === 'active' ? '/app/dashboard' : '/onboarding'} replace />
  }

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col w-full">
      <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center py-20 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/40 via-background to-background" />
        <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 max-w-5xl animate-fade-in-up">
            Sua vida na estrada,{' '}
            <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              finalmente organizada.
            </span>
          </h1>
          <p
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl animate-fade-in-up"
            style={{ animationDelay: '100ms' }}
          >
            A plataforma definitiva para quem vive em movimento. Roteiros, finanças e manutenção do
            veículo em um único lugar.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up"
            style={{ animationDelay: '200ms' }}
          >
            <Button
              size="lg"
              className="h-14 px-8 text-lg shadow-lg hover:shadow-primary/25 transition-all"
              asChild
            >
              <Link
                to="/login"
                onClick={(e) => {
                  e.preventDefault()
                  login()
                }}
              >
                Começar grátis <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg" asChild>
              <a href="#features" onClick={scrollTo('features')}>
                Ver como funciona
              </a>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground hidden md:block">
          <ChevronDown className="h-8 w-8" />
        </div>
      </section>

      <section id="features" className="py-24 bg-muted/40 border-y">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Tudo que você precisa para a estrada
            </h2>
            <p className="text-lg text-muted-foreground">
              Projetado especificamente para as necessidades de quem vive em movimento.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <Card
                key={i}
                className="bg-card/50 backdrop-blur border shadow-sm hover:-translate-y-1 transition-all group"
              >
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-all">
                    <f.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{f.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Quem usa, recomenda
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <Card key={i} className="bg-card border shadow-sm h-full flex flex-col">
                <CardHeader>
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-lg italic text-muted-foreground">"{t.content}"</p>
                </CardContent>
                <CardFooter className="flex items-center gap-4 border-t pt-6 mt-auto">
                  <Avatar>
                    <AvatarImage src={t.avatar} alt={t.name} />
                    <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold leading-none">{t.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{t.role}</p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 bg-muted/40 border-y">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center">
          <div className="mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Simples e transparente
            </h2>
          </div>
          <Card className="w-full max-w-md border-primary/50 shadow-xl shadow-primary/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
              LANÇAMENTO
            </div>
            <CardHeader className="text-center pb-8 pt-10">
              <CardTitle className="text-2xl mb-2">Pioneiros</CardTitle>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl font-extrabold">Grátis</span>
              </div>
              <CardDescription className="text-base mt-2">
                Acesso total aos recursos premium por tempo limitado.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 text-left">
                {[
                  'Roteiros ilimitados',
                  'Gestão financeira completa',
                  'Múltiplos veículos',
                  'Armazenamento de documentos',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-8 pb-10">
              <Button size="lg" className="w-full h-14 text-lg" asChild>
                <Link
                  to="/login"
                  onClick={(e) => {
                    e.preventDefault()
                    login()
                  }}
                >
                  Garantir acesso
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section id="faq" className="py-24 bg-background">
        <div className="container px-4 md:px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Perguntas Frequentes
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  )
}
