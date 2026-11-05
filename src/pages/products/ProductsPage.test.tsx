import { PRODUCT_SECTIONS } from '@/config/catalog'
import { renderWithProviders, screen, within } from '@/test/test-utils'

import { Component as ProductsPage } from './ProductsPage'

describe('ProductsPage', () => {
  it('has a single page title and a breadcrumb back home', () => {
    renderWithProviders(<ProductsPage />, { route: '/products' })

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Product Categories')

    const breadcrumb = screen.getByRole('navigation', { name: 'Breadcrumb' })
    expect(within(breadcrumb).getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(within(breadcrumb).getByText('Products')).toHaveAttribute('aria-current', 'page')
  })

  it('introduces the categories with the audiences RSD sources for', () => {
    renderWithProviders(<ProductsPage />, { route: '/products' })

    const section = screen.getByRole('region', { name: /explore our product categories/i })
    const audiences = within(section).getByRole('list', { name: 'We source for' })
    expect(within(audiences).getAllByRole('listitem')).toHaveLength(5)
  })
})

describe('ProductsPage — Knitwear', () => {
  it('nests Sweaters under Knitwear with a readable gauge range', () => {
    renderWithProviders(<ProductsPage />, { route: '/products' })

    const knitwear = screen.getByRole('region', { name: 'Knitwear' })
    const sweaters = within(knitwear).getByRole('region', { name: 'Sweaters' })
    expect(within(sweaters).getByRole('heading', { level: 3 })).toHaveTextContent('Sweaters')
    // Screen readers get the gauges as a sentence rather than a row of chips.
    expect(sweaters).toHaveTextContent(/1\.5, 3, 5 and 7GG to 12 and 14GG/)
  })
})

describe('ProductsPage — category sections', () => {
  it('renders every category in page order, each labelled by its heading', () => {
    renderWithProviders(<ProductsPage />, { route: '/products' })

    const h2s = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)
    expect(h2s).toEqual([
      'Explore our Product Categories',
      'Knitwear',
      'Sportswear',
      'Wovenwear & Denim',
      'Kidswear',
    ])
  })

  it('presents the denim quote as a figure with a caption', () => {
    renderWithProviders(<ProductsPage />, { route: '/products' })

    const denim = screen.getByRole('region', { name: 'Wovenwear & Denim' })
    expect(within(denim).getByRole('figure')).toHaveTextContent(/under one roof/)
  })

  it('makes the mobile kidswear strip keyboard-scrollable and links the CTA', () => {
    renderWithProviders(<ProductsPage />, { route: '/products' })

    const kids = screen.getByRole('region', { name: 'Kidswear' })
    expect(within(kids).getByRole('list', { name: /scroll sideways/ })).toHaveAttribute(
      'tabindex',
      '0',
    )
    expect(within(kids).getByRole('link', { name: 'Learn more' })).toHaveAttribute(
      'href',
      '/contact',
    )
  })
})

describe('ProductsPage — anchors', () => {
  it('has an element for every section id the footer links to', () => {
    const { container } = renderWithProviders(<ProductsPage />, { route: '/products' })

    for (const { id } of Object.values(PRODUCT_SECTIONS)) {
      expect(container.querySelector(`#${id}`), `#${id}`).toBeInTheDocument()
    }
  })
})
