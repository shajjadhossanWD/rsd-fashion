import { useRef } from 'react'

import { Reveal } from '@/components/motion'
import { Photo } from '@/components/ui'
import { PRODUCT_SECTIONS } from '@/config/catalog'
import { useInView } from '@/hooks'
import { cn } from '@/lib/cn'

const IMG = {
  stack: '/asset/products-page-3rd-section-Knitwear.webp',
  model: '/asset/products-page-3rd-section-human.webp',
  sweaters: '/asset/products-page-4th-section_Sweaters.webp',
} as const

const GAUGES_FROM = ['1.5', '3', '5', '7'] as const
const GAUGES_TO = ['12', '14'] as const

/**
 * Products page, 3rd + 4th sections: Knitwear, with Sweaters as its sub-block.
 * They share one continuous gold → bronze background with organic blobs, as in the design.
 *
 * Knitwear row: text · two staggered photos (stacked under the text below lg).
 * Sweaters row: photo with an overlapping card — overlaps sideways from lg,
 *               slides up over the photo's bottom edge on smaller screens.
 */
export function KnitwearSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { hasBeenInView } = useInView(sectionRef, { threshold: 0.1 })

  return (
    <section
      ref={sectionRef}
      id={PRODUCT_SECTIONS.knitwear.id}
      aria-labelledby="knitwear-heading"
      data-revealed={hasBeenInView}
      className={cn(
        'group/reveal relative isolate overflow-hidden',
        'bg-[linear-gradient(135deg,#fbdd4a_0%,#b58a26_32%,#6a420e_60%,#c99a2e_100%)]',
        'py-[clamp(3.5rem,6vw,6rem)]',
      )}
    >
      <Blobs />

      <div className="mx-auto w-full max-w-[1680px] px-[clamp(1.25rem,8.5vw,10rem)]">
        {/* ── Knitwear ─────────────────────────────────────────────── */}
        <div className="grid gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.3fr)]">
          <div className="lg:pt-4">
            <Reveal
              as="h2"
              id="knitwear-heading"
              className="font-condensed text-[clamp(3.25rem,5.6vw,6.5rem)] leading-none tracking-wide text-[#24104f]"
            >
              Knitwear
            </Reveal>

            <div className="mt-[clamp(1.5rem,7vw,8rem)] max-w-[38rem] font-roboto text-[clamp(1.05rem,1.5vw,1.8rem)] leading-relaxed text-[#2b1b45]">
              <Reveal as="p" step={1}>
                <strong className="text-[1.4em] leading-tight font-bold text-[#24104f]">
                  RSD specializes
                </strong>{' '}
                in premium knitwear, offering T-shirts, polos, and casual essentials crafted with
                comfort, durability, and style.
              </Reveal>
              <Reveal as="p" step={2} className="mt-6 font-bold text-[#24104f]">
                Our knitwear collections combine quality fabrics with reliable sourcing solutions,
                tailored to meet the demands of global markets.
              </Reveal>
            </div>
          </div>

          {/* Two staggered photos: the stack sits lower, the model higher (as in the design). */}
          <div className="grid grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] items-start gap-[clamp(0.75rem,1.6vw,1.75rem)]">
            <Reveal step={2} className="mt-[clamp(3rem,15vw,18rem)]">
              <Photo
                src={IMG.stack}
                alt="Stack of folded knit sweaters beside a ball of yarn"
                width={690}
                height={1035}
                className="aspect-[512/630]"
              />
            </Reveal>
            <Reveal step={3}>
              <Photo
                src={IMG.model}
                alt="Model wearing a cream cable-ribbed V-neck sweater with RSD lettering"
                width={690}
                height={945}
                className="aspect-[380/630]"
                position="50% 20%"
              />
            </Reveal>
          </div>
        </div>

        {/* ── Sweaters ─────────────────────────────────────────────── */}
        <section
          id={PRODUCT_SECTIONS.sweaters.id}
          aria-labelledby="sweaters-heading"
          className="relative mt-[clamp(3.5rem,9vw,10rem)] lg:pb-[4%]"
        >
          <Reveal step={0} className="lg:w-[55%]">
            <Photo
              src={IMG.sweaters}
              alt="Folded patterned sweaters on a wooden dresser beside a vase of flowers"
              width={690}
              height={485}
              className="aspect-[920/660]"
            />
          </Reveal>

          <Reveal
            as="article"
            step={1}
            className={cn(
              'relative mx-3 -mt-12 rounded-2xl p-[clamp(1.5rem,3.5vw,4rem)] text-white shadow-2xl sm:mx-8',
              'bg-linear-to-tr from-[#1c88b0] via-[#1a5f9a] to-[#0e2f66] ring-1 ring-white/10',
              'lg:absolute lg:top-[11%] lg:right-0 lg:mx-0 lg:mt-0 lg:w-[49%]',
            )}
          >
            <h3
              id="sweaters-heading"
              className="font-condensed text-[clamp(3rem,5.4vw,6.25rem)] leading-none tracking-wide"
            >
              Sweaters
            </h3>
            <p className="sr-only">
              Gauges from 1.5, 3, 5 and 7GG to 12 and 14GG — seasonal and stylish.
            </p>
            <div aria-hidden className="mt-[clamp(1.25rem,3vw,3rem)] font-roboto">
              <p className="text-xs font-medium tracking-[0.18em] text-white/70 uppercase">
                Gauge range
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {GAUGES_FROM.map((g) => (
                  <GaugeChip key={g} value={g} />
                ))}
                <span className="px-1 text-lg text-white/80">→</span>
                {GAUGES_TO.map((g) => (
                  <GaugeChip key={g} value={g} />
                ))}
              </div>
              <p className="mt-4 text-[clamp(1.05rem,1.4vw,1.6rem)] text-white/90">
                Seasonal and stylish.
              </p>
            </div>
          </Reveal>
        </section>
      </div>
    </section>
  )
}

function GaugeChip({ value }: { value: string }) {
  return (
    <span className="rounded-full bg-white/12 px-3 py-1 text-sm font-semibold tabular-nums ring-1 ring-white/25 sm:text-base">
      {value}
      <span className="ml-0.5 text-[0.8em] font-medium text-white/75">GG</span>
    </span>
  )
}

/** Pale-yellow (left) and light-grey (right) organic shapes from the design. */
function Blobs() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1876 1986"
      preserveAspectRatio="none"
      className="absolute inset-0 -z-10 hidden size-full md:block"
    >
      <path
        fill="#fde89a"
        d="M0 1110 C 150 1040 320 1030 470 1030 C 640 1030 760 900 840 870 C 1000 830 1120 950 1122 1110 C 1124 1300 1040 1420 900 1480 C 700 1560 400 1600 200 1680 C 120 1710 50 1700 0 1670 Z"
      />
      <path
        fill="#f6f5f2"
        d="M1876 450 C 1780 470 1700 490 1640 520 C 1480 600 1360 680 1370 760 C 1380 900 1560 1000 1600 1200 C 1630 1360 1640 1500 1760 1560 C 1810 1590 1850 1600 1876 1600 Z"
      />
    </svg>
  )
}
