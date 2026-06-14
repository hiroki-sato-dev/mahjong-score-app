type FieldProps = {
  label: string
  hint?: string
  error?: string
  required?: boolean
  children: React.ReactNode
}

export function Field({ label, hint, error, required, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-ink-2 text-[12px] font-medium">
        {label}
        {required && <span className="text-neg ml-1">*</span>}
      </label>
      {children}
      {hint && !error && <span className="text-ink-3 text-[11px]">{hint}</span>}
      {error && <span className="text-neg text-[11px]">{error}</span>}
    </div>
  )
}
