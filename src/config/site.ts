import { paths } from '@/config/paths'

const ADDRESS = 'House-28, Road-4A, Block-B, Sector-15, Uttara, Dhaka-1230, Bangladesh'

export const siteConfig = {
  name: 'RSD-Fashion & Sourcing Ltd.',
  shortName: 'RSD Fashion',
  tagline: 'Where fashion meets precision',
  description: 'Fashion meets quality.',
  /** Short brand blurb (footer). */
  blurb:
    'Your global partner in apparel sourcing — knitwear, woven, denim, jersey and accessories, from sketch to shipment.',
  phone: {
    display: '+88 01829-883311',
    href: 'tel:+8801829883311',
  },
  email: {
    display: 'info@rsdfashion.com',
    href: 'mailto:info@rsdfashion.com',
  },
  address: {
    display: ADDRESS,
    mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`,
  },
  credit: { name: 'RSD Fashion' },
  logo: {
    nav: '/asset/rsdfshion-nav-logo.webp',
    /** Stacked logo with "Fashion meets quality", padding trimmed (npm run assets). */
    stacked: '/asset/brand/logo-stacked-480.webp',
  },
  nav: [
    { label: 'Home', to: paths.home },
    { label: 'Our Services', to: paths.services },
    { label: 'Products', to: paths.products },
    { label: 'About Us', to: paths.about },
    { label: 'Display', to: paths.display },
    { label: 'Contact Us', to: paths.contact },
  ],
} as const
