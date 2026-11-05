import { useRef } from 'react'

import { FloatingBars } from '@/components/decor/FloatingBars'
import { Reveal } from '@/components/motion'
import { Breadcrumbs } from '@/components/ui'
import { paths } from '@/config/paths'
import { useInView } from '@/hooks'
import { cn } from '@/lib/cn'

import { PRODUCTS_HERO_BARS } from './productsHeroBars'

/**
 * Products page, 1st section: page title banner.
 *
 * Bronze → gold gradient with drifting blue/charcoal streaks. One centred column:
 * breadcrumb · title with a hand-drawn underline that draws itself in · subtitle ·
 * tagline (dark, on the gold part of the gradient where it reads best).
 */
export function ProductsHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { hasBeenInView } = useInView(sectionRef, { threshold: 0.1 })

  return (
    <section
      ref={sectionRef}
      aria-labelledby="products-hero-heading"
      data-revealed={hasBeenInView}
      className={cn(
        'group/reveal relative isolate flex flex-col overflow-hidden text-center',
        'bg-linear-to-b from-[#4a2f0b] via-[#9a7120] to-[#f4cf48]',
        'min-h-[clamp(30rem,40vw,46rem)] pt-(--header-h)',
      )}
    >
      <FloatingBars bars={PRODUCTS_HERO_BARS} className="-z-10" />
      {/* Soft darkening behind the title so it stays crisp over the streaks. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_45%_at_50%_42%,rgb(40_25_5/0.45),transparent_70%)]"
      />

      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 py-[clamp(2.5rem,5vw,4.5rem)]">
        <Reveal className="text-white">
          <Breadcrumbs items={[{ label: 'Home', to: paths.home }, { label: 'Products' }]} />
        </Reveal>

        <Reveal
          as="h1"
          step={1}
          id="products-hero-heading"
          className="mt-5 font-condensed text-[clamp(3rem,5.4vw,6.5rem)] leading-none tracking-wide text-white [text-shadow:0_3px_18px_rgb(0_0_0/0.35)]"
        >
          <span className="relative inline-block pb-[0.18em]">
            <span className="text-accent">Product</span> Categories
            <HandDrawnUnderline />
          </span>
        </Reveal>

        <Reveal
          as="p"
          step={2}
          className="mt-[clamp(1.75rem,3.5vw,3rem)] font-roboto text-[clamp(1.4rem,2.7vw,3.25rem)] leading-tight font-bold text-white [text-shadow:0_2px_14px_rgb(0_0_0/0.35)]"
        >
          One brand, endless sourcing possibilities
        </Reveal>

        <Reveal
          as="p"
          step={3}
          className="mt-[clamp(0.75rem,1.4vw,1.25rem)] font-roboto text-[clamp(1.05rem,1.75vw,2.1rem)] font-semibold text-brand"
        >
          Explore categories for every age, every style.
        </Reveal>
      </div>
    </section>
  )
}

/** Brush-like stroke that draws itself in once the section is revealed. */
function HandDrawnUnderline() {
  return (
    <svg
      aria-hidden
      // Fixed aspect: scales evenly with the heading, so the stroke keeps its brush shape.
      viewBox="0 0 300 16"
      className="absolute inset-x-0 top-[calc(100%-0.22em)] h-auto w-full overflow-visible"
    >
      <path
        d="M3 11 C 70 6, 170 3, 297 6"
        pathLength={1}
        fill="none"
        stroke="white"
        strokeWidth={5}
        strokeLinecap="round"
        className={cn(
          '[stroke-dasharray:1] [stroke-dashoffset:1]',
          'transition-[stroke-dashoffset] delay-[700ms] duration-[900ms] ease-out',
          'group-data-[revealed=true]/reveal:[stroke-dashoffset:0]',
          'motion-reduce:transition-none motion-reduce:[stroke-dashoffset:0]',
        )}
      />
    </svg>
  )
}
