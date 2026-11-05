import { useQuery } from '@tanstack/react-query'

import { productQueries } from '../api/products.queries'
import type { ProductFilters } from '../types'

export function useProducts(filters?: ProductFilters) {
  return useQuery(productQueries.list(filters))
}

export function useProduct(id: number) {
  return useQuery(productQueries.detail(id))
}
