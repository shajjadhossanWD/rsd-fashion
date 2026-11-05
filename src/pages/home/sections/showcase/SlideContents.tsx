import type { ComponentProps, ReactNode } from 'react'
import { Link } from 'react-router'

import { Reveal as BaseReveal } from '@/components/motion'
import { buttonVariants, Highlight } from '@/components/ui'
import { paths } from '@/config/paths'
import { cn } from '@/lib/cn'

/* ─── Shared building blocks ─────────────────────────────────────────────── */

/** Text area of a slide: clears the fixed header and keeps the design's ~11% side margin. */
function SlideBody({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        'absolute inset-0 flex px-[clamp(1.25rem,11.2vw,13.5rem)] pt-[calc(var(--header-h)+1.5rem)] pb-24',
        'text-white [text-shadow:0_2px_14px_rgb(0_0_0/0.35)]',
        className,
      )}
    >
      {children}
    </div>
  )
}

const headingClass = 'font-condensed text-[clamp(2.6rem,5.3vw,6.5rem)] leading-[0.95] tracking-wide'

/** Slide text enters after the crossfade has mostly finished. */
function Reveal(props: ComponentProps<typeof BaseReveal>) {
  return <BaseReveal baseDelay={350} {...props} />
}

/** Line break that only applies from `md` up (phones let text wrap naturally). */
const DesktopBreak = () => <br className="max-md:hidden" />

/* ─── Slides ─────────────────────────────────────────────────────────────── */

export function DesignCollaborationContent() {
  return (
    <SlideBody className="flex-col items-center pt-[calc(var(--header-h)+clamp(2rem,9svh,6rem))] text-center">
      <Reveal as="h2" step={0} className={headingClass}>
        Development{' '}
        <span className="bg-linear-to-b from-[#f08ab8] to-[#a35be0] bg-clip-text text-transparent [text-shadow:none]">
          &amp;
        </span>{' '}
        Design Collaboration
      </Reveal>
      <Reveal
        as="p"
        step={1}
        className="mt-[clamp(1rem,2.5vw,2.5rem)] max-w-5xl font-roboto text-[clamp(1rem,1.55vw,1.875rem)] leading-relaxed md:leading-[2.5]"
      >
        From sketch to sample, we work closely with your team to shape designs
        <DesktopBreak /> into production ready garments creatively, efficiently, and on brand.
      </Reveal>
      <Reveal step={2} className="mt-[clamp(1.25rem,2vw,2rem)]">
        <Link to={paths.services} className={buttonVariants({ variant: 'accent', size: 'cta' })}>
          Explore more
        </Link>
      </Reveal>
    </SlideBody>
  )
}

export function FlexibleSourcingContent() {
  return (
    <SlideBody className="flex-col justify-center">
      <Reveal as="h2" step={0} className={headingClass}>
        Flexible by design{' '}
        <span className="bg-linear-to-br from-[#ffb36b] to-[#e8569d] bg-clip-text text-transparent [text-shadow:none]">
          &amp;
        </span>{' '}
        <span className="text-[#3b3bff]">Limitless</span> by vision.
      </Reveal>
      <Reveal
        as="p"
        step={1}
        className="mt-[clamp(1rem,2vw,2rem)] max-w-5xl font-roboto text-[clamp(1.05rem,1.55vw,1.875rem)] leading-[1.9] font-light md:leading-[2.35]"
      >
        <Highlight clone className="bg-linear-to-r from-[#7c76ead9] to-[#d16eb2cc]">
          We adapt to your brand’s needs with scalable sourcing solutions
          <DesktopBreak /> built for today, ready for tomorrow.
        </Highlight>
      </Reveal>
    </SlideBody>
  )
}

export function SustainabilityContent() {
  return (
    <SlideBody className="flex-col justify-center">
      <Reveal as="h2" step={0} className="font-condensed leading-[0.95] tracking-wide">
        <span className="text-[clamp(3rem,6.1vw,7.25rem)] text-[#22e622]">Sustainability</span>{' '}
        <span className="text-[clamp(1.8rem,3.6vw,4.25rem)]">Commitment</span>
      </Reveal>
      <Reveal
        as="p"
        step={1}
        className="mt-[clamp(1.25rem,3.5vw,3.75rem)] font-roboto text-[clamp(1.6rem,2.65vw,3.1rem)] leading-tight font-bold"
      >
        <span className="text-[0.48em]">At</span> RSD Fashion &amp; Sourcing Ltd.
      </Reveal>
      <Reveal
        as="p"
        step={2}
        className="mt-[clamp(1rem,2.6vw,3rem)] font-roboto text-[clamp(1.1rem,1.7vw,2rem)] font-bold"
      >
        sustainability is central to everything we do.
      </Reveal>
      <Reveal
        as="p"
        step={3}
        className="mt-1 max-w-5xl font-roboto text-[clamp(1.05rem,1.55vw,1.875rem)] leading-[1.6]"
      >
        <Highlight className="bg-linear-to-r from-[#9b59b6d9] via-[#5f9fd1d9] to-[#3fe0e8e6]">
          We partner with ethical manufacturers and prioritize eco friendly materials
          <DesktopBreak /> reducing environmental impact without compromising on quality.
        </Highlight>
      </Reveal>
    </SlideBody>
  )
}
