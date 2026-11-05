import { queryOptions } from '@tanstack/react-query'

import type { ProductFilters } from '../types'

import { productsApi } from './products.api'

/**
 * Query key factory + query options. Co-locating keys keeps cache
 * invalidation predictable: `queryClient.invalidateQueries({ queryKey: productKeys.all })`.
 */
export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: ProductFilters) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
}

export const productQueries = {
  list: (filters: ProductFilters = {}) =>
    queryOptions({
      queryKey: productKeys.list(filters),
      queryFn: () => productsApi.list(filters),
    }),

  detail: (id: number) =>
    queryOptions({
      queryKey: productKeys.detail(id),
      queryFn: () => productsApi.getById(id),
      enabled: Number.isFinite(id),
    }),
}
