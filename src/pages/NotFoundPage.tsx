import { PageHeader } from '@/components/layout/PageHeader'
import { Seo } from '@/components/seo/Seo'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { routes } from '@/config/routes'

/** Shown for unknown URLs and for vehicles that no longer exist. */
export function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" noIndex />
      <PageHeader
        eyebrow="404"
        title="This road doesn’t go anywhere."
        intro="The page you were looking for does not exist, or the vehicle may have been removed."
      />
      <Container className="flex flex-col gap-3 py-16 sm:flex-row">
        <ButtonLink to={routes.vehicles}>Browse inventory</ButtonLink>
        <ButtonLink to={routes.home} variant="outline">
          Return home
        </ButtonLink>
      </Container>
    </>
  )
}
