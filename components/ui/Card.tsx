type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  padding?: 'sm' | 'md' | 'lg'
}

const paddingClasses = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
}

export function Card({ padding = 'md', className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`bg-surface shadow-card border-line rounded-md border ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
