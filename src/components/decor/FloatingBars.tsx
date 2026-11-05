import type { CSSProperties } from 'react'

import { cn } from '@/lib/cn'

export interface FloatingBar {
  /** Center position, length and thickness in px on a 1920px-wide design. */
  x: number
  y: number
  length: number
  thickness: number
  angle: number
  from: string
  to: string
  /** Float timing — each bar gets its own so they drift independently. */
  duration: number
  delay: number
  /** Peak vertical offset in px (negative = up first, positive = down first). */
  distance: number
}

/**
 * `--u` is one design pixel. It scales with the viewport but never drops below the
 * 900px-wide equivalent, so the bars stay legible on phones (overflow is clipped).
 */
const u = (px: number) => `calc(var(--u) * ${px})`

interface FloatingBarsProps {
  bars: readonly FloatingBar[]
  className?: string
}

/**
 * Decorative rounded "streaks" that drift up and down independently.
 * Bar geometry is authored on a 1920px-wide design and scales with the viewport.
 */
export function FloatingBars({ bars, className }: FloatingBarsProps) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      style={{ '--u': 'calc(max(100vw, 900px) / 1920)' } as CSSProperties}
    >
      {bars.map((bar, i) => (
        // Outer: positioned at the bar's center and animated vertically (screen-space up/down).
        <div
          key={i}
          className="absolute motion-safe:animate-float"
          style={
            {
              left: u(bar.x),
              top: u(bar.y),
              '--float-duration': `${bar.duration}s`,
              '--float-delay': `${bar.delay}s`,
              '--float-distance': `${bar.distance}px`,
            } as CSSProperties
          }
        >
          {/* Inner: the rotated pill itself, centered on the outer point. */}
          <div
            className="absolute rounded-full"
            style={{
              width: u(bar.length),
              height: u(bar.thickness),
              left: u(-bar.length / 2),
              top: u(-bar.thickness / 2),
              rotate: `${bar.angle}deg`,
              backgroundImage: `linear-gradient(to right, ${bar.from}, ${bar.to})`,
            }}
          />
        </div>
      ))}
    </div>
  )
}
