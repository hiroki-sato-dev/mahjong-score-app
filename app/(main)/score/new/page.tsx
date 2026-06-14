import { prisma } from '@/lib/prisma'

import { ScoreNewForm } from './_components/ScoreNewForm'

export default async function ScoreNewPage() {
  const members = await prisma.user.findMany({
    orderBy: { name: 'asc' },
    select: { id: true, name: true },
  })

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-ink-1 text-xl font-bold">スコア入力</h1>
      <ScoreNewForm members={members.map((m) => ({ id: m.id, name: m.name ?? '名無し' }))} />
    </div>
  )
}
