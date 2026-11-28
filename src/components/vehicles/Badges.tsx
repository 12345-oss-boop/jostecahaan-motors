import type { VehicleStatus } from '@/features/vehicles/types'

const badge =
  'inline-flex items-center px-2.5 py-1 text-[0.6rem] font-bold tracking-label uppercase'

export function StatusBadge({ status }: { status: VehicleStatus }) {
  return status === 'sold' ? (
    <span className={`${badge} bg-ivory text-ink`}>Sold</span>
  ) : (
    <span className={`${badge} bg-ink/80 text-gold ring-1 ring-gold/40 backdrop-blur-sm`}>
      Available
    </span>
  )
}

/** Marks sample content so it is never mistaken for real stock. */
export function DemoBadge() {
  return (
    <span className={`${badge} bg-gold/15 text-gold-light ring-1 ring-gold/30 backdrop-blur-sm`}>
      Demo listing
    </span>
  )
}
