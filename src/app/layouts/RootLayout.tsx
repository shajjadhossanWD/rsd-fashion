import { Suspense } from 'react'
import { Outlet, ScrollRestoration } from 'react-router'

import { PageLoader } from '@/components/feedback'
import { useScrollToHash } from '@/hooks'

import { BackToTop } from './BackToTop'
import { Footer } from './Footer'
import { Header } from './Header'

export function RootLayout() {
  useScrollToHash()

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      {/* No top padding: the header is fixed and overlays content. See PageContainer. */}
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
      <ScrollRestoration />
    </div>
  )
}
