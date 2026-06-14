import { Header } from '@/components/ui/Header'

const navItems = [
  { label: 'メンバー', href: '/members' },
  { label: 'スコア入力', href: '/score' },
  { label: '結果', href: '/results' },
  { label: 'ランキング', href: '/ranking' },
]

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header navItems={navItems} />
      <main className="mx-auto max-w-4xl p-4">{children}</main>
    </div>
  )
}
