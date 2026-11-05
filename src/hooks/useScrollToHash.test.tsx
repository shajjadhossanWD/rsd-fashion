import { act, render } from '@testing-library/react'
import { useEffect, useState } from 'react'
import { MemoryRouter } from 'react-router'

import { useScrollToHash } from './useScrollToHash'

function Harness({ renderTargetAfterMs }: { renderTargetAfterMs: number }) {
  useScrollToHash()
  const [showTarget, setShowTarget] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setShowTarget(true), renderTargetAfterMs)
    return () => clearTimeout(t)
  }, [renderTargetAfterMs])
  return showTarget ? <section id="knitwear">Knitwear</section> : null
}

describe('useScrollToHash', () => {
  const scrollIntoView = vi.fn<Element['scrollIntoView']>()

  beforeEach(() => {
    vi.useFakeTimers()
    // jsdom doesn't implement scrolling.
    Element.prototype.scrollIntoView = scrollIntoView
    scrollIntoView.mockClear()
  })
  afterEach(() => vi.useRealTimers())

  it('waits for a lazily rendered target, then scrolls to it', async () => {
    render(
      <MemoryRouter initialEntries={['/products#knitwear']}>
        <Harness renderTargetAfterMs={500} />
      </MemoryRouter>,
    )
    expect(scrollIntoView).not.toHaveBeenCalled()

    await act(async () => {
      vi.advanceTimersByTime(500)
    })

    expect(scrollIntoView).toHaveBeenCalledTimes(1)
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' })
  })

  it('does nothing without a hash', async () => {
    render(
      <MemoryRouter initialEntries={['/products']}>
        <Harness renderTargetAfterMs={0} />
      </MemoryRouter>,
    )
    await act(async () => {
      vi.advanceTimersByTime(10)
    })

    expect(scrollIntoView).not.toHaveBeenCalled()
  })
})
