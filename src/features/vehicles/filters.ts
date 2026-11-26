import {
  bodyTypes,
  fuelTypes,
  transmissions,
  type BodyType,
  type FuelType,
  type Transmission,
  type Vehicle,
} from '@/features/vehicles/types'

/*
 * Inventory filters are stored in the page URL (e.g. /vehicles?body=SUV),
 * so a filtered view can be bookmarked or shared on WhatsApp.
 */

export const sortOptions = [
  { value: 'newest', label: 'Newest listings' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'year-desc', label: 'Year: newest first' },
  { value: 'mileage-asc', label: 'Mileage: lowest first' },
] as const
export type SortOption = (typeof sortOptions)[number]['value']

export const maxPriceOptions = [3_000_000, 4_000_000, 5_000_000, 6_000_000, 8_000_000] as const

export type VehicleFilters = {
  make: string | null
  body: BodyType | null
  transmission: Transmission | null
  fuel: FuelType | null
  maxPrice: number | null
  includeSold: boolean
  sort: SortOption
}

function oneOf<T extends string>(value: string | null, allowed: readonly T[]): T | null {
  return value !== null && (allowed as readonly string[]).includes(value) ? (value as T) : null
}

export function parseFilters(params: URLSearchParams): VehicleFilters {
  const maxPrice = Number(params.get('maxPrice'))
  return {
    make: params.get('make') || null,
    body: oneOf(params.get('body'), bodyTypes),
    transmission: oneOf(params.get('transmission'), transmissions),
    fuel: oneOf(params.get('fuel'), fuelTypes),
    maxPrice: Number.isFinite(maxPrice) && maxPrice > 0 ? maxPrice : null,
    includeSold: params.get('sold') === '1',
    sort:
      oneOf(
        params.get('sort'),
        sortOptions.map((o) => o.value),
      ) ?? 'newest',
  }
}

export function countActiveFilters(filters: VehicleFilters): number {
  return [filters.make, filters.body, filters.transmission, filters.fuel, filters.maxPrice].filter(
    (value) => value !== null,
  ).length
}

const sorters: Record<SortOption, (a: Vehicle, b: Vehicle) => number> = {
  newest: () => 0, // the service already returns newest first
  'price-asc': (a, b) => a.priceKsh - b.priceKsh,
  'price-desc': (a, b) => b.priceKsh - a.priceKsh,
  'year-desc': (a, b) => b.year - a.year,
  'mileage-asc': (a, b) => a.mileageKm - b.mileageKm,
}

export function applyFilters(vehicles: Vehicle[], filters: VehicleFilters): Vehicle[] {
  return vehicles
    .filter(
      (v) =>
        (filters.includeSold || v.status === 'available') &&
        (!filters.make || v.make === filters.make) &&
        (!filters.body || v.bodyType === filters.body) &&
        (!filters.transmission || v.transmission === filters.transmission) &&
        (!filters.fuel || v.fuelType === filters.fuel) &&
        (!filters.maxPrice || v.priceKsh <= filters.maxPrice),
    )
    .sort(sorters[filters.sort])
}

/** Makes that actually exist in the inventory, alphabetically. */
export function availableMakes(vehicles: Vehicle[]): string[] {
  return [...new Set(vehicles.map((v) => v.make))].sort((a, b) => a.localeCompare(b))
}
