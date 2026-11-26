import { useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { EnquiryButtons } from '@/components/contact/EnquiryButtons'
import { PageHeader } from '@/components/layout/PageHeader'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { DemoNotice } from '@/components/vehicles/DemoNotice'
import { VehicleFilters } from '@/components/vehicles/VehicleFilters'
import { VehicleGrid } from '@/components/vehicles/VehicleGrid'
import { site } from '@/config/site'
import { applyFilters, availableMakes, parseFilters } from '@/features/vehicles/filters'
import { useVehicles } from '@/features/vehicles/queries'
import { usingDemoInventory } from '@/features/vehicles/vehicleService'

export function VehiclesPage() {
  const { data: vehicles, isPending, isError } = useVehicles()
  const [params, setParams] = useSearchParams()
  const query = params.toString()
  const filters = useMemo(() => parseFilters(new URLSearchParams(query)), [query])

  const results = useMemo(() => applyFilters(vehicles ?? [], filters), [vehicles, filters])
  const makes = useMemo(() => availableMakes(vehicles ?? []), [vehicles])

  function updateFilter(key: string, value: string | null) {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (value === null) next.delete(key)
        else next.set(key, value)
        return next
      },
      { replace: true, preventScrollReset: true },
    )
  }

  function resetFilters() {
    setParams(filters.includeSold ? { sold: '1' } : {}, { replace: true, preventScrollReset: true })
  }

  return (
    <>
      <Seo
        title="Inventory"
        description={`Browse vehicles for sale at ${site.name}, ${site.location.city}. Prices in Kenyan Shillings.`}
      />
      <PageHeader
        eyebrow="Inventory"
        title="Vehicles for sale"
        intro="Every listing shows its price in Kenyan Shillings. Enquire on WhatsApp and we will reply with full details."
      />

      <Container className="py-12 sm:py-16">
        {usingDemoInventory && <DemoNotice className="mb-8" />}

        <VehicleFilters
          filters={filters}
          makes={makes}
          onChange={updateFilter}
          onReset={resetFilters}
        />

        <p className="mt-8 mb-6 text-sm text-ivory-muted" aria-live="polite">
          {isPending
            ? 'Loading vehicles…'
            : `${results.length} ${results.length === 1 ? 'vehicle' : 'vehicles'}`}
        </p>

        {isError ? (
          <p className="border border-line p-10 text-center text-ivory-muted">
            We couldn’t load the inventory. Please refresh the page.
          </p>
        ) : !isPending && results.length === 0 ? (
          <div className="border border-dashed border-line px-6 py-16 text-center sm:px-12">
            <p className="font-display text-3xl text-ivory">No vehicles match those filters.</p>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ivory-muted">
              Try widening your search, or tell us what you are looking for.
            </p>
            <EnquiryButtons
              className="mt-8 justify-center"
              message={`Hello ${site.shortName}, I'm looking for a vehicle and couldn't find it on your website.`}
            />
          </div>
        ) : (
          <VehicleGrid vehicles={results} isLoading={isPending} />
        )}
      </Container>
    </>
  )
}
