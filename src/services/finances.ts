import { supabase } from '@/lib/supabase/client'
import { Expense, ExpenseCategory } from '@/types/finances'

const mapCategory = (row: any): ExpenseCategory => ({
  id: row.id,
  tripId: row.trip_id,
  name: row.name,
  budget: Number(row.budget),
  color: row.color,
})

const mapExpense = (row: any): Expense => ({
  id: row.id,
  tripId: row.trip_id,
  categoryId: row.category_id,
  amount: Number(row.amount),
  currency: row.currency,
  exchangeRate: Number(row.exchange_rate),
  finalAmount: Number(row.final_amount),
  iofApplied: row.iof_applied,
  date: row.date,
  description: row.description,
  paymentMethod: row.payment_method,
  isFuel: row.is_fuel,
  liters: row.liters ? Number(row.liters) : undefined,
  odometer: row.odometer ? Number(row.odometer) : undefined,
})

export const financeService = {
  async getCategories(tripId: string) {
    const { data, error } = await supabase
      .from('expense_categories')
      .select('*')
      .eq('trip_id', tripId)
    if (error) throw error
    return data.map(mapCategory)
  },

  async addCategory(cat: Omit<ExpenseCategory, 'id'>) {
    const { data, error } = await supabase
      .from('expense_categories')
      .insert({
        trip_id: cat.tripId,
        name: cat.name,
        budget: cat.budget,
        color: cat.color,
      })
      .select()
      .single()
    if (error) throw error
    return mapCategory(data)
  },

  async deleteCategory(id: string) {
    const { error } = await supabase.from('expense_categories').delete().eq('id', id)
    if (error) throw error
  },

  async getExpenses(tripId: string) {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('trip_id', tripId)
      .order('date', { ascending: false })
    if (error) throw error
    return data.map(mapExpense)
  },

  async addExpense(exp: Omit<Expense, 'id'>) {
    const { data, error } = await supabase
      .from('expenses')
      .insert({
        trip_id: exp.tripId,
        category_id: exp.categoryId,
        amount: exp.amount,
        currency: exp.currency,
        exchange_rate: exp.exchangeRate,
        final_amount: exp.finalAmount,
        iof_applied: exp.iofApplied,
        date: exp.date,
        description: exp.description,
        payment_method: exp.paymentMethod,
        is_fuel: exp.isFuel,
        liters: exp.liters,
        odometer: exp.odometer,
      })
      .select()
      .single()
    if (error) throw error
    return mapExpense(data)
  },

  async deleteExpense(id: string) {
    const { error } = await supabase.from('expenses').delete().eq('id', id)
    if (error) throw error
  },

  async seedMockData(tripId: string) {
    const c1 = await this.addCategory({
      tripId,
      name: 'Combustível',
      budget: 2000,
      color: '#ef4444',
    })
    const c2 = await this.addCategory({
      tripId,
      name: 'Alimentação',
      budget: 1500,
      color: '#f59e0b',
    })
    const c3 = await this.addCategory({
      tripId,
      name: 'Hospedagem',
      budget: 3000,
      color: '#3b82f6',
    })

    const now = Date.now()
    await this.addExpense({
      tripId,
      categoryId: c1.id,
      amount: 250,
      currency: 'BRL',
      exchangeRate: 1,
      finalAmount: 250,
      iofApplied: false,
      date: new Date(now - 86400000 * 5).toISOString(),
      description: 'Posto Rota',
      paymentMethod: 'credit',
      isFuel: true,
      liters: 45,
      odometer: 15000,
    })
    await this.addExpense({
      tripId,
      categoryId: c1.id,
      amount: 280,
      currency: 'BRL',
      exchangeRate: 1,
      finalAmount: 280,
      iofApplied: false,
      date: new Date(now - 86400000 * 2).toISOString(),
      description: 'Posto Central',
      paymentMethod: 'credit',
      isFuel: true,
      liters: 50,
      odometer: 15500,
    })
    await this.addExpense({
      tripId,
      categoryId: c2.id,
      amount: 85,
      currency: 'BRL',
      exchangeRate: 1,
      finalAmount: 85,
      iofApplied: false,
      date: new Date().toISOString(),
      description: 'Almoço na estrada',
      paymentMethod: 'pix',
      isFuel: false,
    })
  },
}
