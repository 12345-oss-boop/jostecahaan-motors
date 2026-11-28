/**
 * Business details in one place. When the client supplies the street
 * address and opening hours, update them here and every page follows.
 */
export const site = {
  name: 'JOSTECAHAAN MOTORS',
  shortName: 'Jostecahaan Motors',
  tagline: 'Premium vehicles, Nakuru',
  description:
    'JOSTECAHAAN MOTORS is a premium car dealership in Nakuru, Kenya, offering carefully selected vehicles with transparent pricing in Kenyan Shillings.',
  location: {
    city: 'Nakuru',
    country: 'Kenya',
    /** To be supplied by the client. */
    streetAddress: null as string | null,
  },
  /** To be supplied by the client. */
  openingHours: null as string | null,
  contact: {
    /** International format, digits only, as required by WhatsApp links. */
    whatsapp: '254115401635',
    /** Phone number for the "Call" button (E.164 format). */
    phone: '+254115401635',
    phoneDisplay: '+254 115 401 635',
  },
  builtBy: { name: 'NovaPixel Labs' },
} as const
