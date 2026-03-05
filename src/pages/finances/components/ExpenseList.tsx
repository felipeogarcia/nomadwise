import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import useFinanceStore from '@/stores/useFinanceStore'
import { formatCurrency } from '@/lib/utils'
import { ExpenseForm } from './ExpenseForm'

export function ExpenseList() {
  const { expenses, categories, deleteExpense } = useFinanceStore()

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Histórico de Despesas</CardTitle>
        <ExpenseForm />
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-right">Valor Final</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Nenhuma despesa registrada.
                </TableCell>
              </TableRow>
            ) : (
              expenses.map((exp) => {
                const cat = categories.find((c) => c.id === exp.categoryId)
                return (
                  <TableRow key={exp.id}>
                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                      {format(new Date(exp.date), 'dd/MM/yy HH:mm')}
                    </TableCell>
                    <TableCell className="font-medium">
                      {exp.description}
                      {exp.isFuel && (
                        <Badge variant="outline" className="ml-2 text-[10px]">
                          Combustível
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {cat ? (
                        <Badge
                          style={{ backgroundColor: cat.color, color: '#fff' }}
                          variant="secondary"
                        >
                          {cat.name}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-xs">Sem categoria</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      {formatCurrency(exp.finalAmount)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteExpense(exp.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
