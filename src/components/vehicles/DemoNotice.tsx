type DemoNoticeProps = { className?: string }

/** Banner explaining that sample listings are not real inventory. */
export function DemoNotice({ className = '' }: DemoNoticeProps) {
  return (
    <div
      role="note"
      className={`flex gap-3 border border-gold/30 bg-gold/[0.06] px-4 py-3 text-sm text-ivory-muted ${className}`}
    >
      <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-gold" />
      <p>
        <strong className="font-semibold text-gold-light">Demonstration content.</strong> The
        vehicles shown are samples used to preview the website. They are not current stock.
      </p>
    </div>
  )
}
