import { useRef } from 'react'

import { Reveal } from '@/components/motion'
import { Photo } from '@/components/ui'
import { PRODUCT_SECTIONS } from '@/config/catalog'
import { useInView } from '@/hooks'
import { cn } from '@/lib/cn'

const IMG = {
  couple: '/asset/products-page-6th-section-denim-human.webp',
  rack: '/asset/products-page/denim-rack-640.webp',
} as const

/**
 * Products page, 6th section: Wovenwear & Denim.
 *
 * Text on the left; on the right a collage (couple photo, jeans-rack photo, quote card)
 * over a blue triangle. From lg the collage pieces are absolutely placed in a box with a
 * fixed aspect ratio (positions traced from the design); below lg they flow and overlap
 * with negative margins so the card always has room for its text.
 */
export function DenimSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { hasBeenInView } = useInView(sectionRef, { threshold: 0.15 })

  return (
    <section
      ref={sectionRef}
      id={PRODUCT_SECTIONS.denim.id}
      aria-labelledby="denim-heading"
      data-revealed={hasBeenInView}
      className="group/reveal relative isolate overflow-hidden bg-[#f7f8fa] pt-[clamp(3rem,6vw,6rem)] pb-[clamp(3.5rem,6vw,6rem)]"
    >
      <Triangle />

      <div
        className={cn(
          'mx-auto grid w-full max-w-[1680px] items-center px-[clamp(1.25rem,7.5vw,9rem)]',
          'gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]',
        )}
      >
        <div>
          <Reveal
            as="h2"
            id="denim-heading"
            className="font-condensed text-[clamp(3rem,5.2vw,6.25rem)] leading-[1.1] tracking-wide text-[#0d2b5e]"
          >
            Wovenwear <span className="text-[#8a1414]">&amp;</span> <br />
            Denim
          </Reveal>
          <Reveal
            as="p"
            step={1}
            className="mt-[clamp(1.5rem,3.5vw,3.5rem)] max-w-[34rem] font-roboto text-[clamp(1.05rem,1.45vw,1.75rem)] leading-relaxed"
          >
            <strong className="font-bold text-[#1d2433]">
              Denim that never goes out of style crafted with strength, comfort, and trend-forward
              designs.
            </strong>{' '}
            <span className="text-[#1f5fa8]">
              From shirts to dresses, our wovenwear offers durability, comfort, and global appeal.
            </span>
          </Reveal>
        </div>

        {/* Collage */}
        <div className="relative lg:aspect-[737/563]">
          <Reveal
            step={1}
            className="ml-[6%] w-[64%] lg:absolute lg:top-0 lg:left-[27%] lg:ml-0 lg:w-[48%]"
          >
            <Photo
              src={IMG.couple}
              alt="Two models in distressed denim jackets against a city backdrop"
              width={690}
              height={1035}
              className="aspect-[352/482]"
              position="50% 20%"
            />
          </Reveal>

          <Reveal
            step={2}
            className="absolute top-[7%] right-0 w-[36%] lg:top-[9%] lg:right-auto lg:left-[64%] lg:w-[23%]"
          >
            <Photo
              src={IMG.rack}
              alt="Jeans hanging on a clothes rail"
              width={640}
              height={960}
              className="aspect-[167/281] ring-4 ring-white"
            />
          </Reveal>

          <Reveal
            as="figure"
            step={3}
            className={cn(
              'relative z-10 -mt-[22%] w-[94%] lg:absolute lg:top-[44.6%] lg:left-[2%] lg:mt-0 lg:w-[60%]',
              'rounded-xl p-[clamp(1.25rem,2vw,2rem)] pt-[clamp(1.75rem,2.4vw,2.5rem)] text-white shadow-2xl',
              'bg-linear-to-br from-[#3f250a] via-[#6e4812] to-[#9a7419] ring-1 ring-white/10',
            )}
          >
            <QuoteBadge />
            <blockquote className="font-roboto text-[clamp(1.05rem,1.4vw,1.6rem)] leading-snug font-bold">
              RSD’s wovenwear and denim collections bring durability, comfort, and timeless style
              under one roof.
            </blockquote>
            <figcaption className="mt-4 font-roboto text-[clamp(0.875rem,0.95vw,1.05rem)] leading-relaxed text-white/85">
              From smart shirts and versatile dresses to classic jeans and jackets, each piece is
              crafted with premium fabrics and modern designs — delivering reliable sourcing
              solutions for every market.
            </figcaption>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function QuoteBadge() {
  return (
    <span
      aria-hidden
      className="absolute -top-5 left-[clamp(1.25rem,2vw,2rem)] grid size-10 place-items-center rounded-md bg-[#1a6fd6] shadow-lg"
    >
      <svg viewBox="0 0 24 24" className="size-5 fill-white">
        <path d="M10 7H6.5A2.5 2.5 0 0 0 4 9.5V13h3.5L6 17h2.6L10 13V7Zm10 0h-3.5A2.5 2.5 0 0 0 14 9.5V13h3.5L16 17h2.6L20 13V7Z" />
      </svg>
    </span>
  )
}

/** Blue mountain/triangle behind the collage (lower-right), fading towards its apex. */
function Triangle() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute right-0 bottom-0 -z-10 h-[62%] w-full lg:h-[70%] lg:w-[68%]"
    >
      <defs>
        <linearGradient id="denim-triangle" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5aa0e6" stopOpacity="0" />
          <stop offset="45%" stopColor="#7ab3ea" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#3f8ad8" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      {/* Every corner inside the box, so no edge gets clipped into a hard vertical line. */}
      <polygon points="42,0 0,100 100,100 100,78" fill="url(#denim-triangle)" />
    </svg>
  )
}
