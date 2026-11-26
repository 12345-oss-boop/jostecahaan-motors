import { isRouteErrorResponse, useRouteError } from 'react-router'
import { Seo } from '@/components/seo/Seo'

/** Shown if a page crashes or fails to load (e.g. a lost connection while opening /admin). */
export function RouteErrorPage() {
  const error = useRouteError()
  const message = isRouteErrorResponse(error)
    ? `${error.status} — ${error.statusText}`
    : 'Something went wrong while loading this page.'

  if (import.meta.env.DEV) console.error(error)

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-ink px-6 text-center">
      <Seo title="Error" noIndex />
      <p className="eyebrow">Unexpected error</p>
      <h1 className="mt-5 font-display text-4xl text-ivory sm:text-5xl">{message}</h1>
      <p className="mt-4 text-sm text-ivory-muted">Please check your connection and try again.</p>
      <a
        href="/"
        className="mt-8 bg-gold px-6 py-3.5 text-xs font-semibold tracking-label text-ink uppercase"
      >
        Return home
      </a>
    </div>
  )
}
