import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'

import { MenuIcon, PhoneIcon, XIcon } from '@/components/icons'
import { useScrolledPast } from '@/hooks'
import { paths } from '@/config/paths'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/cn'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'whitespace-nowrap transition-colors hover:text-brand',
    isActive ? 'font-black text-brand' : 'font-bold text-brand/85',
  )

/**
 * Fixed, frosted "pill" header that floats over page content (incl. the home hero).
 * Pages that don't start with a full-bleed hero should use `PageContainer`,
 * which adds the top offset needed to clear it.
 *
 * Breakpoints:
 *  - < md    logo + menu button (phone number lives in the menu)
 *  - md–xl   logo + phone + menu button
 *  - ≥ xl    logo + inline nav + phone   (sizes scale fluidly with viewport width)
 */
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeMenu = () => setIsMenuOpen(false)
  // Over the light hero the bar is airy glass; once scrolled over darker content it
  // firms up so the dark logo and nav stay readable.
  const isScrolled = useScrolledPast(24)

  // Close the menu on Escape, and when the viewport grows past the inline-nav breakpoint.
  useEffect(() => {
    if (!isMenuOpen) return

    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && setIsMenuOpen(false)
    const desktop = window.matchMedia('(min-width: 80rem)')
    const onResize = () => desktop.matches && setIsMenuOpen(false)

    window.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onResize)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onResize)
    }
  }, [isMenuOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'relative flex h-(--header-h) items-center gap-4 px-4 sm:px-6 lg:px-10 2xl:px-12',
          'rounded-b-[1.5rem] sm:rounded-b-[1.75rem] lg:rounded-[2.25rem]',
          'border-b-[3px] border-brand/80 transition-[background-color,backdrop-filter] duration-300',
          isScrolled ? 'bg-white/85 backdrop-blur-md' : 'bg-white/50 backdrop-blur-[3px]',
          'shadow-[0_8px_12px_-6px_rgba(0,0,0,0.4)]',
        )}
      >
        <Link to={paths.home} onClick={closeMenu} className="shrink-0">
          <img
            src={siteConfig.logo.nav}
            alt={siteConfig.name}
            width={1065}
            height={172}
            // Fluid width: ~200px on small phones → 545px on 1920px+ screens.
            className="h-auto w-[min(56vw,250px)] md:w-[clamp(250px,21vw,400px)]"
          />
        </Link>

        <nav
          aria-label="Main"
          className="mx-auto hidden items-center gap-[clamp(1rem,1.3vw,1.5rem)] text-[clamp(14.5px,0.88vw,17px)] xl:flex"
        >
          {siteConfig.nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === paths.home}
              className={navLinkClass}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <a
          href={siteConfig.phone.href}
          className={cn(
            'ml-auto hidden shrink-0 items-center gap-2.5 self-stretch border-l border-brand/10 pl-6 font-bold whitespace-nowrap md:flex xl:ml-0 2xl:pl-8',
            'text-[clamp(14.5px,0.88vw,17px)]',
          )}
        >
          <PhoneIcon className="size-4" />
          {siteConfig.phone.display}
        </a>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="-mr-2 ml-auto shrink-0 rounded-full p-2 hover:bg-brand/5 md:ml-0 xl:hidden"
        >
          {isMenuOpen ? <XIcon className="size-6" /> : <MenuIcon className="size-6" />}
        </button>
      </div>

      {isMenuOpen && (
        // Tap-outside-to-close layer (sits under the header bar and the menu panel).
        <div aria-hidden className="fixed inset-0 -z-10 xl:hidden" onClick={closeMenu} />
      )}

      {isMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className={cn(
            'mx-3 mt-3 flex flex-col gap-1 rounded-3xl bg-white/95 p-3 text-base shadow-lg backdrop-blur sm:mx-6 sm:ml-auto sm:w-80 xl:hidden',
            // Scroll inside the panel on short (landscape) screens.
            'max-h-[calc(100svh-var(--header-h)-1.5rem)] overflow-y-auto overscroll-contain',
          )}
        >
          {siteConfig.nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === paths.home}
              onClick={closeMenu}
              className={(state) =>
                cn(navLinkClass(state), 'rounded-xl px-4 py-3 hover:bg-brand/5')
              }
            >
              {item.label}
            </NavLink>
          ))}
          <a
            href={siteConfig.phone.href}
            className="mx-4 mt-1 flex items-center gap-3 border-t border-brand/10 pt-4 pb-2 font-bold md:hidden"
          >
            <PhoneIcon className="size-4" />
            {siteConfig.phone.display}
          </a>
        </nav>
      )}
    </header>
  )
}
