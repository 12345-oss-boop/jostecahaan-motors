import { EnquiryButtons } from '@/components/contact/EnquiryButtons'
import { PageHeader } from '@/components/layout/PageHeader'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { site } from '@/config/site'

/**
 * Inventory listing. Vehicles will come from Supabase in a later step.
 * Until then this page shows an honest empty state — no sample cars are
 * presented as real stock.
 */
export function VehiclesPage() {
  return (
    <>
      <Seo
        title="Inventory"
        description={`Browse vehicles for sale at ${site.name}, ${site.location.city}. Prices in Kenyan Shillings.`}
      />
      <PageHeader
        eyebrow="Inventory"
        title="Vehicles for sale"
        intro="Every listing shows genuine photographs and a price in Kenyan Shillings."
      />
      <Container className="py-20">
        <div className="border border-dashed border-line px-6 py-16 text-center sm:px-12">
          <p className="font-display text-3xl text-ivory">Our inventory is being prepared.</p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ivory-muted">
            Listings will appear here shortly. In the meantime, ask us directly about the vehicles
            currently available.
          </p>
          <EnquiryButtons
            className="mt-8 justify-center"
            message={`Hello ${site.shortName}, which vehicles do you currently have available?`}
          />
        </div>
      </Container>
    </>
  )
}
