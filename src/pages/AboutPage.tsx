import { EnquiryButtons } from '@/components/contact/EnquiryButtons'
import { PageHeader } from '@/components/layout/PageHeader'
import { Seo } from '@/components/seo/Seo'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { routes } from '@/config/routes'
import { site } from '@/config/site'

/*
 * Copy here describes how the dealership works without inventing facts
 * (no founding year, sales figures or awards). Replace or extend it with the
 * client's own story once supplied.
 */

const values = [
  {
    title: 'Honesty first',
    body: 'Clear prices in Kenyan Shillings, accurate descriptions and straight answers to your questions.',
  },
  {
    title: 'Quality over quantity',
    body: 'We would rather offer fewer, better vehicles than fill a yard with cars we cannot stand behind.',
  },
  {
    title: 'Personal service',
    body: 'From your first WhatsApp message to handing over the keys, you deal with people, not a call centre.',
  },
] as const

export function AboutPage() {
  return (
    <>
      <Seo
        title="About"
        description={`About ${site.name}, a premium car dealership in ${site.location.city}, ${site.location.country}.`}
      />
      <PageHeader
        eyebrow="About"
        title={
          <>
            A dealership built on <em className="text-gold">trust.</em>
          </>
        }
        intro={`${site.name} is a premium car dealership based in ${site.location.city}, ${site.location.country}.`}
      />

      <section className="border-b border-line">
        <Container className="grid gap-12 py-20 sm:py-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Our approach</p>
            <h2 className="mt-5 font-display text-4xl leading-tight font-medium sm:text-5xl">
              Buying a car should feel as good as driving one.
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-ivory-muted lg:col-span-6 lg:col-start-7">
            <p>
              A vehicle is one of the most significant purchases most people make. We believe that
              decision deserves clear information, fair pricing and time to ask questions.
            </p>
            <p>
              That is why every vehicle we list shows its price openly, why our descriptions are
              written to inform rather than impress, and why the quickest way to reach us is a
              simple WhatsApp message.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-charcoal">
        <Container className="py-20 sm:py-24">
          <p className="eyebrow">What we stand for</p>
          <ul className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
            {values.map((value, i) => (
              <li key={value.title} className="bg-charcoal p-8 sm:p-10">
                <span className="font-display text-2xl text-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-6 font-display text-3xl text-ivory">{value.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ivory-muted">{value.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section>
        <Container className="flex flex-col gap-10 py-20 sm:py-24 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Visit us</p>
            <h2 className="mt-5 max-w-xl font-display text-4xl leading-tight font-medium sm:text-5xl">
              Come and see the cars in {site.location.city}.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ivory-muted">
              Message us to arrange a viewing at a time that suits you.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <EnquiryButtons message={`Hello ${site.shortName}, I'd like to arrange a viewing.`} />
            <ButtonLink to={routes.vehicles} variant="ghost" className="sm:self-end">
              Browse inventory →
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  )
}
