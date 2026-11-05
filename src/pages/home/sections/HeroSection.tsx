import { useEffect, useRef, useState } from 'react'

import { FloatingBars } from '@/components/decor/FloatingBars'
import { buttonVariants } from '@/components/ui'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/cn'

import { HERO_BARS } from './heroBars'

const HERO_BG = '/asset/banner-background-img.webp'
const HERO_LOGO = '/asset/rsd-home-banner%20logo.webp'

/**
 * The banner logo is a 1849×1849 PNG-style image with ~10% transparent padding.
 * We crop to the visible artwork (x 160–1715, y 185–1640) so it can be sized by
 * what you actually see — this matters most on phones, where every pixel counts.
 */
const LOGO_CROP = { src: 1849, x: 160, y: 185, w: 1555, h: 1455 } as const

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)

  // Hold the drop-in until the logo has actually loaded — otherwise on slow connections
  // it would "drop" while still blank. A cached image may already be complete on mount.
  const [isLogoReady, setIsLogoReady] = useState(false)
  useEffect(() => {
    if (logoRef.current?.complete) setIsLogoReady(true)
  }, [])
  const markLogoReady = () => setIsLogoReady(true)

  const scrollToNextSection = () => {
    sectionRef.current?.nextElementSibling?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative isolate flex flex-col overflow-hidden',
        // --hero-h: section height. --hero-reserve: vertical space kept free for the button row.
        '[--hero-h:max(100svh,34rem)] [--hero-reserve:9.5rem]',
        // Landscape phones: fill exactly one screen; the button moves beside the logo instead.
        'short:[--hero-h:100svh] short:[--hero-reserve:2.5rem]',
        'min-h-(--hero-h) pt-[calc(var(--header-h)+1.5rem)] pb-[max(1.5rem,5svh)] short:pt-[calc(var(--header-h)+1rem)]',
      )}
    >
      <img
        src={HERO_BG}
        alt=""
        fetchPriority="high"
        className="absolute inset-0 -z-20 size-full object-cover object-[70%_center]"
      />
      <FloatingBars bars={HERO_BARS} className="-z-10" />

      <h1 className="sr-only">
        {siteConfig.name} — {siteConfig.description}
      </h1>

      <div className="flex flex-1 items-center justify-center px-4">
        <div
          className={cn(
            'relative overflow-hidden',
            // Width is the smallest of: design max · viewport width · what fits in the
            // remaining height (screen − header − button row) at the logo's aspect ratio.
            'w-[min(680px,86vw,calc((var(--hero-h)-var(--header-h)-var(--hero-reserve))*1.07))]',
            isLogoReady ? 'motion-safe:animate-drop-in motion-reduce:animate-fade-in' : 'invisible',
          )}
          style={{ aspectRatio: `${LOGO_CROP.w} / ${LOGO_CROP.h}` }}
          data-testid="hero-logo"
        >
          <img
            ref={logoRef}
            onLoad={markLogoReady}
            onError={markLogoReady}
            src={HERO_LOGO}
            alt=""
            width={LOGO_CROP.src}
            height={LOGO_CROP.src}
            fetchPriority="high"
            className="absolute max-w-none"
            style={{
              width: `${(LOGO_CROP.src / LOGO_CROP.w) * 100}%`,
              left: `${(-LOGO_CROP.x / LOGO_CROP.w) * 100}%`,
              top: `${(-LOGO_CROP.y / LOGO_CROP.h) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="flex justify-center px-4 pt-6 sm:justify-start sm:px-[5.4%] short:absolute short:bottom-5 short:left-0 short:p-0 short:pl-[5.4%]">
        <button
          type="button"
          onClick={scrollToNextSection}
          className={buttonVariants({ variant: 'accent', size: 'cta' })}
        >
          Discover more
        </button>
      </div>
    </section>
  )
}
