import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// jsdom lacks matchMedia. Default: no media query matches (mobile, motion allowed).
// Override per test with `vi.mocked(window.matchMedia).mockImplementation(...)`.
window.matchMedia = vi.fn<typeof window.matchMedia>(
  (query) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn<() => void>(),
      removeEventListener: vi.fn<() => void>(),
      addListener: vi.fn<() => void>(),
      removeListener: vi.fn<() => void>(),
      dispatchEvent: vi.fn<() => boolean>(),
    }) as unknown as MediaQueryList,
)

afterEach(() => {
  cleanup()
})
