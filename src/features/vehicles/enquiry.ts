import { routes } from '@/config/routes'
import { site } from '@/config/site'
import { vehicleTitle, type Vehicle } from '@/features/vehicles/types'
import { formatKSh } from '@/lib/format'

/**
 * Pre-filled WhatsApp message for a specific vehicle. Always names the
 * year, make and model so the dealership knows exactly which car is meant,
 * and includes the page link.
 */
export function vehicleEnquiryMessage(vehicle: Vehicle, origin = window.location.origin): string {
  const title = vehicleTitle(vehicle)
  const link = `${origin}${routes.vehicle(vehicle.slug)}`

  if (vehicle.status === 'sold') {
    return `Hello ${site.shortName}, I saw the ${title} on your website (marked as sold). Do you have anything similar available?\n\n${link}`
  }

  return `Hello ${site.shortName}, I'm interested in the ${title} listed at ${formatKSh(vehicle.priceKsh)}. Is it still available?\n\n${link}`
}
