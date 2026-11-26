import { EnquiryButtons } from '@/components/contact/EnquiryButtons'
import { PageHeader } from '@/components/layout/PageHeader'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { site } from '@/config/site'

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
      <Container className="grid gap-14 py-20 lg:grid-cols-12">
        <dl className="divide-y divide-line border-y border-line lg:col-span-7">
          {details.map((item) => (
            <div key={item.label} className="grid gap-2 py-6 sm:grid-cols-[12rem_1fr]">
              <dt className="eyebrow">{item.label}</dt>
              <dd className="text-ivory">{item.value}</dd>
            </div>
          ))}
        </dl>
        <div className="lg:col-span-5">
          <EnquiryButtons
            className="lg:flex-col"
            message={`Hello ${site.shortName}, I'd like to make an enquiry.`}
          />
        </div>
      </Container>
    </>
  )
}
