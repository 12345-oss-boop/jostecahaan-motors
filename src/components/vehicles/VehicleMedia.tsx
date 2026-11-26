import { VehicleArtwork } from '@/components/vehicles/VehicleArtwork'
import { vehicleTitle, type Vehicle } from '@/features/vehicles/types'

type VehicleMediaProps = {
  vehicle: Vehicle
  /** Which photo to show (defaults to the cover photo). */
  index?: number
  /** Load immediately (use for the first, most visible image on a page). */
  priority?: boolean
  className?: string
}

/** Shows a vehicle's photo, or a labelled studio illustration if it has none. */
export function VehicleMedia({
  vehicle,
  index = 0,
  priority = false,
  className = '',
}: VehicleMediaProps) {
  const image = vehicle.images[index]

  return (
    <div className={`relative aspect-[16/10] overflow-hidden bg-graphite ${className}`}>
      {image ? (
        <img
          src={image.src}
          alt={image.alt || vehicleTitle(vehicle)}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="h-full w-full object-cover"
        />
      ) : (
        <>
          <VehicleArtwork bodyType={vehicle.bodyType} />
          <span className="absolute bottom-3 left-3 text-[0.6rem] font-medium tracking-label text-ivory-faint uppercase">
            {vehicle.isDemo ? 'Illustration' : 'Photos coming soon'}
          </span>
        </>
      )}
    </div>
  )
}
