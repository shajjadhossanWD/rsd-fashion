import type { ComponentType, ReactNode, SVGProps } from 'react'
import { Link } from 'react-router'

import { ArrowRightIcon, MailIcon, MapPinIcon, PhoneIcon } from '@/components/icons'
import { buttonVariants } from '@/components/ui'
import { PRODUCT_SECTIONS } from '@/config/catalog'
import { paths } from '@/config/paths'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/cn'

const CURRENT_YEAR = new Date().getFullYear()
const BG = (width: 960 | 1920) => `/asset/brand/footer-bg-${width}.webp`

/**
 * Site footer: brand · quick links · product categories · contact, over the yarn photo,
 * then a dark legal bar.
 *
 * Grid: phones — brand and contact full width, the two link lists side by side;
 *       lg   — four columns.
 */
export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden text-brand">
      {/* Brand-coloured hairline separating the footer from the last section. */}
      <div aria-hidden className="h-1 bg-linear-to-r from-accent via-[#9ccf4a] to-leaf" />

      <img
        src={BG(960)}
        srcSet={`${BG(960)} 960w, ${BG(1920)} 1920w`}
        sizes="100vw"
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-20 size-full object-cover object-[70%_60%]"
      />
      {/* Veil: strong on the text side, lighter on the right so the yarn still reads. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-r from-[#f7f5f1]/95 via-[#f7f5f1]/88 to-[#f7f5f1]/70"
      />

      <div
        className={cn(
          'mx-auto grid w-full max-w-[1680px] grid-cols-2 px-[clamp(1.25rem,7vw,8.5rem)]',
          'gap-x-6 gap-y-10 py-[clamp(3rem,5.5vw,5.5rem)]',
          'lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.8fr)_minmax(0,0.8fr)_minmax(0,1.35fr)] lg:gap-x-[clamp(2rem,4vw,5rem)]',
        )}
      >
        {/* Brand */}
        <div className="col-span-2 flex flex-col items-center text-center lg:col-span-1 lg:items-start lg:text-left">
          <Link to={paths.home} aria-label={`${siteConfig.name} — home`}>
            <img
              src={siteConfig.logo.stacked}
              alt=""
              width={480}
              height={448}
              loading="lazy"
              className="w-[clamp(9.5rem,13vw,13rem)]"
            />
          </Link>
          <p className="mt-5 max-w-[34ch] font-roboto text-[0.95rem] leading-relaxed text-brand/75">
            {siteConfig.blurb}
          </p>
        </div>

        <FooterNav title="Company" className="lg:pt-2">
          {siteConfig.nav.map((item) => (
            <FooterLink key={item.to} to={item.to}>
              {item.label}
            </FooterLink>
          ))}
        </FooterNav>

        <FooterNav title="Products" className="lg:pt-2">
          {/* Mirrors the Products page sections, linking straight to each one. */}
          {Object.values(PRODUCT_SECTIONS).map((section) => (
            <FooterLink key={section.id} to={paths.productSection(section.id)}>
              {section.label}
            </FooterLink>
          ))}
        </FooterNav>

        {/* Contact */}
        <div className="col-span-2 lg:col-span-1 lg:pt-2">
          <FooterHeading>Get in touch</FooterHeading>
          <address className="mt-5 flex flex-col gap-4 font-roboto text-[0.95rem] not-italic">
            <ContactRow
              icon={MapPinIcon}
              href={siteConfig.address.mapUrl}
              external
              label="Open address in Google Maps"
            >
              {siteConfig.address.display}
            </ContactRow>
            <ContactRow icon={PhoneIcon} href={siteConfig.phone.href} label="Call us">
              {siteConfig.phone.display}
            </ContactRow>
            <ContactRow icon={MailIcon} href={siteConfig.email.href} label="Email us">
              {siteConfig.email.display}
            </ContactRow>
          </address>
          <Link
            to={paths.contact}
            className={buttonVariants({ variant: 'accent', size: 'md', className: 'mt-6' })}
          >
            Start a project <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </div>

      {/* Legal bar */}
      <div className="bg-brand text-white/70">
        <div
          className={cn(
            // Phones: extra bottom room so the floating back-to-top button never covers the text.
            'mx-auto flex w-full max-w-[1680px] flex-col items-center gap-1.5 px-[clamp(1.25rem,7vw,8.5rem)] pt-4 pb-20 sm:pb-4',
            'text-center font-roboto text-[0.8125rem] sm:flex-row sm:justify-between sm:text-left',
          )}
        >
          <p>
            © {CURRENT_YEAR} {siteConfig.name} All rights reserved.
          </p>
          <p>
            Crafted by <span className="font-medium text-accent">{siteConfig.credit.name}</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-condensed text-[1.6rem] leading-none tracking-wider text-brand">
      {children}
      <span aria-hidden className="mt-2.5 block h-0.5 w-8 rounded-full bg-accent" />
    </h2>
  )
}

function FooterNav({
  title,
  className,
  children,
}: {
  title: string
  className?: string
  children: ReactNode
}) {
  return (
    <nav aria-label={`Footer — ${title}`} className={className}>
      <FooterHeading>{title}</FooterHeading>
      <ul className="mt-5 flex flex-col gap-2.5 font-roboto text-[0.95rem]">{children}</ul>
    </nav>
  )
}

function FooterLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <li>
      <Link
        to={to}
        className="text-brand/75 underline-offset-4 transition-colors hover:text-brand hover:underline"
      >
        {children}
      </Link>
    </li>
  )
}

function ContactRow({
  icon: Icon,
  href,
  label,
  external = false,
  children,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  href: string
  label: string
  external?: boolean
  children: ReactNode
}) {
  return (
    <a
      href={href}
      title={label}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      className="group/contact flex items-start gap-3 text-brand/80 transition-colors hover:text-brand"
    >
      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-brand text-accent transition-colors group-hover/contact:bg-accent group-hover/contact:text-brand">
        <Icon className="size-4" />
      </span>
      <span className="pt-1 leading-snug break-words">{children}</span>
    </a>
  )
}
