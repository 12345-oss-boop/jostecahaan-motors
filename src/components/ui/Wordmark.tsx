import { Link } from 'react-router'
import { routes } from '@/config/routes'

type WordmarkProps = { size?: 'sm' | 'md'; className?: string }

/**
 * Temporary text-based logo. Replace the contents of this component with the
 * official logo (an <img> or inline SVG) once the client supplies it.
 */
export function Wordmark({ size = 'md', className = '' }: WordmarkProps) {
  return (
    <Link
      to={routes.home}
      aria-label="JOSTECAHAAN MOTORS — home"
      className={`group inline-flex flex-col leading-none ${className}`}
    >
      <span
        className={`font-semibold tracking-wordmark text-ivory uppercase ${
          size === 'sm' ? 'text-[0.8rem]' : 'text-[0.9rem] sm:text-base'
        }`}
      >
        Jostecahaan
      </span>
      <span className="mt-1.5 flex items-center gap-2">
        <span className="h-px w-6 bg-gold transition-all duration-500 group-hover:w-10" />
        <span className="text-[0.6rem] font-medium tracking-wordmark text-gold uppercase">
          Motors
        </span>
      </span>
    </Link>
  )
}
