import { ButtonAnchor } from '@/components/ui/ButtonLink'
import { PhoneIcon, WhatsAppIcon } from '@/components/ui/Icons'
import { phoneLink, whatsappLink } from '@/lib/contact'

type EnquiryButtonsProps = {
  /** Pre-filled WhatsApp message, e.g. mentioning a specific vehicle. */
  message?: string
  className?: string
}

/** WhatsApp + Call buttons — the site's primary enquiry channel. */
export function EnquiryButtons({ message, className = '' }: EnquiryButtonsProps) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <ButtonAnchor href={whatsappLink(message)} external>
        <WhatsAppIcon />
        Enquire on WhatsApp
      </ButtonAnchor>
      <ButtonAnchor href={phoneLink()} variant="outline">
        <PhoneIcon />
        Call us
      </ButtonAnchor>
    </div>
  )
}
