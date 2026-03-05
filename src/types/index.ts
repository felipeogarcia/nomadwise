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
