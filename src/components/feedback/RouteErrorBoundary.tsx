import { isRouteErrorResponse, useRouteError } from 'react-router'

import { PageContainer } from '@/components/ui'

import { ErrorState } from './ErrorState'

/** Rendered by the router whenever a route throws during render or loading. */
export function RouteErrorBoundary() {
  const error = useRouteError()

  const message = isRouteErrorResponse(error)
    ? `${error.status} — ${error.statusText}`
    : error instanceof Error
      ? error.message
      : 'Unknown error'

  return (
    <PageContainer>
      <ErrorState message={message} onRetry={() => window.location.reload()} />
    </PageContainer>
  )
}
