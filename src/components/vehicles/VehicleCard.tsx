import { Link } from 'react-router'
import { DemoBadge, StatusBadge } from '@/components/vehicles/Badges'
import { VehicleMedia } from '@/components/vehicles/VehicleMedia'
import { routes } from '@/config/routes'
import { vehicleTitle, type Vehicle } from '@/features/vehicles/types'
import { formatKSh, formatMileage } from '@/lib/format'

type VehicleCardProps = { vehicle: Vehicle; priority?: boolean }

export function VehicleCard({ vehicle, priority }: VehicleCardProps) {
  const sold = vehicle.status === 'sold'
  const specs = [formatMileage(vehicle.mileageKm), vehicle.transmission, vehicle.fuelType]

  return (
    <article className="group relative flex flex-col border border-line bg-charcoal transition-colors duration-300 hover:border-gold/50">
      <div className="relative">
        <VehicleMedia
          vehicle={vehicle}
          priority={priority}
          className={`transition-opacity duration-500 ${sold ? 'opacity-60' : 'group-hover:opacity-90'}`}
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <StatusBadge status={vehicle.status} />
          {vehicle.isDemo && <DemoBadge />}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-semibold tracking-label text-ivory-faint uppercase">
          {vehicle.year} · {vehicle.bodyType}
        </p>
        <h3 className="mt-2 font-display text-2xl leading-tight font-medium text-ivory">
          {/* The link covers the whole card (via the ::after overlay) for an easy tap target. */}
          <Link
            to={routes.vehicle(vehicle.slug)}
            className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-gold"
          >
            {vehicle.make} {vehicle.model}
            {vehicle.variant && <span className="text-ivory-muted"> {vehicle.variant}</span>}
          </Link>
        </h3>
        <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ivory-muted">
          {specs.map((spec, i) => (
            <li key={spec} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden="true" className="size-0.5 rounded-full bg-ivory-faint" />
              )}
              {spec}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-6">
          <div className="flex items-end justify-between gap-4 border-t border-line pt-5">
            <p
              className={`text-lg font-semibold ${sold ? 'text-ivory-faint line-through' : 'text-gold'}`}
            >
              {formatKSh(vehicle.priceKsh)}
            </p>
            <span className="text-[0.65rem] font-semibold tracking-label text-ivory-muted uppercase transition-colors group-hover:text-gold">
              View <span className="sr-only">{vehicleTitle(vehicle)}</span>
              <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

export function VehicleCardSkeleton() {
  return (
    <div className="border border-line bg-charcoal" aria-hidden="true">
      <div className="aspect-[16/10] animate-pulse bg-graphite" />
      <div className="space-y-3 p-6">
        <div className="h-3 w-24 animate-pulse bg-graphite" />
        <div className="h-6 w-3/4 animate-pulse bg-graphite" />
        <div className="h-3 w-1/2 animate-pulse bg-graphite" />
        <div className="mt-6 h-5 w-32 animate-pulse bg-graphite" />
      </div>
    </div>
  )
}
