/** Central list of URLs so links never drift out of sync with the router. */
export const routes = {
  home: '/',
  vehicles: '/vehicles',
  vehicle: (slug: string) => `/vehicles/${slug}`,
  about: '/about',
  contact: '/contact',
  admin: '/admin',
  adminLogin: '/admin/login',
} as const

export const primaryNav = [
  { label: 'Inventory', to: routes.vehicles },
  { label: 'About', to: routes.about },
  { label: 'Contact', to: routes.contact },
] as const
