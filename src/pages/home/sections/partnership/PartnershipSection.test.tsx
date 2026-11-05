import { renderWithProviders, screen } from '@/test/test-utils'

import { PartnershipSection } from './PartnershipSection'

describe('PartnershipSection', () => {
  it('is labelled by its heading and contains the brand statement', () => {
    renderWithProviders(<PartnershipSection />)

    const section = screen.getByRole('region', { name: /isn’t just a sourcing partner/i })
    expect(section).toHaveTextContent(/excellence through every thread/i)
  })

  it('uses a decorative, responsive background photo', () => {
    const { container } = renderWithProviders(<PartnershipSection />)

    const bg = container.querySelector('img')
    expect(bg).toHaveAttribute('alt', '')
    expect(bg?.getAttribute('srcset')).toContain('partnership-1920.webp 1920w')
  })
})
