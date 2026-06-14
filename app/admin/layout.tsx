import { Header } from '@/components/ui/Header'
import { requireExecutive } from '@/lib/session'

const navItems = [
  { label: '部員管理', href: '/admin/members' },
  { label: 'スコア管理', href: '/admin/scores' },
  { label: 'ユーザー画面に戻る', href: '/members' },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireExecutive()
  return (
    <div className="bg-paper min-h-screen">
      <Header
        navItems={navItems}
        variant="admin"
        title="管理画面"
        userName={user.name}
        userRole={user.role}
      />
      <main className="mx-auto max-w-5xl p-4 md:p-6">{children}</main>
    </div>
  )
}
