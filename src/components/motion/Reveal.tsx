import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/cn'

interface RevealProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Order within its group; each step enters `stepDelay` ms after the previous one. */
  step?: number
  /** Delay before step 0, in ms. */
  baseDelay?: number
  stepDelay?: number
  as?: ElementType
  className?: string
  children: ReactNode
}

/**
 * Fade-and-lift entrance, triggered by an ancestor:
 *
 *   <section className="group/reveal" data-revealed={isInView}>
 *     <Reveal step={0}>…</Reveal>
 *     <Reveal step={1}>…</Reveal>
 *   </section>
 *
 * Leaving is immediate (delays apply only on the way in), so content never lingers.
 * With reduced motion it only fades.
 */
export function Reveal({
  step = 0,
  baseDelay = 0,
  stepDelay = 140,
  as: Tag = 'div',
  className,
  style,
  children,
  ...rest
}: RevealProps) {
  return (
    <Tag
      className={cn(
        'translate-y-6 opacity-0 transition-[opacity,translate] duration-700 ease-out',
        'group-data-[revealed=true]/reveal:translate-y-0 group-data-[revealed=true]/reveal:opacity-100',
        'group-data-[revealed=true]/reveal:delay-(--reveal-delay)',
        'motion-reduce:translate-y-0',
        className,
      )}
      style={{ '--reveal-delay': `${baseDelay + step * stepDelay}ms`, ...style } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  )
}
