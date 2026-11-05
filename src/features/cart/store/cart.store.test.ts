import type { Product } from '@/features/products'

import { selectCartCount, useCartStore } from './cart.store'

const product = { id: 7, title: 'Tee', price: 20 } as Product

describe('cart store', () => {
  beforeEach(() => useCartStore.getState().clear())

  it('increments quantity when the same product is added twice', () => {
    useCartStore.getState().addItem(product)
    useCartStore.getState().addItem(product, 2)

    expect(useCartStore.getState().items).toHaveLength(1)
    expect(selectCartCount(useCartStore.getState())).toBe(3)
  })

  it('removes an item', () => {
    useCartStore.getState().addItem(product)
    useCartStore.getState().removeItem(product.id)

    expect(useCartStore.getState().items).toHaveLength(0)
  })
})
