import { useCallback, useEffect, useState } from 'react'

interface UseCarouselOptions {
  count: number
  /** Autoplay delay in ms. */
  interval?: number
  /** Stop autoplay (hover, focus, off-screen, reduced motion…). */
  paused?: boolean
}

/**
 * Index state + autoplay for any carousel. Headless: no markup, no styles.
 * Navigating manually restarts the autoplay countdown, so a slide the user just
 * chose never flips away a moment later.
 */
export function useCarousel({ count, interval = 6000, paused = false }: UseCarouselOptions) {
  const [index, setIndex] = useState(0)

  const goTo = useCallback((i: number) => setIndex(((i % count) + count) % count), [count])
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count])
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count])

  // Keyed on `index`, so every slide change (auto or manual) restarts the countdown.
  useEffect(() => {
    if (paused || count < 2) return
    const id = window.setTimeout(() => setIndex((index + 1) % count), interval)
    return () => window.clearTimeout(id)
  }, [index, paused, interval, count])

  return { index, count, goTo, next, prev }
}
