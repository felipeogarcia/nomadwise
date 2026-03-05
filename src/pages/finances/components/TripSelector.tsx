import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useDataStore from '@/stores/useDataStore'

interface TripSelectorProps {
  value: string
  onChange: (value: string) => void
}

export function TripSelector({ value, onChange }: TripSelectorProps) {
  const { trips } = useDataStore()

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full sm:w-[280px]">
        <SelectValue placeholder="Selecione uma viagem" />
      </SelectTrigger>
      <SelectContent>
        {trips.map((t) => (
          <SelectItem key={t.id} value={t.id}>
            {t.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
