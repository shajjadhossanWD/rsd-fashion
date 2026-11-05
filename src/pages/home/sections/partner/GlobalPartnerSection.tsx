import { useRef } from 'react'
import { Link } from 'react-router'

import { Reveal } from '@/components/motion'
import { buttonVariants } from '@/components/ui'
import { paths } from '@/config/paths'
import { useInView } from '@/hooks'
import { cn } from '@/lib/cn'

const PHOTO = (width: 560 | 1120) => `/asset/about/global-partner-${width}.webp`
const PATTERN = '/asset/home-5th-section-bg.svg'

/**
 * Home, 5th section: company intro ("Your global partner…") beside a figure-8 framed photo.
 *
 * Layout: stacked on phones (photo first, centred) → two columns (45 / 55) from md.
 */
export function GlobalPartnerSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { hasBeenInView } = useInView(sectionRef, { threshold: 0.2 })

  return (
    <section
      ref={sectionRef}
      aria-labelledby="global-partner-heading"
      data-revealed={hasBeenInView}
      className="group/reveal relative isolate overflow-hidden bg-white py-[clamp(3rem,6.5vw,7rem)]"
    >
      {/* Low-poly triangle pattern (tileable). */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [background-size:clamp(420px,42vw,820px)] bg-repeat opacity-90"
        style={{ backgroundImage: `url(${PATTERN})` }}
      />

      <div
        className={cn(
          'mx-auto grid w-full max-w-[1680px] items-center px-[clamp(1.25rem,7.4vw,9rem)]',
          'gap-x-[clamp(2rem,9vw,10.5rem)] gap-y-10 md:grid-cols-[minmax(0,45fr)_minmax(0,55fr)]',
        )}
      >
        <Reveal step={0} className="mx-auto w-full max-w-[min(78vw,26rem)] md:max-w-none">
          <div className="aspect-[1387/1920] mask-figure8">
            <img
              src={PHOTO(560)}
              srcSet={`${PHOTO(560)} 560w, ${PHOTO(1120)} 1120w`}
              sizes="(min-width: 768px) 40vw, 78vw"
              alt="Model in a bright yellow cropped hoodie and joggers on a sunny basketball court"
              loading="lazy"
              decoding="async"
              width={1387}
              height={1920}
              className="size-full object-cover"
            />
          </div>
        </Reveal>

        <div className="max-w-[48rem]">
          <Reveal
            as="h2"
            step={1}
            id="global-partner-heading"
            className="font-condensed leading-[1.12] tracking-wide text-[#2b1d7a]"
          >
            <span className="text-[clamp(3.25rem,5.4vw,6.5rem)]">RSD</span>{' '}
            <span className="text-[clamp(2.25rem,4vw,4.75rem)]">
              – Your global partner in apparel sourcing excellence
            </span>
          </Reveal>

          <Reveal
            as="p"
            step={2}
            className="mt-[clamp(1rem,2vw,1.75rem)] font-roboto text-[clamp(1.05rem,1.6vw,1.875rem)] leading-[1.55] text-[#1d2b57]"
          >
            Fashion is more than trends — it’s quality, craftsmanship, and innovation.{' '}
            <strong className="font-bold text-[#14214a]">
              At RSD Fashion &amp; Sourcing Ltd., we turn your vision into reality with precision,
              passion, and unmatched execution.
            </strong>
          </Reveal>

          <Reveal step={3} className="mt-[clamp(1.5rem,2.5vw,2.25rem)]">
            <Link to={paths.contact} className={buttonVariants({ variant: 'accent', size: 'cta' })}>
              Let’s Contact
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
