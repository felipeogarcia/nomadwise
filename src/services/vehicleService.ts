import { Vehicle } from '@/types'

// Global mock data to persist between hook calls during session
let mockVehicles: Vehicle[] = [
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

// Simulates securely getting a 1-hour signed URL from storage bucket
const getSignedUrl = (url: string) => {
  if (!url) return ''
  if (url.includes('sig=')) return url
  return `${url}&sig=${Math.random().toString(36).substring(2, 9)}&expires=3600`
}

export const vehicleService = {
  async getVehicles(): Promise<Vehicle[]> {
    await new Promise((resolve) => setTimeout(resolve, 800)) // network delay
    return mockVehicles.map((v) => ({ ...v, imageUrl: getSignedUrl(v.imageUrl) }))
  },

  async createVehicle(vehicle: Omit<Vehicle, 'id'>, photoFile?: File): Promise<Vehicle> {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulating bucket upload and receiving object path
    const objectPath = photoFile
      ? `https://img.usecurling.com/p/400/300?q=${vehicle.type}&color=blue`
      : vehicle.imageUrl || `https://img.usecurling.com/p/400/300?q=vehicle&color=gray`

    const newVehicle = {
      ...vehicle,
      id: Math.random().toString(36).substring(2, 9),
      imageUrl: objectPath,
    }

    mockVehicles = [newVehicle, ...mockVehicles]
    return { ...newVehicle, imageUrl: getSignedUrl(newVehicle.imageUrl) }
  },

  async updateVehicle(id: string, updates: Partial<Vehicle>, photoFile?: File): Promise<Vehicle> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const index = mockVehicles.findIndex((v) => v.id === id)
    if (index === -1) throw new Error('Vehicle not found')

    let imageUrl = updates.imageUrl
    if (photoFile) {
      // Simulating bucket upload
      imageUrl = `https://img.usecurling.com/p/400/300?q=${updates.type || mockVehicles[index].type}&color=red`
    }

    const updatedVehicle = { ...mockVehicles[index], ...updates, ...(imageUrl && { imageUrl }) }
    mockVehicles[index] = updatedVehicle

    return { ...updatedVehicle, imageUrl: getSignedUrl(updatedVehicle.imageUrl) }
  },

  async deleteVehicle(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 800))
    mockVehicles = mockVehicles.filter((v) => v.id !== id)
  },
}
