import { useRef } from 'react'
import { Link } from 'react-router'

import { Reveal } from '@/components/motion'
import { buttonVariants, Photo } from '@/components/ui'
import { paths } from '@/config/paths'
import { PRODUCT_SECTIONS } from '@/config/catalog'
import { useInView } from '@/hooks'
import { cn } from '@/lib/cn'

const PATTERN = '/asset/home-5th-section-bg.svg'

const KIDS = {
  portrait: {
    src: '/asset/products-page/kids-girl-portrait-640.webp',
    alt: 'Girl in a black turtleneck resting her chin on her hand',
    width: 640,
    height: 960,
  },
  colour: {
    src: '/asset/Kidswear-7th-section-2.webp',
    alt: 'Children in casual outfits posing against bright coloured walls',
    width: 962,
    height: 439,
  },
  set: {
    src: '/asset/Kidswear-7th-section-3.webp',
    alt: 'Sage green and white T-shirt with matching drawstring shorts',
    width: 962,
    height: 962,
  },
  toddlers: {
    src: '/asset/Kidswear-7th-section-4.webp',
    alt: 'Two toddlers in sun hats, a floral dress and a toucan-print shirt',
    width: 508,
    height: 574,
  },
  pyjamas: {
    src: '/asset/Kidswear-7th-section-5.jpg',
    alt: 'Boy in blue dinosaur-print pyjamas sitting on a bed',
    width: 341,
    height: 401,
  },
  dress: {
    src: '/asset/products-page/kids-yellow-dress-640.webp',
    alt: 'Little girl in a yellow dress jumping with joy',
    width: 640,
    height: 960,
  },
} as const

type Kid = (typeof KIDS)[keyof typeof KIDS]

/**
 * Products page, 7th section: Kidswear.
 *
 * lg+: an edge-to-edge collage (outer photos bleed off the sides, as in the design).
 * < lg: the same photos as a swipeable, scroll-snapping strip.
 * Then the title, copy and CTA on the dark lower part of the gradient.
 */
export function KidswearSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { hasBeenInView } = useInView(sectionRef, { threshold: 0.1 })

  return (
    <section
      ref={sectionRef}
      id={PRODUCT_SECTIONS.kidswear.id}
      aria-labelledby="kidswear-heading"
      data-revealed={hasBeenInView}
      className={cn(
        'group/reveal relative isolate overflow-hidden text-white',
        'bg-linear-to-b from-[#cbc6fd] via-[#6e8ff0] via-55% to-[#0f1220]',
        'pt-[clamp(2.5rem,4.5vw,4.5rem)] pb-[clamp(3.5rem,6vw,6rem)]',
      )}
    >
      {/* Low-poly facets. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [background-size:clamp(420px,42vw,820px)] bg-repeat opacity-70 mix-blend-multiply"
        style={{ backgroundImage: `url(${PATTERN})` }}
      />

      <Collage />
      <Strip />

      <div className="mx-auto mt-[clamp(2.5rem,6vw,6rem)] grid w-full max-w-[1680px] items-end gap-8 px-[clamp(1.25rem,9.5vw,11.5rem)] md:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <Reveal
            as="h2"
            id="kidswear-heading"
            className="font-condensed text-[clamp(3rem,5.2vw,6.25rem)] leading-none tracking-wide"
          >
            Kidswear
          </Reveal>
          <Reveal
            as="p"
            step={1}
            className="mt-[clamp(1.25rem,3vw,3rem)] max-w-[52rem] font-roboto text-[clamp(1.05rem,1.45vw,1.75rem)] leading-relaxed font-medium text-white/90"
          >
            RSD’s kidswear collection is designed with comfort, durability, and style in mind. From
            playful everyday outfits to cozy essentials, we create garments that keep little ones
            happy while meeting global quality standards.
          </Reveal>
        </div>
        <Reveal step={2}>
          <Link to={paths.contact} className={buttonVariants({ variant: 'accent', size: 'cta' })}>
            Learn more
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

/**
 * Desktop collage. Five columns wider than the viewport (120%), centred, so the outer
 * photos are cropped by the section edges. Column widths/offsets traced from the design.
 */
function Collage() {
  const shot = (kid: Kid, aspect: string, position?: string) => (
    <Photo
      src={kid.src}
      alt={kid.alt}
      width={kid.width}
      height={kid.height}
      className={cn('rounded-none shadow-lg', aspect)}
      position={position}
    />
  )

  return (
    <div className="hidden lg:block">
      <ul className="-mx-[10%] grid w-[120%] grid-cols-[290fr_290fr_322fr_290fr_290fr] items-start gap-[clamp(0.75rem,1.25vw,1.25rem)]">
        <Reveal as="li" step={0} className="mt-[3.3vw]">
          {shot(KIDS.portrait, 'aspect-[290/401]', '50% 25%')}
        </Reveal>
        <Reveal as="li" step={1} className="flex flex-col gap-[clamp(0.75rem,1.25vw,1.25rem)]">
          {shot(KIDS.colour, 'aspect-[290/234]', '62% 50%')}
          {shot(KIDS.set, 'aspect-[290/235]')}
        </Reveal>
        <Reveal as="li" step={2} className="mt-[3.3vw]">
          {shot(KIDS.toddlers, 'aspect-[322/401]')}
        </Reveal>
        <Reveal as="li" step={3}>
          {shot(KIDS.pyjamas, 'aspect-[290/486]')}
        </Reveal>
        <Reveal as="li" step={4} className="mt-[3.3vw]">
          {shot(KIDS.dress, 'aspect-[290/502]', '50% 60%')}
        </Reveal>
      </ul>
    </div>
  )
}

/** Phones/tablets: horizontally scrolling, snap-aligned strip. Keyboard-scrollable. */
function Strip() {
  return (
    <Reveal className="lg:hidden">
      <ul
        // A scrollable region must be focusable so keyboard users can scroll it
        // (axe: scrollable-region-focusable).
        // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        aria-label="Kidswear photos (scroll sideways)"
        className={cn(
          'flex snap-x snap-mandatory gap-3 overflow-x-auto px-[clamp(1.25rem,9.5vw,11.5rem)] pb-2',
          'scroll-px-[clamp(1.25rem,9.5vw,11.5rem)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white',
        )}
      >
        {Object.values(KIDS).map((kid) => (
          <li key={kid.src} className="w-[58vw] shrink-0 snap-start sm:w-[34vw]">
            <Photo
              src={kid.src}
              alt={kid.alt}
              width={kid.width}
              height={kid.height}
              className="aspect-[3/4] rounded-xl shadow-lg"
            />
          </li>
        ))}
      </ul>
    </Reveal>
  )
}
