import { ChevronUpIcon } from '@/components/icons'
import { usePrefersReducedMotion, useScrolledPast } from '@/hooks'
import { cn } from '@/lib/cn'

/** Floating "back to top" button; appears once the visitor is ~1.5 screens down. */
export function BackToTop() {
  const isVisible = useScrolledPast(1200)
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <button
      type="button"
      aria-label="Back to top"
      // While hidden: out of the tab order and the accessibility tree.
      inert={!isVisible}
      onClick={() =>
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'instant' : 'smooth' })
      }
      className={cn(
        'fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-40',
        'grid size-12 place-items-center rounded-full bg-brand text-accent shadow-lg ring-1 ring-white/10',
        'transition-[opacity,translate,background-color] duration-300 hover:bg-accent hover:text-brand',
        'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none',
        isVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <ChevronUpIcon className="size-6" />
    </button>
  )
}
