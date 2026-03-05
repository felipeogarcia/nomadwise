import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Activity } from 'lucide-react'
import useFinanceStore from '@/stores/useFinanceStore'

export function FuelSummary() {
  const { expenses } = useFinanceStore()

  const chartData = useMemo(() => {
    const fuelExps = expenses
      .filter((e) => e.isFuel && e.odometer && e.liters)
      .sort((a, b) => (a.odometer || 0) - (b.odometer || 0))

    const data = []
    for (let i = 1; i < fuelExps.length; i++) {
      const prev = fuelExps[i - 1]
      const curr = fuelExps[i]
      const km = (curr.odometer || 0) - (prev.odometer || 0)
      const liters = curr.liters || 1
      const eff = km / liters

      if (eff > 0 && eff < 100) {
        data.push({
          date: new Date(curr.date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
          }),
          efficiency: parseFloat(eff.toFixed(2)),
        })
      }
    }
    return data
  }, [expenses])

  if (chartData.length === 0) return null

  const chartConfig = {
    efficiency: { label: 'Eficiência (km/L)', color: 'hsl(var(--primary))' },
  }

  const avgEff = chartData.reduce((s, d) => s + d.efficiency, 0) / chartData.length

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Evolução de Consumo
        </CardTitle>
        <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
          Média: {avgEff.toFixed(1)} km/L
        </span>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full mt-4">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} />
            <YAxis tickLine={false} axisLine={false} tickMargin={10} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="efficiency"
              stroke="var(--color-efficiency)"
              strokeWidth={3}
              dot={{ r: 4, fill: 'var(--color-efficiency)' }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
