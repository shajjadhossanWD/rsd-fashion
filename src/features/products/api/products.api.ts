import { apiClient } from '@/lib/api-client'

import type { Product, ProductFilters } from '../types'

/** Pure data-access layer: no React, no caching — just HTTP. */
export const productsApi = {
  async list({ category }: ProductFilters = {}): Promise<Product[]> {
    const url = category ? `/products/category/${encodeURIComponent(category)}` : '/products'
    const { data } = await apiClient.get<Product[]>(url)
    return data
  },

  async getById(id: number): Promise<Product> {
    const { data } = await apiClient.get<Product>(`/products/${id}`)
    return data
  },
}
