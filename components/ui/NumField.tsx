type NumFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  align?: 'left' | 'right'
  suffix?: string
}

export function NumField({ align = 'right', suffix, className = '', ...props }: NumFieldProps) {
  return (
    <div
      className={`border-line-strong bg-surface focus-within:border-felt flex h-10 items-center rounded-md border ${className}`}
    >
      <input
        type="number"
        inputMode="numeric"
        className={`text-ink-1 placeholder:text-ink-3 num h-full flex-1 bg-transparent px-3 text-[14px] outline-none ${
          align === 'right' ? 'text-right' : 'text-left'
        }`}
        {...props}
      />
      {suffix && <span className="text-ink-3 pr-3 text-[12px]">{suffix}</span>}
    </div>
  )
}
