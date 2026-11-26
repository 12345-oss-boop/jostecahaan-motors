import { PageHeader } from '@/components/layout/PageHeader'
import { Seo } from '@/components/seo/Seo'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Container } from '@/components/ui/Container'
import { routes } from '@/config/routes'

export function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" noIndex />
      <PageHeader
        eyebrow="404"
        title="This road doesn’t go anywhere."
        intro="The page you were looking for does not exist or has moved."
      />
      <Container className="py-16">
        <ButtonLink to={routes.home}>Return home</ButtonLink>
      </Container>
    </>
  )
}
