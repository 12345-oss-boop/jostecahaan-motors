import { useQuery } from '@tanstack/react-query'
import {
  getVehicleBySlug,
  listFeaturedVehicles,
  listVehicles,
} from '@/features/vehicles/vehicleService'

/** Cache keys, so the same data is not fetched twice. */
export const vehicleKeys = {
  all: ['vehicles'] as const,
  featured: ['vehicles', 'featured'] as const,
  detail: (slug: string) => ['vehicles', 'detail', slug] as const,
}

export function useVehicles() {
  return useQuery({ queryKey: vehicleKeys.all, queryFn: listVehicles })
}

export function useFeaturedVehicles() {
  return useQuery({ queryKey: vehicleKeys.featured, queryFn: () => listFeaturedVehicles() })
}

export function useVehicle(slug: string) {
  return useQuery({ queryKey: vehicleKeys.detail(slug), queryFn: () => getVehicleBySlug(slug) })
}
