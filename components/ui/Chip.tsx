type ChipTone = 'neutral' | 'felt' | 'neg' | 'gold'

type ChipProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: ChipTone
}

const toneClasses: Record<ChipTone, string> = {
  neutral: 'bg-paper text-ink-2 border-line',
  felt: 'bg-felt-soft text-felt border-felt/20',
  neg: 'bg-neg-soft text-neg border-neg/20',
  gold: 'bg-gold-soft text-gold border-gold/20',
}

export function Chip({ tone = 'neutral', className = '', children, ...props }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${toneClasses[tone]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
