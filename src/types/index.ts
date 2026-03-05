export type UserRole = 0 | 1 // 0: Admin, 1: User
export type UserStatus = 'pending_profile' | 'active'

export interface Profile {
  id: string
  email: string
  name: string
  role: UserRole
  status: UserStatus
  avatar?: string
  phone?: string
  cpf?: string
  birthDate?: string
}

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
  vehicleId?: string
  estimatedKm?: number
}

export type VehicleType = 'moto' | 'carro' | 'motorhome' | 'van' | 'outro'

export interface Vehicle {
  id: string
  nickname: string
  type: VehicleType
  make: string
  model: string
  year: number
  plate?: string
  odometer: number
  tankCapacity: number
  nextMaintenance?: string
  imageUrl: string
}

export interface ChecklistCategory {
  id: string
  title: string
}

export interface ChecklistItem {
  id: string
  tripId: string
  categoryId: string
  title: string
  isCompleted: boolean
  isCustom: boolean
}
