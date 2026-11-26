import { PageHeader } from '@/components/layout/PageHeader'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/ui/Container'
import { site } from '@/config/site'

/** About page. Final copy to be supplied/approved by the client. */
export function AboutPage() {
  return (
    <>
      <Seo title="About" />
      <PageHeader
        eyebrow="About"
        title={
          <>
            A dealership built on <em className="text-gold">trust.</em>
          </>
        }
        intro={`${site.name} is a premium car dealership based in ${site.location.city}, ${site.location.country}.`}
      />
      <Container className="py-20">
        <p className="max-w-2xl text-sm leading-relaxed text-ivory-faint">
          The full story of the dealership will appear here once the client has provided and
          approved the content.
        </p>
      </Container>
    </>
  )
}
