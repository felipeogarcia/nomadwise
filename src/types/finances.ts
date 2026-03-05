export interface ExpenseCategory {
  id: string
  tripId: string
  name: string
  budget: number
  color: string
}

export interface Expense {
  id: string
  tripId: string
  categoryId?: string
  amount: number
  currency: string
  exchangeRate: number
  finalAmount: number
  iofApplied: boolean
  date: string
  description: string
  paymentMethod: string
  isFuel: boolean
  liters?: number
  odometer?: number
}
