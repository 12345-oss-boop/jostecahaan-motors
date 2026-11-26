import { useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import { Container } from '@/components/ui/Container'
import { Wordmark } from '@/components/ui/Wordmark'
import { WhatsAppIcon } from '@/components/ui/Icons'
import { primaryNav } from '@/config/routes'
import { whatsappLink } from '@/lib/contact'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-xs font-semibold tracking-label uppercase transition-colors duration-300 ${
    isActive ? 'text-gold' : 'text-ivory-muted hover:text-ivory'
  }`

export function SiteHeader() {
  const { pathname } = useLocation()
  // Remember which page the menu was opened on; navigating elsewhere closes it automatically.
  const [menuOpenedAt, setMenuOpenedAt] = useState<string | null>(null)
  const menuOpen = menuOpenedAt === pathname

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-ink/90 backdrop-blur-md">
      <Container className="flex h-18 items-center justify-between">
        <Wordmark />

        <nav aria-label="Main" className="hidden items-center gap-10 md:flex">
          {primaryNav.map((item) => (
            <NavLink key={item.to} to={item.to} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-gold/50 px-4 py-2.5 text-xs font-semibold tracking-label text-gold uppercase transition-colors duration-300 hover:bg-gold hover:text-ink"
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
        </nav>

        <button
          type="button"
          className="-mr-2 p-2 text-ivory md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpenedAt(menuOpen ? null : pathname)}
        >
          <span aria-hidden="true" className="relative block h-3 w-6">
            <span
              className={`absolute left-0 h-px w-6 bg-current transition-all duration-300 ${menuOpen ? 'top-1.5 rotate-45' : 'top-0'}`}
            />
            <span
              className={`absolute left-0 h-px bg-current transition-all duration-300 ${menuOpen ? 'top-1.5 w-6 -rotate-45' : 'top-3 w-4'}`}
            />
          </span>
        </button>
      </Container>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Main" className="border-t border-line/70 md:hidden">
          <Container className="flex flex-col gap-1 py-6">
            {primaryNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `py-3 font-display text-3xl ${isActive ? 'text-gold' : 'text-ivory'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 bg-gold px-6 py-3.5 text-xs font-semibold tracking-label text-ink uppercase"
            >
              <WhatsAppIcon />
              Chat on WhatsApp
            </a>
          </Container>
        </nav>
      )}
    </header>
  )
}
