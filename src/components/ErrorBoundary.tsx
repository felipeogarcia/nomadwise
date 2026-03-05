import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center animate-fade-in">
          <AlertTriangle className="h-16 w-16 text-destructive mb-6 opacity-90" />
          <h2 className="text-3xl font-bold tracking-tight mb-3">Ops! Algo deu errado.</h2>
          <p className="text-muted-foreground mb-8 max-w-md text-lg">
            Encontramos um erro inesperado ao processar esta requisição. Nossa equipe já foi
            notificada.
          </p>
          <Button size="lg" onClick={() => this.setState({ hasError: false })}>
            Tentar Novamente
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
