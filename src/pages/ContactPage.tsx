import { EnquiryButtons } from '@/components/contact/EnquiryButtons'
import { PageHeader } from '@/components/layout/PageHeader'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { site } from '@/config/site'

const tips = [
  'The vehicle you are interested in, or the type of car you are looking for',
  'Your budget in Kenyan Shillings',
  'When you would like to view the vehicle',
] as const

export function ContactPage() {
  const details = [
    {
      label: 'Location',
      value: site.location.streetAddress ?? `${site.location.city}, ${site.location.country}`,
    },
    { label: 'Phone & WhatsApp', value: site.contact.phoneDisplay },
    { label: 'Opening hours', value: site.openingHours ?? 'To be confirmed' },
  ]

  return (
    <>
      <Seo
        title="Contact"
        description={`Contact ${site.name} in ${site.location.city} by WhatsApp or phone.`}
      />
      <PageHeader
        eyebrow="Contact"
        title="Let’s talk about your next car."
        intro="The quickest way to reach us is WhatsApp. You are also welcome to call."
      />
      <Container className="grid gap-14 py-16 sm:py-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <dl className="divide-y divide-line border-y border-line">
            {details.map((item) => (
              <div key={item.label} className="grid gap-2 py-6 sm:grid-cols-[12rem_1fr]">
                <dt className="eyebrow">{item.label}</dt>
                <dd className="text-ivory">{item.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-12">
            <h2 className="font-display text-3xl text-ivory">Helpful to include in your message</h2>
            <ul className="mt-6 space-y-3 text-sm text-ivory-muted">
              {tips.map((tip) => (
                <li key={tip} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 size-1 shrink-0 rotate-45 bg-gold" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="lg:col-span-5">
          <div className="border border-line bg-charcoal p-8 sm:p-10">
            <p className="eyebrow">Start a conversation</p>
            <p className="mt-5 font-display text-3xl leading-tight text-ivory">
              Message us on WhatsApp or give us a call.
            </p>
            <EnquiryButtons
              className="mt-8 sm:flex-col"
              message={`Hello ${site.shortName}, I'd like to make an enquiry.`}
            />
          </div>
        </aside>
      </Container>
    </>
  )
}
