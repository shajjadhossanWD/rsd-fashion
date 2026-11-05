import { siteConfig } from '@/config/site'

import { DenimSection } from './sections/DenimSection'
import { ExploreCategoriesSection } from './sections/ExploreCategoriesSection'
import { KidswearSection } from './sections/KidswearSection'
import { KnitwearSection } from './sections/KnitwearSection'
import { ProductsHero } from './sections/ProductsHero'
import { SportswearSection } from './sections/SportswearSection'

/** Products page, composed of sections in `./sections`, in page order. */
export function Component() {
  return (
    <>
      <title>{`Products | ${siteConfig.name}`}</title>
      <ProductsHero />
      <ExploreCategoriesSection />
      <KnitwearSection />
      <SportswearSection />
      <DenimSection />
      <KidswearSection />
    </>
  )
}
