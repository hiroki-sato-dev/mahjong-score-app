type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  hint?: string
  error?: string
}

export function Input({ label, hint, error, className = '', id, ...props }: InputProps) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      {label && <span className="text-ink-2 text-[12px] font-medium">{label}</span>}
      <div
        className={`bg-surface relative flex h-10 items-center rounded-md border ${
          error ? 'border-neg' : 'border-line-strong focus-within:border-felt'
        }`}
      >
        <input
          id={id}
          className="text-ink-1 placeholder:text-ink-3 h-full flex-1 bg-transparent px-3 text-[13px] outline-none"
          {...props}
        />
      </div>
      {hint && !error && <span className="text-ink-3 text-[11px]">{hint}</span>}
      {error && <span className="text-neg text-[11px]">{error}</span>}
    </label>
  )
}
