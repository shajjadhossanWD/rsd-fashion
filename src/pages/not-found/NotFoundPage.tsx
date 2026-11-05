import { Link } from 'react-router'

import { buttonVariants, PageContainer } from '@/components/ui'
import { siteConfig } from '@/config/site'
import { paths } from '@/config/paths'

export function Component() {
  return (
    <PageContainer className="flex flex-col items-center gap-6 text-center">
      <title>{`Page not found | ${siteConfig.name}`}</title>
      <p className="text-sm text-muted">404</p>
      <h1 className="font-display text-4xl">Page not found</h1>
      <Link to={paths.home} className={buttonVariants({ variant: 'outline' })}>
        Back home
      </Link>
    </PageContainer>
  )
}
