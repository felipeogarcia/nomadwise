import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import useFinanceStore from '@/stores/useFinanceStore'
import { formatCurrency } from '@/lib/utils'

const COLORS = ['#ef4444', '#f59e0b', '#10b981', '#0ea5e9', '#8b5cf6', '#ec4899']

export function CategoryManager() {
  const { categories, expenses, addCategory, deleteCategory, activeTripId } = useFinanceStore()
  const [name, setName] = useState('')
  const [budget, setBudget] = useState('')

  const handleAdd = () => {
    if (!name || !budget || !activeTripId) return
    const color = COLORS[categories.length % COLORS.length]
    addCategory({ tripId: activeTripId, name, budget: Number(budget), color })
    setName('')
    setBudget('')
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Categorias</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <Input
            placeholder="Nova categoria"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Limite"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-24"
          />
          <Button onClick={handleAdd} size="icon" className="shrink-0">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-5">
          {categories.map((cat) => {
            const spent = expenses
              .filter((e) => e.categoryId === cat.id)
              .reduce((s, e) => s + e.finalAmount, 0)
            const pct = Math.min((spent / cat.budget) * 100, 100)
            const indColor =
              pct >= 100 ? 'bg-destructive' : pct > 75 ? 'bg-amber-500' : 'bg-emerald-500'

            return (
              <div key={cat.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    {cat.name}
                  </span>
                  <span className="text-muted-foreground">
                    {formatCurrency(spent)} / {formatCurrency(cat.budget)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={pct} indicatorClassName={indColor} />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteCategory(cat.id)}
                    className="h-6 w-6 text-destructive shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )
          })}
          {categories.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              Nenhuma categoria criada.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
