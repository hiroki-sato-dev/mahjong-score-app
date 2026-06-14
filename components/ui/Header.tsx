type NavItem = {
  label: string
  href: string
}

type HeaderProps = {
  navItems: NavItem[]
  variant?: 'default' | 'admin'
  title?: string
}

export function Header({ navItems, variant = 'default', title }: HeaderProps) {
  const bgClass = variant === 'admin' ? 'bg-red-700 text-white' : 'bg-white border-b'

  return (
    <header className={`px-4 py-3 ${bgClass}`}>
      <nav className="mx-auto flex max-w-4xl items-center gap-4">
        {title && <span className="mr-4 font-bold">{title}</span>}
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
