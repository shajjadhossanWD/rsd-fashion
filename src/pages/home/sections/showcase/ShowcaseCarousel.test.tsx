import { fireEvent, renderWithProviders, screen, userEvent } from '@/test/test-utils'

import { ShowcaseCarousel } from './ShowcaseCarousel'

const slides = () => screen.getAllByRole('group', { hidden: true })
const visibleSlideIndex = () => slides().findIndex((s) => s.getAttribute('aria-hidden') === 'false')

describe('ShowcaseCarousel', () => {
  it('renders three slides with only the first exposed to assistive tech', () => {
    renderWithProviders(<ShowcaseCarousel />)

    expect(slides()).toHaveLength(3)
    expect(visibleSlideIndex()).toBe(0)
    expect(screen.getByRole('group', { name: /1 of 3/ })).toBeInTheDocument()
  })

  it('navigates with the arrows, wrapping at both ends', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ShowcaseCarousel />)

    await user.click(screen.getByRole('button', { name: 'Next slide' }))
    expect(visibleSlideIndex()).toBe(1)

    await user.click(screen.getByRole('button', { name: 'Previous slide' }))
    await user.click(screen.getByRole('button', { name: 'Previous slide' }))
    expect(visibleSlideIndex()).toBe(2)
  })

  it('jumps to a slide from its indicator and marks it current', async () => {
    const user = userEvent.setup()
    renderWithProviders(<ShowcaseCarousel />)

    const third = screen.getByRole('button', { name: /Go to slide 3/ })
    await user.click(third)

    expect(visibleSlideIndex()).toBe(2)
    expect(third).toHaveAttribute('aria-current', 'true')
  })

  it('supports ← / → keys', () => {
    renderWithProviders(<ShowcaseCarousel />)
    const carousel = screen.getByRole('region', { name: 'Highlights' })

    fireEvent.keyDown(carousel, { key: 'ArrowRight' })
    expect(visibleSlideIndex()).toBe(1)
    fireEvent.keyDown(carousel, { key: 'ArrowLeft' })
    expect(visibleSlideIndex()).toBe(0)
  })

  it('makes hidden slides inert so their links are not focusable', () => {
    renderWithProviders(<ShowcaseCarousel />)

    const [first, second] = slides()
    expect(first).not.toHaveAttribute('inert')
    expect(second).toHaveAttribute('inert')
  })
})
