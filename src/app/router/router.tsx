import { createBrowserRouter } from 'react-router'

import { RootLayout } from '@/app/layouts/RootLayout'
import { PageLoader, RouteErrorBoundary } from '@/components/feedback'
import { paths } from '@/config/paths'

/**
 * Pages are code-split via `lazy` — each route ships its own chunk.
 * Pages export `Component` so React Router can lazy-load them directly.
 */
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    HydrateFallback: PageLoader,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: paths.home,
        lazy: () => import('@/pages/home/HomePage'),
      },
      {
        path: paths.services,
        lazy: () => import('@/pages/services/ServicesPage'),
      },
      {
        path: paths.products,
        lazy: () => import('@/pages/products/ProductsPage'),
      },
      {
        path: paths.product(),
        lazy: () => import('@/pages/products/ProductDetailPage'),
      },
      {
        path: paths.about,
        lazy: () => import('@/pages/about/AboutPage'),
      },
      {
        path: paths.display,
        lazy: () => import('@/pages/display/DisplayPage'),
      },
      {
        path: paths.contact,
        lazy: () => import('@/pages/contact/ContactPage'),
      },
      {
        path: '*',
        lazy: () => import('@/pages/not-found/NotFoundPage'),
      },
    ],
  },
])
