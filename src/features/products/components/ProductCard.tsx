import { Link } from 'react-router'

import { paths } from '@/config/paths'
import { formatPrice } from '@/lib/format'

import type { Product } from '../types'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={paths.product(product.id)} className="group flex flex-col gap-3">
      <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-border bg-white p-6">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="size-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex items-start justify-between gap-4">
        <h3 className="line-clamp-2 text-sm">{product.title}</h3>
        <span className="shrink-0 text-sm font-medium">{formatPrice(product.price)}</span>
      </div>
      <p className="text-xs text-muted capitalize">{product.category}</p>
    </Link>
  )
}
