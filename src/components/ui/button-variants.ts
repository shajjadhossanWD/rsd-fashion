import { cn } from '@/lib/cn'

const variants = {
  primary: 'bg-brand text-brand-foreground hover:bg-brand/90',
  /** Yellow call-to-action pill used on banners ("Discover more", "Explore more"). */
  accent: 'bg-accent font-bold text-brand shadow-md hover:bg-accent-hover',
  outline: 'border border-border bg-transparent hover:bg-brand/5',
  ghost: 'bg-transparent hover:bg-brand/5',
} as const

const sizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-5 text-sm',
  lg: 'h-12 px-8 text-base',
  /** Banner CTA: scales from phone to large desktop. */
  cta: 'h-12 px-7 text-base whitespace-nowrap sm:text-lg xl:h-14 xl:px-8 xl:text-[22px]',
} as const

export interface ButtonVariantProps {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  className?: string
}

/**
 * Button classes as a function, so non-button elements (e.g. router `<Link>`)
 * can look like buttons without nesting interactive elements.
 */
export function buttonVariants({
  variant = 'primary',
  size = 'md',
  className,
}: ButtonVariantProps = {}) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors',
    'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none',
    'disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    className,
  )
}
