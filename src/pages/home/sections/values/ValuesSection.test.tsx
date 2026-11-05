import { renderWithProviders, screen, within } from '@/test/test-utils'

import { ValuesSection } from './ValuesSection'

describe('ValuesSection', () => {
  it('is a labelled section with the photo and all four value cards', () => {
    renderWithProviders(<ValuesSection />)

    const section = screen.getByRole('region', { name: 'Our values' })
    expect(within(section).getByRole('img', { name: /patterned shirts/i })).toBeInTheDocument()

    const headings = within(section)
      .getAllByRole('heading', { level: 3 })
      .map((h) => h.textContent)
    expect(headings).toEqual([
      'Consistency',
      'Precision & Responsiveness',
      'Commitment & Stability',
      'Trustworthiness',
    ])
  })

  it('reveals its content once scrolled into view', () => {
    renderWithProviders(<ValuesSection />)

    // jsdom has no IntersectionObserver, so useInView treats the section as visible.
    expect(screen.getByRole('region', { name: 'Our values' })).toHaveAttribute(
      'data-revealed',
      'true',
    )
  })
})
