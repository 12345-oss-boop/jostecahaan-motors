import type { ReactNode } from 'react'
import { Container } from '@/components/ui/Container'

type PageHeaderProps = { eyebrow: string; title: ReactNode; intro?: ReactNode }

/** Consistent heading block at the top of inner pages. */
export function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <section className="border-b border-line">
      <Container className="pt-16 pb-14 sm:pt-24 sm:pb-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[1.02] font-medium text-ivory sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory-muted">{intro}</p>
        )}
      </Container>
    </section>
  )
}
