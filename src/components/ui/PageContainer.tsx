import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/lib/cn'

import { Container } from './Container'

/** Container for standard (non-hero) pages — offsets content below the fixed header. */
export function PageContainer({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <Container
      className={cn('pt-[calc(var(--header-h)+2.5rem)] pb-16 lg:pb-24', className)}
      {...props}
    />
  )
}
