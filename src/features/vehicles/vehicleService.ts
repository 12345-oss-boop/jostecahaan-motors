import { demoVehicles } from '@/features/vehicles/demoVehicles'
import type { Vehicle } from '@/features/vehicles/types'

/*
 * The ONLY place pages get vehicle data from.
 *
 * Today it returns demonstration data. In Step 4 these functions will query
 * Supabase instead, and nothing else in the app needs to change. They are
 * async for the same reason: real data arrives over the network.
 */

/** True while the site shows demonstration listings instead of real stock. */
export const usingDemoInventory = demoVehicles.some((v) => v.isDemo)

/** Newest first; available vehicles before sold ones. */
function sortForDisplay(vehicles: Vehicle[]): Vehicle[] {
  return [...vehicles].sort((a, b) => {
    if (a.status !== b.status) return a.status === 'available' ? -1 : 1
    return b.createdAt.localeCompare(a.createdAt)
  })
}

export async function listVehicles(): Promise<Vehicle[]> {
  return sortForDisplay(demoVehicles)
}

export async function listFeaturedVehicles(limit = 3): Promise<Vehicle[]> {
  return sortForDisplay(demoVehicles.filter((v) => v.featured && v.status === 'available')).slice(
    0,
    limit,
  )
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | null> {
  return demoVehicles.find((v) => v.slug === slug) ?? null
}
