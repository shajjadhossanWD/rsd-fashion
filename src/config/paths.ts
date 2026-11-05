import type { ProductSectionId } from '@/config/catalog'

/**
 * Centralised route paths. Always link via these helpers — never hard-code URLs —
 * so renaming a route is a one-line change.
 */
export const paths = {
  home: '/',
  services: '/services',
  products: '/products',
  product: (id: number | string = ':productId') => `/products/${id}`,
  /** A category section on the Products page, e.g. /products#knitwear. */
  productSection: (id: ProductSectionId) => `/products#${id}`,
  productCategory: (slug: string) => `/products?category=${encodeURIComponent(slug)}`,
  about: '/about',
  display: '/display',
  contact: '/contact',
} as const
