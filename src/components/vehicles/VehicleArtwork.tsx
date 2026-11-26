import { useId } from 'react'
import type { BodyType } from '@/features/vehicles/types'

/*
 * Studio-style silhouette shown when a vehicle has no photographs yet.
 * Drawn in SVG, so it is tiny, sharp at any size and needs no downloads.
 * Real photographs always take priority (see VehicleMedia).
 */

type Shape = {
  body: string
  windows: string[]
  wheels: [number, number]
  /** Mirror horizontally so every silhouette faces the same way. */
  flip?: boolean
}

const shapes: Record<'suv' | 'saloon' | 'hatchback' | 'pickup', Shape> = {
  suv: {
    body: 'M40 136 L40 110 Q42 99 58 96 L106 90 L138 58 Q144 51 156 51 L298 51 Q311 51 318 60 L344 90 Q360 94 363 106 L365 136 Q365 142 358 142 L331 142 A26 26 0 0 0 279 142 L121 142 A26 26 0 0 0 69 142 L46 142 Q40 142 40 136 Z',
    windows: ['M150 59 L124 88 L214 88 L214 59 Z', 'M222 59 L222 88 L330 88 L306 59 Z'],
    wheels: [95, 305],
  },
  saloon: {
    body: 'M28 138 L28 118 Q30 107 48 104 L118 96 L156 69 Q165 63 178 63 L258 63 Q271 63 281 71 L318 97 L358 103 Q372 107 372 120 L372 138 Q372 142 366 142 L331 142 A26 26 0 0 0 279 142 L121 142 A26 26 0 0 0 69 142 L34 142 Q28 142 28 138 Z',
    windows: ['M166 70 L134 96 L216 96 L216 70 Z', 'M224 70 L224 96 L306 96 L277 70 Z'],
    wheels: [95, 305],
  },
  hatchback: {
    body: 'M52 138 L52 112 Q54 100 70 96 L116 89 L150 60 Q157 53 170 53 L282 53 Q296 53 302 64 L318 100 Q326 108 326 122 L326 138 Q326 142 320 142 L316 142 A26 26 0 0 0 264 142 L136 142 A26 26 0 0 0 84 142 L58 142 Q52 142 52 138 Z',
    windows: ['M162 61 L132 88 L220 88 L220 61 Z', 'M228 61 L228 88 L306 88 L294 61 Z'],
    wheels: [110, 290],
  },
  pickup: {
    body: 'M30 138 L30 96 L192 96 L198 57 Q201 50 212 50 L286 50 Q298 50 306 60 L330 92 Q362 96 366 110 L368 138 Q368 142 362 142 L331 142 A26 26 0 0 0 279 142 L121 142 A26 26 0 0 0 69 142 L36 142 Q30 142 30 138 Z',
    windows: ['M208 58 L205 90 L254 90 L254 58 Z', 'M262 58 L262 90 L322 90 L298 58 Z'],
    wheels: [95, 305],
    flip: true,
  },
}

const shapeFor: Record<BodyType, keyof typeof shapes> = {
  SUV: 'suv',
  Saloon: 'saloon',
  Coupe: 'saloon',
  Hatchback: 'hatchback',
  'Station Wagon': 'hatchback',
  Pickup: 'pickup',
}

type VehicleArtworkProps = { bodyType: BodyType; className?: string }

export function VehicleArtwork({ bodyType, className = '' }: VehicleArtworkProps) {
  const id = useId()
  const shape = shapes[shapeFor[bodyType]]

  return (
    <svg
      viewBox="0 0 480 270"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={`block h-full w-full ${className}`}
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c1c20" />
          <stop offset="0.74" stopColor="#111114" />
          <stop offset="0.74" stopColor="#17171a" />
          <stop offset="1" stopColor="#0c0c0e" />
        </linearGradient>
        <radialGradient id={`${id}-spot`} cx="0.5" cy="0.42" r="0.55">
          <stop offset="0" stopColor="#c8a96b" stopOpacity="0.16" />
          <stop offset="1" stopColor="#c8a96b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a3a40" />
          <stop offset="0.45" stopColor="#232327" />
          <stop offset="1" stopColor="#121215" />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2b2b30" />
          <stop offset="1" stopColor="#09090b" />
        </linearGradient>
        <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c8a96b" stopOpacity="0.05" />
          <stop offset="0.5" stopColor="#e0c995" stopOpacity="0.9" />
          <stop offset="1" stopColor="#c8a96b" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      <rect width="480" height="270" fill={`url(#${id}-bg)`} />
      <rect width="480" height="270" fill={`url(#${id}-spot)`} />
      <ellipse cx="240" cy="201" rx="190" ry="9" fill="#000" opacity="0.65" />

      <g transform={`translate(40 33)${shape.flip ? ' translate(400 0) scale(-1 1)' : ''}`}>
        <path
          d={shape.body}
          fill={`url(#${id}-body)`}
          stroke={`url(#${id}-rim)`}
          strokeWidth="1.2"
        />
        {shape.windows.map((d) => (
          <path key={d} d={d} fill={`url(#${id}-glass)`} />
        ))}
        {shape.wheels.map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="142" r="22" fill="#070708" />
            <circle cx={cx} cy="142" r="13" fill="none" stroke="#9c8051" strokeWidth="2" />
            <circle cx={cx} cy="142" r="3.5" fill="#c8a96b" />
          </g>
        ))}
      </g>
    </svg>
  )
}
