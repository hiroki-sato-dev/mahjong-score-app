import { Card } from '@/components/ui/Card'
import { prisma } from '@/lib/prisma'

import { AddMemberForm } from './_components/AddMemberForm'
import { MemberRow } from './_components/MemberRow'

export default async function AdminMembersPage() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      _count: { select: { scores: true } },
    },
    orderBy: { createdAt: 'asc' },
  })

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-ink-1 text-xl font-bold">部員管理</h1>

      <Card>
        <h2 className="text-ink-1 mb-3 text-[14px] font-semibold">新規部員追加</h2>
        <AddMemberForm />
      </Card>

      <Card>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-line text-ink-3 border-b text-left">
              <th className="px-2 py-2 font-medium">名前</th>
              <th className="px-2 py-2 font-medium">メール</th>
              <th className="px-2 py-2 font-medium">ロール</th>
              <th className="px-2 py-2 text-right font-medium">試合数</th>
              <th className="px-2 py-2 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <MemberRow
                key={u.id}
                member={{
                  id: u.id,
                  email: u.email,
                  name: u.name ?? '',
                  role: u.role,
                  gamesPlayed: u._count.scores,
                }}
              />
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
