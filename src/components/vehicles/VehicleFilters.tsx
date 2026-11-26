import { useId, useState, type ReactNode } from 'react'
import {
  countActiveFilters,
  maxPriceOptions,
  sortOptions,
  type VehicleFilters as Filters,
} from '@/features/vehicles/filters'
import { bodyTypes, fuelTypes, transmissions } from '@/features/vehicles/types'
import { formatKSh } from '@/lib/format'

type VehicleFiltersProps = {
  filters: Filters
  makes: string[]
  /** Called with a URL parameter name and new value (null clears it). */
  onChange: (key: string, value: string | null) => void
  onReset: () => void
}

const selectClass =
  'w-full appearance-none border border-line bg-ink px-3.5 py-3 pr-9 text-sm text-ivory transition-colors hover:border-ivory-faint focus:border-gold focus:outline-none'

function Field({ label, children }: { label: string; children: (id: string) => ReactNode }) {
  const id = useId()
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[0.65rem] font-semibold tracking-label text-ivory-faint uppercase"
      >
        {label}
      </label>
      <div className="relative">
        {children(id)}
        <svg
          aria-hidden="true"
          viewBox="0 0 12 12"
          className="pointer-events-none absolute top-1/2 right-3.5 size-2.5 -translate-y-1/2 text-gold"
        >
          <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  )
}

export function VehicleFilters({ filters, makes, onChange, onReset }: VehicleFiltersProps) {
  const [open, setOpen] = useState(false)
  const active = countActiveFilters(filters)
  const panelId = useId()

  return (
    <div className="border border-line bg-charcoal">
      {/* On phones the filters fold away behind a toggle to save space. */}
      <button
        type="button"
        className="flex w-full items-center justify-between px-5 py-4 text-xs font-semibold tracking-label text-ivory uppercase lg:hidden"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
      >
        <span>
          Filter &amp; sort
          {active > 0 && <span className="ml-2 text-gold">({active})</span>}
        </span>
        <span aria-hidden="true" className="text-gold">
          {open ? '−' : '+'}
        </span>
      </button>

      <div
        id={panelId}
        className={`${open ? 'grid' : 'hidden'} gap-5 border-t border-line p-5 sm:grid-cols-2 lg:grid lg:grid-cols-6 lg:border-t-0`}
      >
        <Field label="Make">
          {(id) => (
            <select
              id={id}
              className={selectClass}
              value={filters.make ?? ''}
              onChange={(e) => onChange('make', e.target.value || null)}
            >
              <option value="">All makes</option>
              {makes.map((make) => (
                <option key={make}>{make}</option>
              ))}
            </select>
          )}
        </Field>
        <Field label="Body type">
          {(id) => (
            <select
              id={id}
              className={selectClass}
              value={filters.body ?? ''}
              onChange={(e) => onChange('body', e.target.value || null)}
            >
              <option value="">All types</option>
              {bodyTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          )}
        </Field>
        <Field label="Max price">
          {(id) => (
            <select
              id={id}
              className={selectClass}
              value={filters.maxPrice ?? ''}
              onChange={(e) => onChange('maxPrice', e.target.value || null)}
            >
              <option value="">Any price</option>
              {maxPriceOptions.map((price) => (
                <option key={price} value={price}>
                  Up to {formatKSh(price)}
                </option>
              ))}
            </select>
          )}
        </Field>
        <Field label="Transmission">
          {(id) => (
            <select
              id={id}
              className={selectClass}
              value={filters.transmission ?? ''}
              onChange={(e) => onChange('transmission', e.target.value || null)}
            >
              <option value="">Any</option>
              {transmissions.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          )}
        </Field>
        <Field label="Fuel">
          {(id) => (
            <select
              id={id}
              className={selectClass}
              value={filters.fuel ?? ''}
              onChange={(e) => onChange('fuel', e.target.value || null)}
            >
              <option value="">Any</option>
              {fuelTypes.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          )}
        </Field>
        <Field label="Sort by">
          {(id) => (
            <select
              id={id}
              className={selectClass}
              value={filters.sort}
              onChange={(e) =>
                onChange('sort', e.target.value === 'newest' ? null : e.target.value)
              }
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          )}
        </Field>

        <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2 lg:col-span-6">
          <label className="inline-flex cursor-pointer items-center gap-3 text-sm text-ivory-muted">
            <input
              type="checkbox"
              className="size-4 accent-gold"
              checked={filters.includeSold}
              onChange={(e) => onChange('sold', e.target.checked ? '1' : null)}
            />
            Show sold vehicles
          </label>
          {active > 0 && (
            <button
              type="button"
              onClick={onReset}
              className="text-xs font-semibold tracking-label text-gold uppercase underline-offset-4 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
