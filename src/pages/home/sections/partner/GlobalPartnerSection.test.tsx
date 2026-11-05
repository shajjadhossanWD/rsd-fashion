import { renderWithProviders, screen, within } from '@/test/test-utils'

import { GlobalPartnerSection } from './GlobalPartnerSection'

describe('GlobalPartnerSection', () => {
  it('introduces the company and links to the contact page', () => {
    renderWithProviders(<GlobalPartnerSection />)

    const section = screen.getByRole('region', { name: /your global partner/i })
    expect(within(section).getByRole('link', { name: 'Let’s Contact' })).toHaveAttribute(
      'href',
      '/contact',
    )
  })

  it('uses the extracted, responsive photo inside the figure-8 frame', () => {
    renderWithProviders(<GlobalPartnerSection />)

    const img = screen.getByRole('img', { name: /yellow cropped hoodie/i })
    expect(img).toHaveAttribute('src', '/asset/about/global-partner-560.webp')
    expect(img.parentElement).toHaveClass('mask-figure8')
  })
})
