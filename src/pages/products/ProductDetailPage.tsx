import { useParams } from 'react-router'

import { ErrorState, PageLoader } from '@/components/feedback'
import { Button, PageContainer } from '@/components/ui'
import { siteConfig } from '@/config/site'
import { useCartStore } from '@/features/cart'
import { useProduct } from '@/features/products'
import { formatPrice } from '@/lib/format'

export function Component() {
  const { productId } = useParams()
  const id = Number(productId)
  const { data: product, isPending, isError, refetch } = useProduct(id)
  const addItem = useCartStore((s) => s.addItem)

  if (!Number.isInteger(id)) {
    throw new Response('Product not found', { status: 404, statusText: 'Not Found' })
  }
  if (isPending) return <PageLoader />
  if (isError) {
    return (
      <PageContainer>
        <ErrorState title="Product unavailable" onRetry={() => void refetch()} />
      </PageContainer>
    )
  }

  return (
    <PageContainer className="grid gap-12 md:grid-cols-2">
      <title>{`${product.title} | ${siteConfig.name}`}</title>

      <div className="aspect-square rounded-3xl border border-border bg-white p-12">
        <img src={product.image} alt={product.title} className="size-full object-contain" />
      </div>

      <div className="flex flex-col gap-6">
        <p className="text-sm text-muted capitalize">{product.category}</p>
        <h1 className="font-display text-3xl">{product.title}</h1>
        <p className="text-2xl font-medium">{formatPrice(product.price)}</p>
        <p className="leading-relaxed text-muted">{product.description}</p>
        <Button size="lg" className="self-start" onClick={() => addItem(product)}>
          Add to cart
        </Button>
      </div>
    </PageContainer>
  )
}
