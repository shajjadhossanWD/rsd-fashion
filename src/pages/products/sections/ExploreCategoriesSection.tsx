import { useRef } from 'react'

import { Reveal } from '@/components/motion'
import { useInView } from '@/hooks'
import { cn } from '@/lib/cn'

const MARK = (width: 480 | 960) => `/asset/brand/mark-light-${width}.webp`

const AUDIENCES = ['Men’s', 'Women’s', 'Kids’', 'Nightwear', 'Everyday essentials'] as const

/**
 * Products page, 2nd section: intro to the categories.
 *
 * Charcoal spotlight background with a faint oversized RSD watermark.
 * Layout: phones — stacked · md — heading + mark side by side, copy below ·
 *         lg — three columns (heading · mark · copy), nothing overlapping.
 */
export function ExploreCategoriesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { hasBeenInView } = useInView(sectionRef, { threshold: 0.2 })

  return (
    <section
      ref={sectionRef}
      aria-labelledby="explore-categories-heading"
      data-revealed={hasBeenInView}
      className={cn(
        'group/reveal relative isolate overflow-hidden text-white',
        'bg-[radial-gradient(ellipse_70%_80%_at_45%_45%,#3e393a,#211e1f_75%)]',
        'py-[clamp(3.5rem,7vw,7rem)]',
      )}
    >
      {/* Brand-coloured hairlines top and bottom, as in the design. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#9ccf4a] via-accent to-accent"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1 bg-linear-to-r from-accent to-[#9ccf4a]"
      />

      {/* Oversized watermark. */}
      <img
        src={MARK(960)}
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute top-1/2 -right-[12%] -z-10 w-[min(95vw,1150px)] -translate-y-1/2 opacity-[0.045]"
      />

      <div
        className={cn(
          'mx-auto grid w-full max-w-[1680px] items-center px-[clamp(1.25rem,8vw,9.5rem)]',
          'gap-x-[clamp(1.5rem,4vw,4.5rem)] gap-y-10',
          'md:grid-cols-2 lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.35fr)]',
        )}
      >
        <Reveal
          as="h2"
          id="explore-categories-heading"
          className="font-condensed leading-[1.02] tracking-wide"
        >
          <span className="block text-[clamp(2.8rem,4.7vw,5.75rem)] whitespace-nowrap">
            Explore our
          </span>{' '}
          <span className="block text-[clamp(2.4rem,3.9vw,4.75rem)] text-accent">Product</span>{' '}
          <span className="block text-[clamp(2.4rem,3.9vw,4.75rem)]">Categories</span>
        </Reveal>

        <Reveal step={1} className="justify-self-center md:justify-self-end lg:justify-self-center">
          <img
            src={MARK(480)}
            srcSet={`${MARK(480)} 480w, ${MARK(960)} 960w`}
            sizes="(min-width: 1024px) 24vw, (min-width: 768px) 38vw, 60vw"
            alt="RSD logo mark"
            width={960}
            height={584}
            loading="lazy"
            className="w-[clamp(11rem,24vw,27rem)] drop-shadow-[0_10px_30px_rgb(0_0_0/0.45)]"
          />
        </Reveal>

        <Reveal step={2} className="md:col-span-2 lg:col-span-1">
          <p className="font-roboto text-[clamp(1.05rem,1.45vw,1.75rem)] leading-relaxed text-white/85">
            <span className="font-medium text-accent">
              RSD offers diverse product categories including
            </span>{' '}
            men’s T-shirts, polos, and casual wear, women’s elegant and versatile apparel, and kids’
            fun, durable garments. From cozy nightwear to everyday essentials, we deliver quality
            sourcing solutions designed to meet global standards.
          </p>
          <ul aria-label="We source for" className="mt-6 flex flex-wrap gap-2">
            {AUDIENCES.map((label) => (
              <li
                key={label}
                className="rounded-full bg-white/[0.06] px-3.5 py-1.5 font-roboto text-sm text-white/80 ring-1 ring-white/15"
              >
                {label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
