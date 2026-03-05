import React, { createContext, useContext, useState, ReactNode } from 'react'
import { toast } from '@/hooks/use-toast'

export type TripStatus = 'planejada' | 'em_andamento' | 'concluida'

export interface Trip {
  id: string
  title: string
  destination: string
  status: TripStatus
  budget: number
  spent: number
  startDate: string
  endDate?: string
}

export interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  plate: string
  nextMaintenance: string
  imageUrl: string
}

interface DataState {
  trips: Trip[]
  vehicles: Vehicle[]
  addTrip: (trip: Omit<Trip, 'id'>) => void
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => void
  deleteVehicle: (id: string) => void
}

const mockTrips: Trip[] = [
  {
    id: 't1',
    title: 'Expedição Patagônia',
    destination: 'Argentina',
    status: 'em_andamento',
    budget: 15000,
    spent: 4500,
    startDate: '2024-01-15',
  },
  {
    id: 't2',
    title: 'Litoral Nordeste',
    destination: 'Brasil',
    status: 'planejada',
    budget: 8000,
    spent: 0,
    startDate: '2024-07-10',
  },
  {
    id: 't3',
    title: 'Deserto do Atacama',
    destination: 'Chile',
    status: 'concluida',
    budget: 12000,
    spent: 11500,
    startDate: '2023-05-20',
    endDate: '2023-06-15',
  },
]

const mockVehicles: Vehicle[] = [
  {
    id: 'v1',
    make: 'Mercedes-Benz',
    model: 'Sprinter 416',
    year: 2022,
    plate: 'NOM-4D22',
    nextMaintenance: '2024-06-01',
    imageUrl: 'https://img.usecurling.com/p/400/300?q=campervan&color=gray',
  },
  {
    id: 'v2',
    make: 'Land Rover',
    model: 'Defender 110',
    year: 2015,
    plate: 'ADV-0X99',
    nextMaintenance: '2024-04-15',
    imageUrl: 'https://img.usecurling.com/p/400/300?q=suv&color=green',
  },
]

const DataContext = createContext<DataState | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>(mockTrips)
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles)

  const addTrip = (trip: Omit<Trip, 'id'>) => {
    const newTrip = { ...trip, id: Math.random().toString(36).substr(2, 9) }
    setTrips((prev) => [newTrip, ...prev])
    toast({ title: 'Sucesso', description: 'Viagem adicionada com sucesso.' })
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

  return React.createElement(
    DataContext.Provider,
    {
      value: { trips, vehicles, addTrip, addVehicle, deleteVehicle },
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
