import { createBrowserRouter } from 'react-router'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { RouteErrorPage } from '@/pages/RouteErrorPage'
import { HomePage } from '@/pages/HomePage'
import { VehiclesPage } from '@/pages/VehiclesPage'
import { VehicleDetailsPage } from '@/pages/VehicleDetailsPage'
import { AboutPage } from '@/pages/AboutPage'
import { ContactPage } from '@/pages/ContactPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { routes } from '@/config/routes'

/*
 * Public pages are bundled normally so they load instantly.
 *
 * Everything under /admin uses `lazy`, which tells Vite to put that code in
 * separate files that are only downloaded when someone visits /admin.
 * Public visitors never download admin code.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    Component: PublicLayout,
    ErrorBoundary: RouteErrorPage,
    children: [
      { index: true, Component: HomePage },
      { path: routes.vehicles.slice(1), Component: VehiclesPage },
      { path: 'vehicles/:slug', Component: VehicleDetailsPage },
      { path: routes.about.slice(1), Component: AboutPage },
      { path: routes.contact.slice(1), Component: ContactPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
  {
    path: '/admin',
    ErrorBoundary: RouteErrorPage,
    lazy: async () => ({
      Component: (await import('@/components/layout/AdminLayout')).AdminLayout,
    }),
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('@/pages/admin/AdminDashboardPage')).AdminDashboardPage,
        }),
      },
      {
        path: 'login',
        lazy: async () => ({
          Component: (await import('@/pages/admin/AdminLoginPage')).AdminLoginPage,
        }),
      },
    ],
  },
])
