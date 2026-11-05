import { siteConfig } from '@/config/site'

import { HeroSection } from './sections/HeroSection'
import { ShowcaseCarousel } from './sections/showcase/ShowcaseCarousel'
import { GlobalPartnerSection } from './sections/partner/GlobalPartnerSection'
import { PartnershipSection } from './sections/partnership/PartnershipSection'
import { ProductCategoriesSection } from './sections/products/ProductCategoriesSection'
import { ValuesSection } from './sections/values/ValuesSection'

/**
 * Home is composed of page-specific sections in `./sections`, in page order.
 */
export function Component() {
  return (
    <>
      <title>{siteConfig.name}</title>
      <HeroSection />
      <ShowcaseCarousel />
      <ValuesSection />
      <ProductCategoriesSection />
      <GlobalPartnerSection />
      <PartnershipSection />
    </>
  )
}
