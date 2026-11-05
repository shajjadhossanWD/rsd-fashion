import type { CSSProperties } from 'react'

import { cn } from '@/lib/cn'

interface ConfettiProps {
  /** Number of dots. */
  count?: number
  /** Dot colors, picked at random per dot. */
  colors?: readonly string[]
  /** Changing the seed gives a different (but stable) scatter. */
  seed?: number
  className?: string
}

/** Small deterministic PRNG, so the scatter is identical on every render and every visit. */
function mulberry32(seed: number) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function makeDots(count: number, colors: readonly string[], seed: number) {
  const rand = mulberry32(seed)
  return Array.from({ length: count }, () => ({
    left: rand() * 100,
    top: rand() * 100,
    size: 3 + Math.round(rand() * 4),
    color: colors[Math.floor(rand() * colors.length)] ?? 'white',
    duration: 3 + rand() * 4,
    delay: -rand() * 6,
  }))
}

/** Decorative, softly twinkling dots scattered over a section background. */
export function Confetti({
  count = 44,
  colors = ['#ffffff', '#f2c230', '#5f9a55', '#c0392b'],
  seed = 7,
  className,
}: ConfettiProps) {
  const dots = makeDots(count, colors, seed)

  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      {dots.map((dot, i) => (
        <span
          key={i}
          className="absolute rounded-full motion-safe:animate-twinkle"
          style={
            {
              left: `${dot.left}%`,
              top: `${dot.top}%`,
              width: dot.size,
              height: dot.size,
              backgroundColor: dot.color,
              '--twinkle-duration': `${dot.duration}s`,
              '--twinkle-delay': `${dot.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
