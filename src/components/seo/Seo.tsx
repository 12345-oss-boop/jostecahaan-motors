import { site } from '@/config/site'

type SeoProps = {
  title?: string
  description?: string
  /** Set on admin pages so search engines do not index them. */
  noIndex?: boolean
}

/**
 * Per-page <title> and meta tags. React 19 automatically moves these into
 * the document <head>, so no extra library is needed.
 */
export function Seo({ title, description = site.description, noIndex = false }: SeoProps) {
  const fullTitle = title ? `${title} | ${site.shortName}` : `${site.shortName} | ${site.tagline}`
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </>
  )
}
