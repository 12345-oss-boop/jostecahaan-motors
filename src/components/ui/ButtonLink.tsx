import type { ReactNode } from 'react'
import { Link } from 'react-router'

type Variant = 'primary' | 'outline' | 'ghost'

const variants: Record<Variant, string> = {
  primary: 'bg-gold text-ink hover:bg-gold-light',
  outline: 'border border-gold/60 text-ivory hover:border-gold hover:bg-gold/10',
  ghost: 'text-ivory-muted hover:text-ivory',
}

const base =
  'inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs font-semibold tracking-label uppercase transition-colors duration-300'

type CommonProps = { variant?: Variant; className?: string; children: ReactNode }

/** Internal link styled as a button (uses the router, no page reload). */
export function ButtonLink({
  to,
  variant = 'primary',
  className = '',
  children,
}: CommonProps & { to: string }) {
  return (
    <Link to={to} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  )
}

/** External link (WhatsApp, phone, maps) styled as a button. */
export function ButtonAnchor({
  href,
  variant = 'primary',
  className = '',
  children,
  external = false,
}: CommonProps & { href: string; external?: boolean }) {
  return (
    <a
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}
