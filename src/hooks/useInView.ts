import { useEffect, useState, type RefObject } from 'react'

interface UseInViewOptions {
  /** Fraction of the element that must be visible (0–1). */
  threshold?: number
}

/**
 * Whether `ref`'s element is currently on screen, plus whether it has ever been.
 * Falls back to "visible" where IntersectionObserver is unavailable.
 */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { threshold = 0.25 }: UseInViewOptions = {},
) {
  const supported = typeof IntersectionObserver !== 'undefined'
  const [isInView, setIsInView] = useState(!supported)
  const [hasBeenInView, setHasBeenInView] = useState(!supported)

  useEffect(() => {
    const el = ref.current
    if (!el || !supported) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry?.isIntersecting ?? false
        setIsInView(visible)
        if (visible) setHasBeenInView(true)
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, threshold, supported])

  return { isInView, hasBeenInView }
}
