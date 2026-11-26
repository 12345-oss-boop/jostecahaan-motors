import { useParams } from 'react-router'
import { PageHeader } from '@/components/layout/PageHeader'
import { Seo } from '@/components/seo/Seo'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { routes } from '@/config/routes'

/** Single vehicle page. Real data, gallery and specs are connected in a later step. */
export function VehicleDetailsPage() {
  const { slug } = useParams()

  return (
    <>
      <Seo title="Vehicle" noIndex />
      <PageHeader
        eyebrow="Vehicle"
        title="Vehicle not available"
        intro="This listing could not be found. It may have been sold or removed."
      />
      <Container className="py-16">
        <ButtonLink to={routes.vehicles} variant="outline">
          Back to inventory
        </ButtonLink>
        {import.meta.env.DEV && (
          <p className="mt-6 text-xs text-ivory-faint">Dev note: requested slug “{slug}”.</p>
        )}
      </Container>
    </>
  )
}
