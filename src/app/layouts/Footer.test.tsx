import { siteConfig } from '@/config/site'
import { renderWithProviders, screen, within } from '@/test/test-utils'

import { Footer } from './Footer'

describe('Footer', () => {
  it('offers company and product navigation', () => {
    renderWithProviders(<Footer />)

    const company = screen.getByRole('navigation', { name: 'Footer — Company' })
    expect(within(company).getAllByRole('link')).toHaveLength(siteConfig.nav.length)

    const products = screen.getByRole('navigation', { name: 'Footer — Products' })
    expect(
      within(products)
        .getAllByRole('link')
        .map((l) => l.textContent),
    ).toEqual(['Knitwear', 'Sweaters', 'Sportswear', 'Wovenwear & Denim', 'Kidswear'])
    expect(within(products).getByRole('link', { name: 'Wovenwear & Denim' })).toHaveAttribute(
      'href',
      '/products#wovenwear-denim',
    )
  })

  it('makes every contact detail actionable', () => {
    renderWithProviders(<Footer />)

    expect(screen.getByRole('link', { name: siteConfig.phone.display })).toHaveAttribute(
      'href',
      'tel:+8801829883311',
    )
    expect(screen.getByRole('link', { name: siteConfig.email.display })).toHaveAttribute(
      'href',
      'mailto:info@rsdfashion.com',
    )

    const address = screen.getByRole('link', { name: /Uttara, Dhaka-1230/ })
    expect(address.getAttribute('href')).toMatch(/^https:\/\/www\.google\.com\/maps\/search/)
    expect(address).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('shows the copyright year and credit', () => {
    renderWithProviders(<Footer />)

    expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()}`))).toBeInTheDocument()
    expect(screen.getByText('Creative-Hand')).toBeInTheDocument()
  })
})
