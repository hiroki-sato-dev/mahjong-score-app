type ButtonKind = 'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  kind?: ButtonKind
  size?: ButtonSize
}

const kindClasses: Record<ButtonKind, string> = {
  primary: 'bg-felt text-white hover:bg-felt-deep',
  secondary: 'bg-surface text-ink-1 border border-line-strong hover:bg-paper',
  ghost: 'text-ink-2 hover:bg-paper',
  danger: 'bg-neg text-white hover:bg-neg/90',
  'danger-ghost': 'text-neg hover:bg-neg-soft',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-[12px]',
  md: 'h-9 px-4 text-[13px]',
  lg: 'h-10 px-5 text-[14px]',
}

export function Button({
  kind = 'secondary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex cursor-default items-center justify-center gap-1.5 rounded-md font-medium transition-colors disabled:opacity-50 ${kindClasses[kind]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
