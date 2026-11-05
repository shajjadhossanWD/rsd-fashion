import { useRef } from 'react'

import { Reveal } from '@/components/motion'
import { Highlight } from '@/components/ui'
import { useInView } from '@/hooks'
import { cn } from '@/lib/cn'

const BG = (width: 960 | 1920) => `/asset/about/partnership-${width}.webp`

/**
 * Home, 6th section: brand statement over a darkened handshake photo.
 *
 * Layout: heading top-left; the paragraph block steps right to start at ~43% from lg
 * (as in the design) and sits full width beneath the heading on smaller screens.
 */
export function PartnershipSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { hasBeenInView } = useInView(sectionRef, { threshold: 0.2 })

  return (
    <section
      ref={sectionRef}
      aria-labelledby="partnership-heading"
      data-revealed={hasBeenInView}
      className={cn(
        'group/reveal relative isolate overflow-hidden bg-brand text-white',
        'py-[clamp(3.5rem,6vw,7rem)] lg:min-h-[clamp(36rem,40vw,48rem)]',
        '[text-shadow:0_2px_14px_rgb(0_0_0/0.35)]',
      )}
    >
      <img
        src={BG(960)}
        srcSet={`${BG(960)} 960w, ${BG(1920)} 1920w`}
        sizes="100vw"
        alt=""
        loading="lazy"
        decoding="async"
        // Keep the handshake in frame on narrow screens.
        className="absolute inset-0 -z-20 size-full object-cover object-[55%_45%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-br from-black/70 via-black/55 to-black/45"
      />

      <div className="mx-auto w-full max-w-[1680px] px-[clamp(1.25rem,7.5vw,9rem)]">
        <Reveal
          as="h2"
          id="partnership-heading"
          className="font-condensed text-[clamp(2.6rem,5vw,6rem)] leading-[1.15] tracking-wide"
        >
          RSD Fashion &amp; Sourcing Ltd. isn’t{' '}
          {/* Design's line break; smaller screens wrap naturally. */}
          <br className="max-lg:hidden" />
          just a <span className="text-[1.25em] text-accent">Sourcing</span> partner
        </Reveal>

        <div className="mt-[clamp(2rem,4vw,4.5rem)] max-w-[58rem] font-roboto lg:ml-[40%] lg:max-w-none">
          <Reveal as="p" step={1}>
            <span className="text-[clamp(1.75rem,3vw,3.5rem)] leading-tight">
              RSD Fashion &amp; Sourcing Ltd.
            </span>{' '}
            <Highlight className="bg-[#6d4a8acc] px-1 text-[clamp(1.05rem,1.6vw,1.875rem)] font-light">
              is the
            </Highlight>
          </Reveal>
          <Reveal
            as="p"
            step={2}
            className="mt-2 text-[clamp(1.05rem,1.6vw,1.875rem)] leading-[1.6] font-light"
          >
            <Highlight className="bg-linear-to-r from-[#5c3f78d9] via-[#4f86b8d9] to-[#3fd6e6e6]">
              trusted choice of refined brands around the world — a true reflection of elegance,
              thoughtful craftsmanship, and purposeful design. We don’t just deliver garments; we
              deliver identity, intention, and excellence through every thread.
            </Highlight>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
