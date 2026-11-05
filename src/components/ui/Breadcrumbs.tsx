import { Fragment } from 'react'
import { Link } from 'react-router'

export interface Crumb {
  label: string
  /** Omit for the current page (always the last crumb). */
  to?: string
}

/** Breadcrumb trail. Colours inherit from the parent so it works on any background. */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <Fragment key={item.label}>
              <li>
                {item.to && !isLast ? (
                  <Link
                    to={item.to}
                    className="underline-offset-4 opacity-80 transition-opacity hover:underline hover:opacity-100"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-semibold">
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast && (
                <li aria-hidden className="opacity-60">
                  /
                </li>
              )}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
