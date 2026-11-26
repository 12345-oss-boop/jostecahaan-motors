import { Outlet } from 'react-router'
import { Seo } from '@/components/seo/Seo'
import { Wordmark } from '@/components/ui/Wordmark'

/**
 * Shell for the admin area. Loaded lazily (see app/router.tsx).
 * Authentication and route protection are added in Step 5 — until then the
 * admin pages are empty placeholders with no data or actions.
 */
export function AdminLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-charcoal">
      <Seo title="Admin" noIndex />
      <header className="border-b border-line">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Wordmark size="sm" />
          <span className="eyebrow">Admin</span>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-12 sm:px-8">
        <Outlet />
      </main>
    </div>
  )
}
