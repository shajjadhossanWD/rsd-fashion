import { useRef } from 'react'

import { Reveal } from '@/components/motion'
import { Photo } from '@/components/ui'
import { PRODUCT_SECTIONS } from '@/config/catalog'
import { useInView } from '@/hooks'
import { cn } from '@/lib/cn'

const IMG = {
  joggers: '/asset/products-page-5th-section-sportware-left.webp',
  cyclist: '/asset/products-page-5th-section-sportsware-right.webp',
} as const

/**
 * Products page, 5th section: Sportswear.
 *
 * Portrait photo framed by concentric line "ripples" on the left; title and a landscape
 * photo on the right, dropped lower for an editorial stagger (as in the design).
 * Below md the two photos sit side by side under the title.
 */
export function SportswearSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { hasBeenInView } = useInView(sectionRef, { threshold: 0.15 })

  return (
    <section
      ref={sectionRef}
      id={PRODUCT_SECTIONS.sportswear.id}
      aria-labelledby="sportswear-heading"
      data-revealed={hasBeenInView}
      className="group/reveal relative isolate overflow-hidden bg-[#f7f8fa] py-[clamp(3.5rem,7vw,7rem)]"
    >
      {/* Phones: behind the photos (below the text); md+: around the portrait, as designed. */}
      <Ripples className="absolute top-[30%] left-[-35%] -z-10 w-[120vw] opacity-70 md:top-[-18%] md:left-[-8%] md:w-[58%] md:opacity-100" />

      <div
        className={cn(
          'mx-auto grid w-full max-w-[1680px] px-[clamp(1.25rem,9.5vw,11.5rem)]',
          'grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] gap-x-[clamp(0.75rem,5.5vw,7rem)] gap-y-8',
          'md:grid-cols-[minmax(0,0.66fr)_minmax(0,1fr)]',
        )}
      >
        {/* Title block: first on phones, top-right from md. */}
        <div className="col-span-2 md:col-span-1 md:col-start-2 md:row-start-1 md:pl-[20%]">
          <Reveal
            as="h2"
            id="sportswear-heading"
            className="font-condensed text-[clamp(3rem,5.2vw,6.25rem)] leading-none tracking-wide text-[#0d2b5e]"
          >
            Sportswear
          </Reveal>
          <Reveal
            as="p"
            step={1}
            className="mt-3 max-w-[30rem] font-roboto text-[clamp(1rem,1.25vw,1.4rem)] leading-relaxed text-[#2c3a55]"
          >
            Performance-ready activewear — joggers, tees and training sets built to move, made to
            last.
          </Reveal>
        </div>

        <Reveal step={1} className="md:col-start-1 md:row-span-2 md:row-start-1">
          <Photo
            src={IMG.joggers}
            alt="Smiling woman on a lawn wearing black joggers printed with RSD Fashion"
            width={690}
            height={932}
            className="aspect-[362/515]"
            position="50% 30%"
          />
        </Reveal>

        <Reveal step={2} className="mt-[18%] md:col-start-2 md:row-start-2 md:mt-[6%]">
          <Photo
            src={IMG.cyclist}
            alt="Athlete in a fitted training top on an indoor bike, lit through coloured smoke"
            width={1849}
            height={1232}
            className="aspect-[3/4] rounded-none md:aspect-[552/449]"
            position="60% 40%"
          />
        </Reveal>
      </div>
    </section>
  )
}

/**
 * Concentric hexagonal outlines, each slightly larger and rotated, giving the
 * spirograph-like ripple from the design.
 */
function Ripples({ className }: { className?: string }) {
  const rings = Array.from({ length: 24 }, (_ring, i) => {
    const r = 90 + i * 17
    const turn = (i * 2.2 * Math.PI) / 180
    const points = Array.from({ length: 6 }, (_corner, k) => {
      const a = turn + (k * Math.PI) / 3
      return `${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r * 0.9).toFixed(1)}`
    }).join(' ')
    return { points, opacity: 0.18 + (i / 24) * 0.42 }
  })

  return (
    <svg aria-hidden viewBox="-520 -520 1040 1040" className={cn('pointer-events-none', className)}>
      {rings.map((ring, i) => (
        <polygon
          key={i}
          points={ring.points}
          fill="none"
          stroke="#d9454d"
          strokeOpacity={ring.opacity}
          strokeWidth={1.4}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  )
}
