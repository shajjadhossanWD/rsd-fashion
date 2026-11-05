import { useEffect } from 'react'
import { useLocation } from 'react-router'

import { usePrefersReducedMotion } from './useMediaQuery'

/** Give a lazily loaded page this long to render the target before giving up. */
const TIMEOUT_MS = 3000

/**
 * Scrolls to the element whose id matches `location.hash` (e.g. /products#knitwear).
 *
 * React Router doesn't do this for client-side navigation, and the target often doesn't
 * exist yet (the page is code-split), so we wait for it with a MutationObserver.
 * The fixed-header offset comes from `scroll-margin-top` in globals.css.
 */
export function useScrollToHash() {
  const { hash, key } = useLocation()
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const id = decodeURIComponent(hash.slice(1))
    if (!id) return

    // 'instant', not 'auto': 'auto' defers to CSS scroll-behavior, which may be smooth.
    const behavior: ScrollBehavior = prefersReducedMotion ? 'instant' : 'smooth'
    const scrollTo = (el: Element) => el.scrollIntoView({ behavior, block: 'start' })

    const existing = document.getElementById(id)
    if (existing) {
      scrollTo(existing)
      return
    }

    const observer = new MutationObserver(() => {
      const el = document.getElementById(id)
      if (el) {
        cleanup()
        scrollTo(el)
      }
    })
    observer.observe(document.body, { childList: true, subtree: true })
    const timer = window.setTimeout(() => cleanup(), TIMEOUT_MS)

    function cleanup() {
      observer.disconnect()
      window.clearTimeout(timer)
    }
    return cleanup
    // `key` changes on every navigation, so clicking the same hash link again re-scrolls.
    // oxlint-disable-next-line react/exhaustive-effect-dependencies
  }, [hash, key, prefersReducedMotion])
}
