import { Link } from 'react-router'
import { Container } from '@/components/ui/Container'
import { Wordmark } from '@/components/ui/Wordmark'
import { primaryNav } from '@/config/routes'
import { site } from '@/config/site'
import { phoneLink, whatsappLink } from '@/lib/contact'

const currentYear = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-charcoal">
      <Container className="grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Wordmark />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory-muted">
            Carefully selected vehicles, honest pricing in Kenyan Shillings, and a personal buying
            experience in {site.location.city}.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow">Explore</p>
          <ul className="mt-5 space-y-3 text-sm">
            {primaryNav.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-ivory-muted transition-colors hover:text-ivory">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="eyebrow">Visit &amp; contact</p>
          <ul className="mt-5 space-y-3 text-sm text-ivory-muted">
            <li>
              {site.location.streetAddress ?? `${site.location.city}, ${site.location.country}`}
            </li>
            <li>
              <a href={phoneLink()} className="transition-colors hover:text-ivory">
                {site.contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-ivory"
              >
                WhatsApp enquiries
              </a>
            </li>
            {site.openingHours && <li>{site.openingHours}</li>}
          </ul>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-6 text-xs text-ivory-faint sm:flex-row sm:justify-between">
          <p>
            © {currentYear} {site.name}. All rights reserved.
          </p>
          <p>Website by {site.builtBy.name}</p>
        </Container>
      </div>
    </footer>
  )
}
