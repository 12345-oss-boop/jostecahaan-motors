import type { ComponentPropsWithoutRef } from 'react'

/** Centres content and applies consistent side padding at every screen size. */
export function Container({ className = '', ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 ${className}`} {...props} />
  )
}
