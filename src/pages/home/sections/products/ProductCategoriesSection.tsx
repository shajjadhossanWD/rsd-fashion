import { useRef } from 'react'
import { Link } from 'react-router'

import { Reveal } from '@/components/motion'
import { paths } from '@/config/paths'
import { useInView } from '@/hooks'
import { cn } from '@/lib/cn'

import { categoryImage, PRODUCT_CATEGORIES, type ProductCategory } from '@/config/catalog'

/**
 * Home, 4th section: product categories.
 *
 * Grid: 2 columns on phones → 3 from md → all 6 in one row from xl.
 * Each card is a single link (image + label), so the whole card is the tap target.
 */
export function ProductCategoriesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { hasBeenInView } = useInView(sectionRef, { threshold: 0.15 })

  return (
    <section
      ref={sectionRef}
      aria-labelledby="product-categories-heading"
      data-revealed={hasBeenInView}
      className={cn(
        'group/reveal relative isolate overflow-hidden',
        'bg-linear-to-b from-[#eef4fc] via-[#bcd6ee] to-[#93bd7c]',
        'py-[clamp(3rem,7vw,6.5rem)]',
      )}
    >
      <BackgroundRibbons />

      <div className="mx-auto w-full max-w-[1680px] px-[clamp(1rem,6.2vw,7.5rem)]">
        <Reveal
          as="h2"
          id="product-categories-heading"
          className="font-condensed leading-none tracking-wide"
        >
          <span className="text-[clamp(3rem,4.6vw,5.5rem)] text-[#2b1d7a]">Product</span>{' '}
          <span className="text-[clamp(1.9rem,2.7vw,3.25rem)] text-brand">Categories</span>
        </Reveal>

        <ul
          className={cn(
            'mt-[clamp(1.75rem,3.5vw,3.5rem)] grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6',
            'gap-x-[clamp(0.75rem,2.4vw,2.75rem)] gap-y-[clamp(1rem,2.4vw,2.5rem)]',
          )}
        >
          {PRODUCT_CATEGORIES.map((category, i) => (
            <Reveal as="li" key={category.slug} step={i + 1} stepDelay={90}>
              <CategoryCard category={category} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function CategoryCard({ category }: { category: ProductCategory }) {
  return (
    <Link
      to={paths.productCategory(category.slug)}
      className={cn(
        'group/card flex h-full flex-col overflow-hidden rounded-xl',
        'bg-white/25 shadow-sm ring-1 ring-white/50 backdrop-blur-sm',
        'transition-[translate,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-xl',
        'focus-visible:ring-2 focus-visible:ring-[#2b1d7a] focus-visible:outline-none',
        'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
      )}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={categoryImage(category.slug, 480)}
          srcSet={`${categoryImage(category.slug, 480)} 480w, ${categoryImage(category.slug, 960)} 960w`}
          // 2 cols → 3 cols → 6 cols, minus page gutters.
          sizes="(min-width: 1280px) 15vw, (min-width: 768px) 30vw, 46vw"
          alt={category.alt}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: category.focus }}
          className="size-full object-cover transition-[scale] duration-500 ease-out group-hover/card:scale-105 motion-reduce:transition-none"
        />
      </div>

      <div className="flex flex-1 items-center justify-center px-2 py-[clamp(1rem,2vw,1.75rem)]">
        {/* Looks like a button; the whole card is the link. */}
        <span
          className={cn(
            'inline-flex min-h-10 items-center rounded-full px-[clamp(0.9rem,1.6vw,1.6rem)] whitespace-nowrap',
            'font-sans text-[clamp(0.95rem,1.15vw,1.35rem)] font-bold text-[#2b1d7a]',
            'bg-white/75 ring-2 ring-[#2b1d7a]/25 transition-colors duration-300',
            'group-hover/card:bg-[#2b1d7a] group-hover/card:text-white group-hover/card:ring-[#2b1d7a]',
          )}
        >
          {category.label}
        </span>
      </div>
    </Link>
  )
}

/** Abstract blue ribbons sweeping from lower-left to upper-right, as in the design. */
function BackgroundRibbons() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 -z-10 size-full"
      viewBox="0 0 1440 700"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="ribbon-main" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#2f6fe0" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#6fa5e6" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#9cc6ec" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="ribbon-soft" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <path
        fill="url(#ribbon-main)"
        d="M0 470 C 260 430 360 150 700 135 S 1190 70 1440 40 L 1440 135 C 1200 140 1010 190 770 250 S 290 560 0 610 Z"
      />
      <path
        fill="url(#ribbon-soft)"
        d="M0 590 C 330 540 470 270 800 225 S 1240 150 1440 120 L 1440 165 C 1220 190 1020 240 830 290 S 340 610 0 660 Z"
      />
    </svg>
  )
}
