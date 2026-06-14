type StatProps = {
  label: string
  value: string | number
  unit?: string
  tone?: 'neutral' | 'pos' | 'neg'
}

export function Stat({ label, value, unit, tone = 'neutral' }: StatProps) {
  const toneClass = tone === 'pos' ? 'text-felt' : tone === 'neg' ? 'text-neg' : 'text-ink-1'
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-ink-3 text-[11px] font-medium">{label}</span>
      <span className={`num text-[22px] font-semibold tabular-nums ${toneClass}`}>
        {value}
        {unit && <span className="text-ink-3 ml-0.5 text-[12px] font-normal">{unit}</span>}
      </span>
    </div>
  )
}
