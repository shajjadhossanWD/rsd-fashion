import { renderWithProviders, screen, within } from '@/test/test-utils'

import { ProductCategoriesSection } from './ProductCategoriesSection'

describe('ProductCategoriesSection', () => {
  it('lists all six categories as links to the filtered products page', () => {
    renderWithProviders(<ProductCategoriesSection />)

    const section = screen.getByRole('region', { name: 'Product Categories' })
    const links = within(section).getAllByRole('link')

    expect(links.map((l) => l.textContent)).toEqual([
      'Knitwear',
      'Crochet',
      'Woven',
      'Denim',
      'Jersey',
      'Accessories',
    ])
    expect(links[3]).toHaveAttribute('href', '/products?category=denim')
  })

  it('serves responsive thumbnails with descriptive alt text', () => {
    renderWithProviders(<ProductCategoriesSection />)

    const img = screen.getByRole('img', { name: /folded denim jeans/i })
    expect(img).toHaveAttribute('src', '/asset/products/denim-480.webp')
    expect(img.getAttribute('srcset')).toContain('denim-960.webp 960w')
  })
})
