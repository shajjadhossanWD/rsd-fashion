import { PageContainer } from '@/components/ui'
import { siteConfig } from '@/config/site'

/** Temporary page body for routes whose design isn't implemented yet. */
export function ComingSoon({ title }: { title: string }) {
  return (
    <PageContainer className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <title>{`${title} | ${siteConfig.name}`}</title>
      <h1 className="font-display text-4xl">{title}</h1>
      <p className="text-muted">This page is coming soon.</p>
    </PageContainer>
  )
}
