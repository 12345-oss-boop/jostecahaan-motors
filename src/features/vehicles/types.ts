/**
 * Vehicle data shape. This mirrors the database table planned for Step 3
 * (Supabase), so pages will not need to change when real data is connected.
 */

export const vehicleStatuses = ['available', 'sold'] as const
export type VehicleStatus = (typeof vehicleStatuses)[number]

export const bodyTypes = ['SUV', 'Saloon', 'Hatchback', 'Pickup', 'Station Wagon', 'Coupe'] as const
export type BodyType = (typeof bodyTypes)[number]

export const transmissions = ['Automatic', 'Manual'] as const
export type Transmission = (typeof transmissions)[number]

export const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric'] as const
export type FuelType = (typeof fuelTypes)[number]

export type Drive = '2WD' | '4WD' | 'AWD'
export type Condition = 'Foreign Used' | 'Locally Used' | 'New'

export type VehicleImage = {
  src: string
  alt: string
}

export type Vehicle = {
  id: string
  /** URL-friendly identifier, e.g. "2019-toyota-land-cruiser-prado-tx-l". */
  slug: string
  make: string
  model: string
  /** Trim or grade, e.g. "TX-L". Optional. */
  variant?: string
  year: number
  priceKsh: number
  mileageKm: number
  engineCc: number
  transmission: Transmission
  fuelType: FuelType
  bodyType: BodyType
  drive: Drive
  colour: string
  condition: Condition
  status: VehicleStatus
  featured: boolean
  description: string
  features: string[]
  /** First image is the cover. Empty means "photos coming soon". */
  images: VehicleImage[]
  /** True for demonstration listings that are not real stock. */
  isDemo: boolean
  createdAt: string
}

/** "2019 Toyota Land Cruiser Prado TX-L" */
export function vehicleTitle(vehicle: Pick<Vehicle, 'year' | 'make' | 'model' | 'variant'>) {
  return [vehicle.year, vehicle.make, vehicle.model, vehicle.variant].filter(Boolean).join(' ')
}
