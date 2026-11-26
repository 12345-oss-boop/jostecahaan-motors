import { Outlet, ScrollRestoration } from 'react-router'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'

export function PublicLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-gold focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <ScrollRestoration />
    </div>
  )
}
