import { EnquiryButtons } from '@/components/contact/EnquiryButtons'
import { Seo } from '@/components/seo/Seo'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { ArrowIcon } from '@/components/ui/Icons'
import { routes } from '@/config/routes'
import { site } from '@/config/site'

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

export function HomePage() {
  return (
    <>
      <Seo />

      {/* Hero — typographic for now; a genuine showroom photograph can sit behind it later. */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 border-l border-line/60 lg:block"
        >
          <div className="absolute top-[64%] left-0 h-px w-full bg-gradient-to-r from-gold/50 to-transparent" />
        </div>

        <Container className="relative py-20 sm:py-28 lg:py-36">
          <p className="eyebrow">
            {site.location.city}, {site.location.country}
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-[3.25rem] leading-[0.98] font-medium tracking-tight text-ivory sm:text-7xl lg:text-[6.5rem]">
            Drive away in something
            <em className="block text-gold not-italic sm:inline"> exceptional.</em>
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
              Visit the showroom
            </ButtonLink>
          </div>
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
