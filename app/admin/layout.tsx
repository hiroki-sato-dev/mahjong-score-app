import { Header } from '@/components/ui/Header'

const navItems = [
  { label: 'メンバー管理', href: '/admin/members' },
  { label: 'スコア管理', href: '/admin/scores' },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header navItems={navItems} variant="admin" title="管理画面" />
      <main className="max-w-4xl mx-auto p-4">{children}</main>
    </div>
  )
}
