import { act, fireEvent, render, screen } from '@/test/test-utils'

import { BackToTop } from './BackToTop'

const setScrollY = (y: number) => {
  Object.defineProperty(window, 'scrollY', { value: y, configurable: true })
  act(() => {
    fireEvent.scroll(window)
  })
}

describe('BackToTop', () => {
  afterEach(() => {
    setScrollY(0)
    vi.restoreAllMocks()
  })

  it('is inert (not focusable or announced) near the top of the page', () => {
    render(<BackToTop />)

    expect(screen.getByLabelText('Back to top')).toHaveAttribute('inert')
  })

  it('appears after scrolling down and scrolls back to the top', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    render(<BackToTop />)

    setScrollY(2000)
    const button = screen.getByRole('button', { name: 'Back to top' })
    expect(button).not.toHaveAttribute('inert')

    fireEvent.click(button)
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })
})
