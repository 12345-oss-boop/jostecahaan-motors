import { WhatsAppIcon } from '@/components/ui/Icons'
import { whatsappLink } from '@/lib/contact'

/** Always-visible WhatsApp shortcut in the bottom corner. */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-4 bottom-4 z-30 grid size-14 place-items-center rounded-full bg-gold text-ink shadow-lg shadow-black/50 transition-transform duration-300 hover:scale-105 hover:bg-gold-light sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-6" />
    </a>
  )
}
