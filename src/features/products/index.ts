// Public API of the products feature. Import from '@/features/products' only —
// never reach into its internals from outside the feature.
export { productKeys, productQueries } from './api/products.queries'
export { ProductCard } from './components/ProductCard'
export { ProductGrid } from './components/ProductGrid'
export { useProduct, useProducts } from './hooks/useProducts'
export type { Product, ProductFilters } from './types'
