import { useState } from 'react'
import { VehicleMedia } from '@/components/vehicles/VehicleMedia'
import type { Vehicle } from '@/features/vehicles/types'

/** Main photo with selectable thumbnails. Falls back to a single illustration. */
export function VehicleGallery({ vehicle }: { vehicle: Vehicle }) {
  const [active, setActive] = useState(0)
  const count = vehicle.images.length

  return (
    <div>
      <div className="relative">
        <VehicleMedia vehicle={vehicle} index={active} priority className="border border-line" />
        {count > 1 && (
          <>
            <p
              className="absolute right-3 bottom-3 bg-ink/80 px-2.5 py-1 text-xs text-ivory-muted"
              aria-live="polite"
            >
              {active + 1} / {count}
            </p>
            <div className="absolute inset-y-0 flex w-full items-center justify-between px-3">
              {[
                { label: 'Previous photo', delta: -1, glyph: '‹' },
                { label: 'Next photo', delta: 1, glyph: '›' },
              ].map((btn) => (
                <button
                  key={btn.label}
                  type="button"
                  aria-label={btn.label}
                  onClick={() => setActive((i) => (i + btn.delta + count) % count)}
                  className="grid size-10 place-items-center bg-ink/70 text-2xl text-ivory backdrop-blur-sm transition-colors hover:bg-gold hover:text-ink"
                >
                  <span aria-hidden="true">{btn.glyph}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {count > 1 && (
        <ul className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6" aria-label="Photos">
          {vehicle.images.map((image, i) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-current={i === active || undefined}
                className={`block w-full border transition-opacity ${i === active ? 'border-gold' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img
                  src={image.src}
                  alt=""
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
