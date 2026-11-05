import { useRef, useState, type FocusEvent, type KeyboardEvent, type PointerEvent } from 'react'

import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons'
import { useCarousel, useInView, usePrefersReducedMotion } from '@/hooks'
import { cn } from '@/lib/cn'

import { SHOWCASE_SLIDES } from './slides'

const AUTOPLAY_MS = 6500
const SWIPE_THRESHOLD_PX = 50

/**
 * Full-screen image carousel (home, 2nd section).
 *
 * - Crossfade between slides, slow zoom-out on the active photo, staggered text entrance.
 * - Autoplay pauses on mouse hover, keyboard focus, when scrolled off screen, and is
 *   disabled entirely for users who prefer reduced motion.
 * - Arrows, indicators, ←/→ keys and touch swipe. Follows the WAI-ARIA carousel pattern.
 */
export function ShowcaseCarousel() {
  const sectionRef = useRef<HTMLElement>(null)
  const { isInView, hasBeenInView } = useInView(sectionRef)
  const prefersReducedMotion = usePrefersReducedMotion()
  const [isHovered, setIsHovered] = useState(false)
  const [hasKeyboardFocus, setHasKeyboardFocus] = useState(false)

  const isAutoplaying = isInView && !prefersReducedMotion && !isHovered && !hasKeyboardFocus
  const { index, count, goTo, next, prev } = useCarousel({
    count: SHOWCASE_SLIDES.length,
    interval: AUTOPLAY_MS,
    paused: !isAutoplaying,
  })

  // Swipe (touch/pen only; mouse users have arrows). `touch-pan-y` keeps vertical scrolling.
  const swipeStartX = useRef<number | null>(null)
  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') swipeStartX.current = e.clientX
  }
  const onPointerUp = (e: PointerEvent) => {
    if (swipeStartX.current === null) return
    const dx = e.clientX - swipeStartX.current
    swipeStartX.current = null
    if (Math.abs(dx) >= SWIPE_THRESHOLD_PX) (dx < 0 ? next : prev)()
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev()
    else if (e.key === 'ArrowRight') next()
  }

  // Pause only for keyboard focus — a mouse click on an arrow shouldn't stop autoplay forever.
  const onFocus = (e: FocusEvent) => {
    if (e.target.matches(':focus-visible')) setHasKeyboardFocus(true)
  }
  const onBlur = (e: FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setHasKeyboardFocus(false)
  }

  return (
    // Handlers here are delegation (swipe, hover/focus pause, ←/→ shortcut) — every actual
    // control inside is a real <button>, so the region itself needn't be interactive.
    // oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="relative isolate h-[max(100svh,34rem)] touch-pan-y overflow-hidden bg-brand select-none"
      onPointerEnter={(e) => e.pointerType === 'mouse' && setIsHovered(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setIsHovered(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => (swipeStartX.current = null)}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {/* Announce slide changes only when the user is driving (not during autoplay). */}
      <div aria-live={isAutoplaying ? 'off' : 'polite'} className="absolute inset-0">
        {SHOWCASE_SLIDES.map((slide, i) => {
          // Nothing is "active" until the section is first scrolled into view, so the
          // first slide's entrance plays when the visitor actually reaches it.
          const isActive = hasBeenInView && i === index
          return (
            <div
              key={slide.id}
              // role="group" + aria-roledescription="slide" is the WAI-ARIA APG carousel
              // pattern; <fieldset> (the lint suggestion) is for form controls.
              // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${slide.label}`}
              aria-hidden={i !== index}
              inert={i !== index}
              data-active={isActive}
              data-revealed={isActive}
              className={cn(
                'group/slide group/reveal absolute inset-0 isolate opacity-0 transition-opacity duration-1000 ease-in-out',
                'data-[active=true]:z-10 data-[active=true]:opacity-100',
              )}
            >
              <img
                src={slide.image}
                alt=""
                loading="lazy"
                decoding="async"
                style={{ objectPosition: slide.imagePosition }}
                className={cn(
                  'absolute inset-0 -z-10 size-full object-cover',
                  // Slow "Ken Burns" zoom-out while the slide is showing.
                  'scale-110 transition-[scale] duration-[8000ms] ease-out group-data-[active=true]/slide:scale-100',
                  'motion-reduce:scale-100 motion-reduce:transition-none',
                )}
              />
              <div aria-hidden className={cn('absolute inset-0 -z-10', slide.overlayClassName)} />
              <slide.Content />
            </div>
          )
        })}
      </div>

      <CarouselArrow direction="prev" onClick={prev} />
      <CarouselArrow direction="next" onClick={next} />

      <div className="absolute inset-x-0 bottom-[max(1.25rem,5svh)] z-20 flex justify-center gap-2">
        {SHOWCASE_SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}: ${slide.label}`}
            aria-current={i === index}
            className="group/dot py-3" // generous hit area around a thin bar
          >
            <span
              className={cn(
                'block h-[3px] w-9 rounded-full transition-colors sm:w-11',
                i === index ? 'bg-white' : 'bg-white/40 group-hover/dot:bg-white/70',
              )}
            />
          </button>
        ))}
      </div>
    </section>
  )
}

function CarouselArrow({
  direction,
  onClick,
}: {
  direction: 'prev' | 'next'
  onClick: () => void
}) {
  const Icon = direction === 'prev' ? ChevronLeftIcon : ChevronRightIcon
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Previous slide' : 'Next slide'}
      className={cn(
        // Hidden on phones — swipe + indicators cover it and the text needs the width.
        'absolute top-1/2 z-20 hidden -translate-y-1/2 rounded-full p-2 text-white/75 transition-colors hover:text-white sm:block',
        'focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none',
        direction === 'prev'
          ? 'left-[clamp(0.5rem,4.5vw,5.5rem)]'
          : 'right-[clamp(0.5rem,4.5vw,5.5rem)]',
      )}
    >
      <Icon className="size-9 lg:size-11" />
    </button>
  )
}
