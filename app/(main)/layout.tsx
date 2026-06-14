import { Header } from '@/components/ui/Header'
import { requireUser } from '@/lib/session'

const navItems = [
  { label: '部員一覧', href: '/members' },
  { label: 'スコア入力', href: '/score/new' },
  { label: '成績', href: '/results' },
  { label: 'ランキング', href: '/ranking' },
  { label: '管理', href: '/admin/members', executiveOnly: true },
]

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser()
  return (
    <div className="bg-paper min-h-screen">
      <Header navItems={navItems} userName={user.name} userRole={user.role} />
      <main className="mx-auto max-w-5xl p-4 md:p-6">{children}</main>
    </div>
  )
}
