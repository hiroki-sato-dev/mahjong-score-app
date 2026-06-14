type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  hint?: string
  error?: string
}

export function Input({ label, hint, error, className = '', id, ...props }: InputProps) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <span className="text-[12px] font-medium text-ink-2">{label}</span>
      )}
      <div
        className={`relative h-10 rounded-md border bg-surface flex items-center ${
          error ? 'border-neg' : 'border-line-strong focus-within:border-felt'
        }`}
      >
        <input
          id={id}
          className="flex-1 h-full px-3 text-[13px] text-ink-1 bg-transparent outline-none placeholder:text-ink-3"
          {...props}
        />
      </div>
      {hint && !error && <span className="text-[11px] text-ink-3">{hint}</span>}
      {error && <span className="text-[11px] text-neg">{error}</span>}
    </label>
  )
}
