import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import useDataStore from '@/stores/useDataStore'
import useFinanceStore from '@/stores/useFinanceStore'
import { TripSelector } from './components/TripSelector'
import { BudgetOverview } from './components/BudgetOverview'
import { CategoryManager } from './components/CategoryManager'
import { ExpenseList } from './components/ExpenseList'
import { FuelSummary } from './components/FuelSummary'
import { Loader2 } from 'lucide-react'

export default function FinancesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { trips } = useDataStore()
  const { loadTripData, activeTripId, isLoading } = useFinanceStore()

  const tripIdFromUrl = searchParams.get('trip')
  const defaultTripId = tripIdFromUrl || trips[0]?.id

  useEffect(() => {
    if (defaultTripId && defaultTripId !== activeTripId) {
      loadTripData(defaultTripId)
      if (!tripIdFromUrl) {
        setSearchParams({ trip: defaultTripId }, { replace: true })
      }
    }
  }, [defaultTripId, activeTripId, loadTripData, setSearchParams, tripIdFromUrl])

  const handleTripChange = (newTripId: string) => {
    setSearchParams({ trip: newTripId })
  }

  if (!defaultTripId) {
    return (
      <div className="text-center p-12 text-muted-foreground">
        Nenhuma viagem encontrada. Por favor, crie uma viagem primeiro.
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Finanças</h1>
        <TripSelector value={activeTripId || defaultTripId} onChange={handleTripChange} />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <BudgetOverview />
          <FuelSummary />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4">
              <CategoryManager />
            </div>
            <div className="lg:col-span-8">
              <ExpenseList />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
