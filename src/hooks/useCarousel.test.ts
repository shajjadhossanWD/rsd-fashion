import { act, renderHook } from '@testing-library/react'

import { useCarousel } from './useCarousel'

describe('useCarousel', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('autoplays and wraps around', () => {
    const { result } = renderHook(() => useCarousel({ count: 3, interval: 1000 }))

    expect(result.current.index).toBe(0)
    act(() => vi.advanceTimersByTime(1000))
    expect(result.current.index).toBe(1)
    // One interval per act(): each next timer is scheduled after React re-renders.
    act(() => vi.advanceTimersByTime(1000))
    expect(result.current.index).toBe(2)
    act(() => vi.advanceTimersByTime(1000))
    expect(result.current.index).toBe(0)
  })

  it('does not advance while paused', () => {
    const { result } = renderHook(() => useCarousel({ count: 3, interval: 1000, paused: true }))

    act(() => vi.advanceTimersByTime(5000))
    expect(result.current.index).toBe(0)
  })

  it('restarts the countdown after manual navigation', () => {
    const { result } = renderHook(() => useCarousel({ count: 3, interval: 1000 }))

    act(() => vi.advanceTimersByTime(900))
    act(() => result.current.goTo(2))
    act(() => vi.advanceTimersByTime(900)) // would have flipped at 1000ms without the reset
    expect(result.current.index).toBe(2)
    act(() => vi.advanceTimersByTime(100))
    expect(result.current.index).toBe(0)
  })

  it('prev wraps from the first slide to the last', () => {
    const { result } = renderHook(() => useCarousel({ count: 3, paused: true }))

    act(() => result.current.prev())
    expect(result.current.index).toBe(2)
  })
})
