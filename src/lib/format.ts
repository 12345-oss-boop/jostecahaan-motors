const kesNumber = new Intl.NumberFormat('en-KE', { maximumFractionDigits: 0 })

/** Formats a price in Kenyan Shillings, e.g. 4500000 -> "KSh 4,500,000". */
export function formatKSh(amount: number): string {
  return `KSh ${kesNumber.format(amount)}`
}

/** Formats mileage, e.g. 68000 -> "68,000 km". */
export function formatMileage(km: number): string {
  return `${kesNumber.format(km)} km`
}
