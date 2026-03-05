import React, { createContext, useContext, useState, ReactNode } from 'react'
import { toast } from '@/hooks/use-toast'
import { Trip, Vehicle, ChecklistItem, ChecklistCategory, ItineraryStop } from '@/types'

interface DataState {
  trips: Trip[]
  vehicles: Vehicle[]
  checklistItems: ChecklistItem[]
  categories: ChecklistCategory[]
  stops: ItineraryStop[]
  addTrip: (trip: Omit<Trip, 'id' | 'spent'>) => void
  updateTrip: (id: string, data: Partial<Trip>) => void
  deleteTrip: (id: string) => void
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => void
  deleteVehicle: (id: string) => void
  addChecklistItem: (item: Omit<ChecklistItem, 'id'>) => void
  updateChecklistItem: (id: string, data: Partial<ChecklistItem>) => void
  deleteChecklistItem: (id: string) => void
  seedChecklist: (tripId: string) => void
  addStop: (stop: Omit<ItineraryStop, 'id'>) => void
  updateStop: (id: string, data: Partial<ItineraryStop>) => void
  deleteStop: (id: string) => void
  updateStopsBatch: (updatedStops: ItineraryStop[]) => void
}

const CATEGORIES: ChecklistCategory[] = [
  { id: 'cat_1', title: 'Documentos e Burocracia' },
  { id: 'cat_2', title: 'Inspeção do Veículo' },
  { id: 'cat_3', title: 'Equipamentos Essenciais' },
]

const TEMPLATES = [
  { categoryId: 'cat_1', title: 'CNH válida', isCustom: false },
  { categoryId: 'cat_1', title: 'CRLV do veículo', isCustom: false },
  { categoryId: 'cat_1', title: 'Passaporte (viagens internacionais)', isCustom: false },
  { categoryId: 'cat_2', title: 'Revisão mecânica', isCustom: false },
  { categoryId: 'cat_2', title: 'Calibrar pneus (incluindo estepe)', isCustom: false },
  { categoryId: 'cat_2', title: 'Verificar óleo e fluidos', isCustom: false },
  { categoryId: 'cat_3', title: 'Kit de primeiros socorros', isCustom: false },
  { categoryId: 'cat_3', title: 'Ferramentas básicas', isCustom: false },
  { categoryId: 'cat_3', title: 'Lanterna e pilhas extras', isCustom: false },
]

const mockTrips: Trip[] = [
  {
    id: 't1',
    title: 'Expedição Patagônia',
    destination: 'Argentina',
    status: 'em_andamento',
    budget: 15000,
    spent: 4500,
    startDate: '2024-01-15',
    vehicleId: 'v2',
    estimatedKm: 8500,
  },
  {
    id: 't2',
    title: 'Litoral Nordeste',
    destination: 'Brasil',
    status: 'planejada',
    budget: 8000,
    spent: 0,
    startDate: '2024-07-10',
    vehicleId: 'v1',
    estimatedKm: 3200,
  },
]

const mockVehicles: Vehicle[] = [
  {
    id: 'v1',
    nickname: 'Bessie',
    type: 'van',
    make: 'Mercedes-Benz',
    model: 'Sprinter 416',
    year: 2022,
    plate: 'NOM-4D22',
    odometer: 15000,
    tankCapacity: 75,
    nextMaintenance: '2024-06-01',
    imageUrl: 'https://img.usecurling.com/p/400/300?q=campervan&color=gray',
  },
  {
    id: 'v2',
    nickname: 'Fera',
    type: 'carro',
    make: 'Land Rover',
    model: 'Defender 110',
    year: 2015,
    plate: 'ADV-0X99',
    odometer: 120000,
    tankCapacity: 80,
    nextMaintenance: '2024-04-15',
    imageUrl: 'https://img.usecurling.com/p/400/300?q=suv&color=green',
  },
]

const mockStops: ItineraryStop[] = [
  {
    id: 's1',
    tripId: 't1',
    name: 'Buenos Aires',
    address: 'Capital',
    lat: -34.6037,
    lng: -58.3816,
    status: 'visited',
    orderIndex: 0,
    date: '2024-01-18',
  },
  {
    id: 's2',
    tripId: 't1',
    name: 'Bahía Blanca',
    lat: -38.7183,
    lng: -62.2663,
    status: 'visited',
    orderIndex: 1,
    date: '2024-01-20',
  },
  {
    id: 's3',
    tripId: 't1',
    name: 'Puerto Madryn',
    lat: -42.7692,
    lng: -65.0385,
    status: 'planned',
    orderIndex: 2,
    date: '2024-01-22',
  },
  {
    id: 's4',
    tripId: 't1',
    name: 'Ushuaia',
    address: 'Fim do Mundo',
    lat: -54.8019,
    lng: -68.303,
    status: 'planned',
    orderIndex: 3,
    date: '2024-01-30',
    notes: 'Comprar adesivos',
  },
]

const DataContext = createContext<DataState | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>(mockTrips)
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles)
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([])
  const [stops, setStops] = useState<ItineraryStop[]>(mockStops)

  const addTrip = (trip: Omit<Trip, 'id' | 'spent'>) => {
    const newTrip = { ...trip, spent: 0, id: Math.random().toString(36).substr(2, 9) }
    setTrips((prev) => [newTrip, ...prev])
  }

  const updateTrip = (id: string, data: Partial<Trip>) => {
    setTrips((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)))
  }

  const deleteTrip = (id: string) => {
    setTrips((prev) => prev.filter((t) => t.id !== id))
    setChecklistItems((prev) => prev.filter((i) => i.tripId !== id))
    setStops((prev) => prev.filter((s) => s.tripId !== id))
  }

  const addVehicle = (vehicle: Omit<Vehicle, 'id'>) => {
    const newVehicle = { ...vehicle, id: Math.random().toString(36).substr(2, 9) }
    setVehicles((prev) => [newVehicle, ...prev])
    toast({ title: 'Sucesso', description: 'Veículo cadastrado na garagem.' })
  }

  const deleteVehicle = (id: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id))
    toast({ title: 'Removido', description: 'Veículo removido com sucesso.' })
  }

  const addChecklistItem = (item: Omit<ChecklistItem, 'id'>) => {
    const newItem = { ...item, id: Math.random().toString(36).substr(2, 9) }
    setChecklistItems((prev) => [...prev, newItem])
  }

  const updateChecklistItem = (id: string, data: Partial<ChecklistItem>) => {
    setChecklistItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...data } : i)))
  }

  const deleteChecklistItem = (id: string) => {
    setChecklistItems((prev) => prev.filter((i) => i.id !== id))
  }

  const seedChecklist = (tripId: string) => {
    setChecklistItems((prev) => {
      if (prev.some((i) => i.tripId === tripId)) return prev
      const itemsToInsert: ChecklistItem[] = TEMPLATES.map((t) => ({
        ...t,
        id: Math.random().toString(36).substr(2, 9),
        tripId,
        isCompleted: false,
      }))
      return [...prev, ...itemsToInsert]
    })
  }

  const addStop = (stop: Omit<ItineraryStop, 'id'>) => {
    const newStop = { ...stop, id: Math.random().toString(36).substr(2, 9) }
    setStops((prev) => [...prev, newStop])
  }

  const updateStop = (id: string, data: Partial<ItineraryStop>) => {
    setStops((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)))
  }

  const deleteStop = (id: string) => {
    setStops((prev) => prev.filter((s) => s.id !== id))
  }

  const updateStopsBatch = (updatedStops: ItineraryStop[]) => {
    setStops((prev) => {
      const otherStops = prev.filter((p) => !updatedStops.some((u) => u.id === p.id))
      return [...otherStops, ...updatedStops]
    })
  }

  return React.createElement(
    DataContext.Provider,
    {
      value: {
        trips,
        vehicles,
        checklistItems,
        categories: CATEGORIES,
        stops,
        addTrip,
        updateTrip,
        deleteTrip,
        addVehicle,
        deleteVehicle,
        addChecklistItem,
        updateChecklistItem,
        deleteChecklistItem,
        seedChecklist,
        addStop,
        updateStop,
        deleteStop,
        updateStopsBatch,
      },
    },
    children,
  )
}

export default function useDataStore() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useDataStore deve ser usado dentro de um DataProvider')
  }
  return context
}
