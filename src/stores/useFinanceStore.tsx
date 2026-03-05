import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { financeService } from '@/services/finances'
import { Expense, ExpenseCategory } from '@/types/finances'
import { toast } from '@/hooks/use-toast'

interface FinanceState {
  categories: ExpenseCategory[]
  expenses: Expense[]
  isLoading: boolean
  activeTripId: string | null
  loadTripData: (tripId: string) => Promise<void>
  addCategory: (category: Omit<ExpenseCategory, 'id'>) => Promise<void>
  deleteCategory: (id: string) => Promise<void>
  addExpense: (expense: Omit<Expense, 'id'>) => Promise<void>
  deleteExpense: (id: string) => Promise<void>
}

const FinanceContext = createContext<FinanceState | undefined>(undefined)

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<ExpenseCategory[]>([])
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTripId, setActiveTripId] = useState<string | null>(null)

  const loadTripData = useCallback(async (tripId: string) => {
    setIsLoading(true)
    setActiveTripId(tripId)
    try {
      let cats = await financeService.getCategories(tripId)
      let exps = await financeService.getExpenses(tripId)

      if (cats.length === 0 && exps.length === 0) {
        await financeService.seedMockData(tripId)
        cats = await financeService.getCategories(tripId)
        exps = await financeService.getExpenses(tripId)
      }

      setCategories(cats)
      setExpenses(exps)
    } catch (e) {
      console.error(e)
      toast({
        title: 'Erro',
        description: 'Falha ao carregar dados financeiros.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  const addCategory = async (category: Omit<ExpenseCategory, 'id'>) => {
    const tempId = crypto.randomUUID()
    setCategories((prev) => [...prev, { ...category, id: tempId }])
    try {
      const saved = await financeService.addCategory(category)
      setCategories((prev) => prev.map((c) => (c.id === tempId ? saved : c)))
      toast({ title: 'Sucesso', description: 'Categoria criada.' })
    } catch (e) {
      setCategories((prev) => prev.filter((c) => c.id !== tempId))
      toast({ title: 'Erro', description: 'Falha ao criar categoria.', variant: 'destructive' })
    }
  }

  const deleteCategory = async (id: string) => {
    if (id.length > 36) return // Prevent deleting temporary optimistic rows
    const backup = [...categories]
    setCategories((prev) => prev.filter((c) => c.id !== id))
    try {
      await financeService.deleteCategory(id)
      toast({ title: 'Sucesso', description: 'Categoria removida.' })
    } catch (e) {
      setCategories(backup)
      toast({ title: 'Erro', description: 'Falha ao remover categoria.', variant: 'destructive' })
    }
  }

  const addExpense = async (expense: Omit<Expense, 'id'>) => {
    const tempId = crypto.randomUUID()
    setExpenses((prev) => [{ ...expense, id: tempId }, ...prev])
    try {
      const saved = await financeService.addExpense(expense)
      setExpenses((prev) =>
        prev
          .map((e) => (e.id === tempId ? saved : e))
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      )
      toast({ title: 'Sucesso', description: 'Despesa registrada.' })
    } catch (e) {
      setExpenses((prev) => prev.filter((e) => e.id !== tempId))
      toast({ title: 'Erro', description: 'Falha ao registrar despesa.', variant: 'destructive' })
    }
  }

  const deleteExpense = async (id: string) => {
    if (id.length > 36) return
    const backup = [...expenses]
    setExpenses((prev) => prev.filter((e) => e.id !== id))
    try {
      await financeService.deleteExpense(id)
      toast({ title: 'Sucesso', description: 'Despesa removida.' })
    } catch (e) {
      setExpenses(backup)
      toast({ title: 'Erro', description: 'Falha ao remover despesa.', variant: 'destructive' })
    }
  }

  return React.createElement(
    FinanceContext.Provider,
    {
      value: {
        categories,
        expenses,
        isLoading,
        activeTripId,
        loadTripData,
        addCategory,
        deleteCategory,
        addExpense,
        deleteExpense,
      },
    },
    children,
  )
}

export default function useFinanceStore() {
  const context = useContext(FinanceContext)
  if (context === undefined)
    throw new Error('useFinanceStore deve ser usado dentro de um FinanceProvider')
  return context
}
