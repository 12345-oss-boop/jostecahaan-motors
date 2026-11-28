import { VehicleCard, VehicleCardSkeleton } from '@/components/vehicles/VehicleCard'
import type { Vehicle } from '@/features/vehicles/types'

type VehicleGridProps = {
  vehicles?: Vehicle[]
  isLoading?: boolean
  skeletonCount?: number
}

export function VehicleGrid({
  vehicles = [],
  isLoading = false,
  skeletonCount = 6,
}: VehicleGridProps) {
  return (
    <div
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
      aria-busy={isLoading || undefined}
    >
      {isLoading
        ? Array.from({ length: skeletonCount }, (_, i) => <VehicleCardSkeleton key={i} />)
        : vehicles.map((vehicle, i) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} priority={i < 3} />
          ))}
    </div>
  )
}
