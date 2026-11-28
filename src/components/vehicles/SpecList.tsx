import type { Vehicle } from '@/features/vehicles/types'
import { formatMileage } from '@/lib/format'

const cc = new Intl.NumberFormat('en-KE')

/** Key specifications as a definition list (accessible label/value pairs). */
export function SpecList({ vehicle }: { vehicle: Vehicle }) {
  const specs = [
    ['Year', String(vehicle.year)],
    ['Mileage', formatMileage(vehicle.mileageKm)],
    ['Engine', `${cc.format(vehicle.engineCc)} cc`],
    ['Transmission', vehicle.transmission],
    ['Fuel', vehicle.fuelType],
    ['Drive', vehicle.drive],
    ['Body type', vehicle.bodyType],
    ['Colour', vehicle.colour],
    ['Condition', vehicle.condition],
  ] as const

  return (
    <dl className="grid grid-cols-2 border-t border-l border-line sm:grid-cols-3">
      {specs.map(([label, value]) => (
        <div key={label} className="border-r border-b border-line p-4 sm:p-5">
          <dt className="text-[0.65rem] font-semibold tracking-label text-ivory-faint uppercase">
            {label}
          </dt>
          <dd className="mt-1.5 text-sm font-medium text-ivory sm:text-base">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
