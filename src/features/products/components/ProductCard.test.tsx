import { renderWithProviders, screen } from '@/test/test-utils'

import type { Product } from '../types'

import { ProductCard } from './ProductCard'

const product: Product = {
  id: 1,
  title: 'Linen Shirt',
  price: 49.5,
  description: 'Breathable linen shirt',
  category: "men's clothing",
  image: 'https://example.com/shirt.jpg',
}

describe('ProductCard', () => {
  it('renders title, formatted price and links to the product page', () => {
    renderWithProviders(<ProductCard product={product} />)

    expect(screen.getByText('Linen Shirt')).toBeInTheDocument()
    expect(screen.getByText('$49.50')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/products/1')
  })
})
