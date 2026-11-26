import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { EnquiryButtons } from '@/components/contact/EnquiryButtons'
import { Seo } from '@/components/seo/Seo'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { ArrowIcon } from '@/components/ui/Icons'
import { DemoNotice } from '@/components/vehicles/DemoNotice'
import { VehicleArtwork } from '@/components/vehicles/VehicleArtwork'
import { VehicleGrid } from '@/components/vehicles/VehicleGrid'
import { routes } from '@/config/routes'
import { site } from '@/config/site'
import { useFeaturedVehicles } from '@/features/vehicles/queries'
import type { BodyType } from '@/features/vehicles/types'
import { usingDemoInventory } from '@/features/vehicles/vehicleService'

const principles = [
  {
    title: 'Selected, not stockpiled',
    body: 'Every vehicle is chosen for its condition and history before it earns a place on our floor.',
  },
  {
    title: 'Prices in plain sight',
    body: 'Each listing shows its price in Kenyan Shillings, so you can decide with clarity.',
  },
  {
    title: 'A conversation, not a sales pitch',
    body: 'Message us on WhatsApp or call directly. You speak to people who know the cars.',
  },
] as const

const browseTypes: BodyType[] = ['SUV', 'Saloon', 'Hatchback', 'Pickup']

const steps = [
  { title: 'Choose', body: 'Browse the inventory and shortlist the vehicles that suit you.' },
  { title: 'Enquire', body: 'Message us on WhatsApp. Each enquiry names the exact vehicle.' },
  { title: 'Inspect', body: 'Arrange a viewing in Nakuru and see the car in person.' },
  { title: 'Drive away', body: 'Agree the details with us and take the keys.' },
] as const

function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string
  title: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-5 max-w-xl font-display text-4xl leading-tight font-medium sm:text-5xl">
          {title}
        </h2>
      </div>
      {action}
    </div>
  )
}

export function HomePage() {
  const featured = useFeaturedVehicles()

  return (
    <>
      <Seo />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <Container className="grid items-center gap-14 py-16 sm:py-24 lg:grid-cols-12 lg:gap-10 lg:py-28">
          <div className="lg:col-span-6">
            <p className="eyebrow">
              {site.location.city}, {site.location.country}
            </p>
            <h1 className="mt-6 font-display text-[3.25rem] leading-[0.98] font-medium tracking-tight text-ivory sm:text-7xl xl:text-[5.75rem]">
              Drive away in something
              <em className="block text-gold not-italic"> exceptional.</em>
            </h1>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-ivory-muted sm:text-lg">
              {site.name} offers premium vehicles in {site.location.city}, presented honestly and
              priced clearly in Kenyan Shillings.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to={routes.vehicles}>
                View inventory
                <ArrowIcon />
              </ButtonLink>
              <ButtonLink to={routes.contact} variant="outline">
                Contact us
              </ButtonLink>
            </div>
          </div>

          {/* Showroom panel — swap for a genuine photograph when the client supplies one. */}
          <figure className="relative lg:col-span-6">
            <div className="relative border border-line">
              <VehicleArtwork bodyType="SUV" className="aspect-[16/10]" />
              {(
                [
                  'top-0 left-0 border-t border-l',
                  'top-0 right-0 border-t border-r',
                  'bottom-0 left-0 border-b border-l',
                  'bottom-0 right-0 border-b border-r',
                ] as const
              ).map((pos) => (
                <span
                  key={pos}
                  aria-hidden="true"
                  className={`absolute size-5 border-gold ${pos} -m-px`}
                />
              ))}
            </div>
            <figcaption className="mt-4 flex items-center justify-between text-[0.65rem] font-medium tracking-label text-ivory-faint uppercase">
              <span>The showroom</span>
              <span>Illustration</span>
            </figcaption>
          </figure>
        </Container>
      </section>

      {/* Featured vehicles */}
      <section className="border-b border-line">
        <Container className="py-20 sm:py-28">
          <SectionHeading
            eyebrow="Featured"
            title="Selected vehicles"
            action={
              <ButtonLink
                to={routes.vehicles}
                variant="ghost"
                className="-mx-6 self-start sm:self-auto"
              >
                All inventory <ArrowIcon />
              </ButtonLink>
            }
          />
          {usingDemoInventory && <DemoNotice className="mt-10" />}
          <div className="mt-8">
            <VehicleGrid
              vehicles={featured.data}
              isLoading={featured.isPending}
              skeletonCount={3}
            />
          </div>
        </Container>
      </section>

      {/* Browse by body type */}
      <section className="border-b border-line bg-charcoal">
        <Container className="py-20 sm:py-28">
          <SectionHeading eyebrow="Browse" title="Find your kind of car." />
          <ul className="mt-12 grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
            {browseTypes.map((type) => (
              <li key={type}>
                <Link
                  to={`${routes.vehicles}?body=${encodeURIComponent(type)}`}
                  className="group block bg-charcoal transition-colors hover:bg-graphite"
                >
                  <VehicleArtwork
                    bodyType={type}
                    className="aspect-[16/10] opacity-80 transition-opacity group-hover:opacity-100"
                  />
                  <span className="flex items-center justify-between px-4 py-4 sm:px-5">
                    <span className="font-display text-xl text-ivory sm:text-2xl">
                      {type === 'Saloon' ? 'Saloons' : `${type}s`}
                    </span>
                    <ArrowIcon className="size-4 text-gold transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Principles */}
      <section className="border-b border-line">
        <Container className="grid gap-12 py-20 sm:py-28 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">The standard</p>
            <h2 className="mt-5 font-display text-4xl leading-tight font-medium sm:text-5xl">
              How we sell cars.
            </h2>
          </div>
          <ol className="divide-y divide-line border-y border-line lg:col-span-8">
            {principles.map((item, index) => (
              <li key={item.title} className="grid gap-3 py-8 sm:grid-cols-[4rem_1fr] sm:gap-6">
                <span className="font-display text-2xl text-gold">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-ivory">{item.title}</h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-ivory-muted">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Buying journey */}
      <section className="border-b border-line">
        <Container className="py-20 sm:py-28">
          <SectionHeading eyebrow="The journey" title="From first message to the open road." />
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((step, i) => (
              <li key={step.title} className="relative border-t border-gold/40 pt-6">
                <span
                  aria-hidden="true"
                  className="absolute -top-[3px] left-0 size-1.5 rotate-45 bg-gold"
                />
                <p className="text-xs font-semibold tracking-label text-ivory-faint uppercase">
                  Step {i + 1}
                </p>
                <h3 className="mt-3 font-display text-3xl text-ivory">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Enquiry band */}
      <section>
        <Container className="flex flex-col gap-10 py-20 sm:py-24 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Speak to us</p>
            <h2 className="mt-5 max-w-xl font-display text-4xl leading-tight font-medium sm:text-5xl">
              Looking for a particular vehicle?
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ivory-muted">
              Tell us what you have in mind and we will let you know what is available.
            </p>
          </div>
          <EnquiryButtons message={`Hello ${site.shortName}, I'm looking for a vehicle.`} />
        </Container>
      </section>
    </>
  )
}
