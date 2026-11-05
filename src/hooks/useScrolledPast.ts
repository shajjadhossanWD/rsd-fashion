import { useCallback, useSyncExternalStore } from 'react'

/** True once the window has scrolled more than `offset` px. Passive listener, SSR-safe. */
export function useScrolledPast(offset = 0): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    window.addEventListener('scroll', onChange, { passive: true })
    return () => window.removeEventListener('scroll', onChange)
  }, [])

  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > offset,
    () => false,
  )
}
