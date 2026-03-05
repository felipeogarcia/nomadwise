import { useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react'

interface ExpirationBadgeProps {
  expiryDate?: string | null
}

export function ExpirationBadge({ expiryDate }: ExpirationBadgeProps) {
  const {
    status,
    label,
    colorClass,
    icon: Icon,
  } = useMemo(() => {
    if (!expiryDate) {
      return {
        status: 'none',
        label: 'Sem validade',
        colorClass: 'bg-muted text-muted-foreground hover:bg-muted/80',
        icon: CheckCircle2,
      }
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const expiry = new Date(expiryDate)
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24))

    if (diffDays < 0) {
      return {
        status: 'expired',
        label: 'Vencido',
        colorClass: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
        icon: AlertCircle,
      }
    }

    if (diffDays <= 90) {
      return {
        status: 'warning',
        label: `Vence em ${diffDays} dias`,
        colorClass:
          'bg-amber-500/15 text-amber-600 dark:text-amber-400 hover:bg-amber-500/25 border-transparent',
        icon: Clock,
      }
    }

    return {
      status: 'valid',
      label: 'Válido',
      colorClass:
        'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25 border-transparent',
      icon: CheckCircle2,
    }
  }, [expiryDate])

  return (
    <Badge variant="outline" className={`flex items-center gap-1.5 px-2.5 py-0.5 ${colorClass}`}>
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  )
}
