import { useRef, type ReactNode } from 'react'

import { Confetti } from '@/components/decor/Confetti'
import { Reveal } from '@/components/motion'
import { useInView } from '@/hooks'
import { cn } from '@/lib/cn'

import { VALUE_CARDS, type ValueCard } from './values'

const IMAGE = '/asset/home-3rd-section-leftside-img.jpg'

/**
 * Bento placement at xl. Four tracks — photo · 40 · 14 · 40 — let the two card rows
 * mirror each other: row 1 is narrow+wide (40 | 14+40), row 2 wide+narrow (40+14 | 40).
 * Indexed by card position in VALUE_CARDS.
 */
const XL_PLACEMENT = [
  'xl:col-start-2 xl:row-start-1',
  'xl:col-start-3 xl:col-span-2 xl:row-start-1',
  'xl:col-start-2 xl:col-span-2 xl:row-start-2',
  'xl:col-start-4 xl:row-start-2',
] as const

/**
 * Home, 3rd section: company values as a bento grid beside a wardrobe photo.
 *
 * Layout:
 *  - < sm   single column: photo, then cards
 *  - sm–xl  photo as a wide banner, cards in an even 2 × 2
 *  - ≥ xl   photo spans both rows on the left, offset bento on the right
 */
export function ValuesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { hasBeenInView } = useInView(sectionRef, { threshold: 0.15 })

  return (
    <section
      ref={sectionRef}
      aria-labelledby="values-heading"
      data-revealed={hasBeenInView}
      className={cn(
        'group/reveal relative isolate overflow-hidden',
        'bg-linear-to-br from-[#f6d55c] via-[#c9982b] to-[#4a2b10]',
        'py-[clamp(2.5rem,6vw,4.75rem)]',
      )}
    >
      <Confetti className="-z-10" />
      <h2 id="values-heading" className="sr-only">
        Our values
      </h2>

      <div
        className={cn(
          'mx-auto grid w-full max-w-[1680px] px-[clamp(1rem,6.7vw,8rem)]',
          'gap-[clamp(0.875rem,1.3vw,1.5rem)]',
          'sm:grid-cols-2',
          'xl:grid-cols-[minmax(0,68fr)_minmax(0,40fr)_minmax(0,14fr)_minmax(0,40fr)]',
          'xl:grid-rows-[repeat(2,minmax(clamp(18rem,19.5vw,23.5rem),auto))]',
        )}
      >
        <Reveal
          step={0}
          className={cn(
            'group/photo relative overflow-hidden rounded-3xl shadow-xl',
            'aspect-[4/3] sm:col-span-2 sm:aspect-[21/9] xl:col-span-1 xl:row-span-2 xl:aspect-auto',
          )}
        >
          <img
            src={IMAGE}
            alt="Patterned shirts on wooden hangers in a wardrobe"
            loading="lazy"
            decoding="async"
            width={1282}
            height={1920}
            className={cn(
              'absolute inset-0 size-full object-cover object-[50%_62%] xl:object-center',
              'transition-[scale] duration-700 ease-out group-hover/photo:scale-[1.03] motion-reduce:transition-none',
            )}
          />
        </Reveal>

        {VALUE_CARDS.map((card, i) => (
          <ValueCardView key={card.id} card={card} step={i + 1} className={XL_PLACEMENT[i]} />
        ))}
      </div>
    </section>
  )
}

function ValueCardView({
  card,
  step,
  className,
}: {
  card: ValueCard
  step: number
  className?: string
}) {
  return (
    <Reveal
      as="article"
      step={step}
      className={cn(
        // @container: title sizes below are relative to this card's width (cqi), so long
        // words like "Trustworthiness" always fit, whatever the grid makes the card.
        '@container relative isolate flex min-h-[11rem] flex-col overflow-hidden rounded-3xl text-white shadow-xl ring-1 ring-white/10',
        'p-[clamp(1.5rem,2vw,2rem)] sm:min-h-[16rem]',
        // Soft light from the top-left corner for depth.
        'before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_0%_0%,rgb(255_255_255/0.16),transparent_55%)]',
        card.bodyAtBottom ? 'justify-between gap-6' : 'justify-center',
        card.gradientClassName,
        className,
      )}
    >
      <h3 className="font-condensed leading-[1.02] tracking-wide">
        {card.title.map((line, i) => (
          // Lines are block-level visually; the leading space keeps words apart for
          // screen readers and copy/paste ("Precision & Responsiveness").
          <span
            key={line.text}
            className={cn(
              'block',
              line.emphasis
                ? 'text-[clamp(2.25rem,17cqi,4.5rem)]'
                : 'text-[clamp(1.75rem,14.5cqi,3.25rem)]',
            )}
          >
            {i > 0 && ' '}
            {withAccentAmpersand(line.text, card.ampersandClassName)}
          </span>
        ))}
      </h3>
      <p
        className={cn(
          'max-w-[34ch] font-roboto text-[clamp(1rem,1.3vw,1.55rem)] leading-relaxed text-white/90',
          !card.bodyAtBottom && 'mt-[clamp(0.75rem,1.3vw,1.5rem)]',
        )}
      >
        {card.body}
      </p>
    </Reveal>
  )
}

function withAccentAmpersand(text: string, accentClassName?: string): ReactNode {
  if (!accentClassName || !text.includes('&')) return text
  const [before, after] = text.split('&')
  return (
    <>
      {before}
      <span className={accentClassName}>&amp;</span>
      {after}
    </>
  )
}
