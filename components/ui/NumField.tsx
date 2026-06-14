type NumFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  align?: 'left' | 'right'
  suffix?: string
}

export function NumField({ align = 'left', suffix, className = '', ...props }: NumFieldProps) {
  return (
    <div
      className={`border-line-strong bg-surface focus-within:border-felt focus-within:ring-felt/10 flex h-10 items-center rounded-md border-2 focus-within:ring-2 ${className}`}
    >
      <input
        type="number"
        inputMode="numeric"
        className={`text-ink-1 placeholder:text-ink-3/70 num h-full flex-1 bg-transparent px-3 text-[14px] outline-none ${
          align === 'right' ? 'text-right' : 'text-left'
        }`}
        {...props}
      />
      {suffix && <span className="text-ink-2 pr-3 text-[12px]">{suffix}</span>}
    </div>
  )
}
