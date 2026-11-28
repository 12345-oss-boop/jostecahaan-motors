import { Link, useParams } from 'react-router'
import { EnquiryButtons } from '@/components/contact/EnquiryButtons'
import { Seo } from '@/components/seo/Seo'
import { ButtonAnchor, ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { WhatsAppIcon } from '@/components/ui/Icons'
import { DemoBadge, StatusBadge } from '@/components/vehicles/Badges'
import { DemoNotice } from '@/components/vehicles/DemoNotice'
import { SpecList } from '@/components/vehicles/SpecList'
import { VehicleGallery } from '@/components/vehicles/VehicleGallery'
import { VehicleGrid } from '@/components/vehicles/VehicleGrid'
import { routes } from '@/config/routes'
import { vehicleEnquiryMessage } from '@/features/vehicles/enquiry'
import { useVehicle, useVehicles } from '@/features/vehicles/queries'
import { vehicleTitle, type Vehicle } from '@/features/vehicles/types'
import { formatKSh, formatMileage } from '@/lib/format'
import { whatsappLink } from '@/lib/contact'
import { NotFoundPage } from '@/pages/NotFoundPage'

function Breadcrumbs({ title }: { title: string }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-ivory-faint">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link to={routes.home} className="hover:text-ivory">
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link to={routes.vehicles} className="hover:text-ivory">
            Inventory
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="text-ivory-muted">
          {title}
        </li>
      </ol>
    </nav>
  )
}

function SimilarVehicles({ vehicle }: { vehicle: Vehicle }) {
  const { data = [] } = useVehicles()
  const similar = data
    .filter((v) => v.id !== vehicle.id && v.status === 'available')
    .sort(
      (a, b) => Number(b.bodyType === vehicle.bodyType) - Number(a.bodyType === vehicle.bodyType),
    )
    .slice(0, 3)

  if (similar.length === 0) return null
  return (
    <section className="border-t border-line">
      <Container className="py-16 sm:py-20">
        <div className="mb-8 flex items-end justify-between gap-6">
          <h2 className="font-display text-3xl font-medium sm:text-4xl">You may also like</h2>
          <Link
            to={routes.vehicles}
            className="text-xs font-semibold tracking-label text-gold uppercase hover:underline"
          >
            All inventory
          </Link>
        </div>
        <VehicleGrid vehicles={similar} />
      </Container>
    </section>
  )
}

export function VehicleDetailsPage() {
  const { slug = '' } = useParams()
  const { data: vehicle, isPending } = useVehicle(slug)

  if (isPending) {
    return (
      <Container className="py-16" aria-busy="true">
        <div className="aspect-[16/10] max-w-3xl animate-pulse bg-graphite" />
      </Container>
    )
  }

  if (!vehicle) return <NotFoundPage />

  const title = vehicleTitle(vehicle)
  const sold = vehicle.status === 'sold'
  const message = vehicleEnquiryMessage(vehicle)

  return (
    <>
      <Seo
        title={title}
        description={`${title} for sale in Nakuru — ${formatKSh(vehicle.priceKsh)}, ${formatMileage(vehicle.mileageKm)}, ${vehicle.transmission}, ${vehicle.fuelType}.`}
        noIndex={vehicle.isDemo}
      />

      <Container className="pt-8 pb-16 sm:pt-10 sm:pb-20">
        <Breadcrumbs title={title} />
        {vehicle.isDemo && <DemoNotice className="mt-6" />}

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <VehicleGallery vehicle={vehicle} />
          </div>

          {/* Summary + enquiry. Sticks beside the gallery on large screens. */}
          <aside className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
            <div className="flex flex-wrap gap-2">
              <StatusBadge status={vehicle.status} />
              {vehicle.isDemo && <DemoBadge />}
            </div>
            <p className="mt-6 text-xs font-semibold tracking-label text-ivory-faint uppercase">
              {vehicle.year} · {vehicle.condition}
            </p>
            <h1 className="mt-3 font-display text-4xl leading-[1.05] font-medium text-ivory sm:text-5xl">
              {vehicle.make} {vehicle.model}
              {vehicle.variant && <span className="block text-ivory-muted">{vehicle.variant}</span>}
            </h1>
            <p
              className={`mt-6 text-3xl font-semibold ${sold ? 'text-ivory-faint line-through' : 'text-gold'}`}
            >
              {formatKSh(vehicle.priceKsh)}
            </p>
            {sold && (
              <p className="mt-3 text-sm text-ivory-muted">
                This vehicle has been sold. Ask us about similar vehicles.
              </p>
            )}
            <EnquiryButtons message={message} className="mt-8 sm:flex-col xl:flex-row" />
            <p className="mt-4 text-xs leading-relaxed text-ivory-faint">
              Your WhatsApp message will mention this {vehicle.year} {vehicle.make} {vehicle.model}{' '}
              automatically.
            </p>
          </aside>
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-12">
          <section className="lg:col-span-7" aria-labelledby="specs-heading">
            <h2 id="specs-heading" className="eyebrow mb-6">
              Specifications
            </h2>
            <SpecList vehicle={vehicle} />
          </section>
          <section className="lg:col-span-5" aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="eyebrow mb-6">
              Overview
            </h2>
            <p className="leading-relaxed text-ivory-muted">{vehicle.description}</p>
            {vehicle.features.length > 0 && (
              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-ivory">
                {vehicle.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span aria-hidden="true" className="size-1 shrink-0 rotate-45 bg-gold" />
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <div className="mt-14">
          <ButtonLink to={routes.vehicles} variant="outline">
            ← Back to inventory
          </ButtonLink>
        </div>
      </Container>

      <SimilarVehicles vehicle={vehicle} />

      {/* Phone-only enquiry bar, always within thumb reach. */}
      <div className="sticky bottom-0 z-30 border-t border-line bg-ink/95 p-3 backdrop-blur-md lg:hidden">
        <ButtonAnchor href={whatsappLink(message)} external className="w-full">
          <WhatsAppIcon />
          {sold ? 'Ask about similar' : 'Enquire on WhatsApp'}
        </ButtonAnchor>
      </div>
    </>
  )
}
