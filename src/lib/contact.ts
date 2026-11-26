import { site } from '@/config/site'

/** Builds a wa.me link that opens WhatsApp with an optional pre-filled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.contact.whatsapp}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export function phoneLink(): string {
  return `tel:${site.contact.phone}`
}
