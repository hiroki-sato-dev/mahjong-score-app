'use client'

type ToggleSize = 'md' | 'lg'

type ToggleProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  size?: ToggleSize
  disabled?: boolean
}

const sizeConfig: Record<ToggleSize, { w: number; h: number; knob: number }> = {
  md: { w: 38, h: 20, knob: 16 },
  lg: { w: 46, h: 24, knob: 18 },
}

export function Toggle({ checked, onChange, label, size = 'md', disabled = false }: ToggleProps) {
  const sz = sizeConfig[size]
  return (
    <span className="text-ink-1 inline-flex items-center gap-2 text-[13px]">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative cursor-default rounded-full transition-colors disabled:opacity-50 ${
          checked ? 'bg-felt' : 'bg-line-strong'
        }`}
        style={{ width: sz.w, height: sz.h }}
      >
        <span
          className="shadow-card absolute top-1/2 -translate-y-1/2 rounded-full bg-white transition-all"
          style={{
            width: sz.knob,
            height: sz.knob,
            left: checked ? sz.w - sz.knob - 2 : 2,
          }}
        />
      </button>
      {label && <span>{label}</span>}
    </span>
  )
}
