import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Banknote, Wallet, TrendingDown } from 'lucide-react'
import useFinanceStore from '@/stores/useFinanceStore'
import useDataStore from '@/stores/useDataStore'
import { formatCurrency } from '@/lib/utils'

export function BudgetOverview() {
  const { expenses, activeTripId } = useFinanceStore()
  const { trips } = useDataStore()

  const trip = trips.find((t) => t.id === activeTripId)
  const budget = trip?.budget || 0

  const spent = expenses.reduce((sum, exp) => sum + exp.finalAmount, 0)
  const cashSpent = expenses
    .filter((e) => e.paymentMethod === 'cash')
    .reduce((sum, exp) => sum + exp.finalAmount, 0)
  const remaining = budget - spent

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Orçamento Restante</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(remaining)}</div>
          <p className="text-xs text-muted-foreground mt-1">De {formatCurrency(budget)} totais</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Gasto</CardTitle>
          <TrendingDown className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">{formatCurrency(spent)}</div>
          <p className="text-xs text-muted-foreground mt-1">Em {expenses.length} registros</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Gasto em Espécie</CardTitle>
          <Banknote className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-500">{formatCurrency(cashSpent)}</div>
          <p className="text-xs text-muted-foreground mt-1">Impacto direto no caixa</p>
        </CardContent>
      </Card>
    </div>
  )
}
