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
      <nav className="max-w-4xl mx-auto flex gap-4 items-center">
        {title && <span className="font-bold mr-4">{title}</span>}
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
