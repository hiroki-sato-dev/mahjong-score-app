import Link from 'next/link'

import type { Role } from '@/types'

import { SignOutButton } from './SignOutButton'

type NavItem = {
  label: string
  href: string
  executiveOnly?: boolean
}

type HeaderProps = {
  navItems: NavItem[]
  variant?: 'default' | 'admin'
  title?: string
  userName?: string | null
  userRole?: Role
}

export function Header({ navItems, variant = 'default', title, userName, userRole }: HeaderProps) {
  const isAdmin = variant === 'admin'
  const headerClass = isAdmin
    ? 'bg-felt-deep text-white border-felt-deep'
    : 'bg-surface text-ink-1 border-line'

  const visibleItems = navItems.filter((item) => !item.executiveOnly || userRole === 'EXECUTIVE')

  return (
    <header className={`border-b px-4 py-3 ${headerClass}`}>
      <nav className="mx-auto flex max-w-5xl items-center gap-1">
        <Link href="/members" className="mr-6 text-[14px] font-bold">
          {title ?? '麻雀部スコア'}
        </Link>
        {visibleItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-md px-3 py-1.5 text-[13px] font-medium ${
              isAdmin ? 'hover:bg-felt' : 'hover:bg-paper'
            }`}
          >
            {item.label}
          </Link>
        ))}
        <div className="ml-auto flex items-center gap-3">
          {userName && (
            <span className={`text-[12px] ${isAdmin ? 'text-white/80' : 'text-ink-2'}`}>
              {userName}
              {userRole === 'EXECUTIVE' && (
                <span className="bg-gold-soft text-gold ml-2 rounded-full px-2 py-0.5 text-[10px] font-medium">
                  幹部
                </span>
              )}
            </span>
          )}
          <SignOutButton variant={variant} />
        </div>
      </nav>
    </header>
  )
}
