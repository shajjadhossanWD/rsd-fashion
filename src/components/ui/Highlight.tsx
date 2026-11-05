import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

interface HighlightProps {
  /** Background (usually a gradient) painted behind the text. */
  className: string
  /**
   * `false` (default): the gradient runs continuously across all wrapped lines, as if the
   * lines were laid end to end. `true`: every line gets the full gradient on its own.
   */
  clone?: boolean
  children: ReactNode
}

/** Inline "highlighter-pen" band behind text; each wrapped line gets its own band. */
export function Highlight({ className, clone = false, children }: HighlightProps) {
  return (
    <span
      className={cn(
        'py-0.5 [text-shadow:none]',
        clone ? 'box-decoration-clone' : 'box-decoration-slice',
        className,
      )}
    >
      {children}
    </span>
  )
}
