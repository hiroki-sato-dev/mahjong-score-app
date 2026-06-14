import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'
import { prisma } from '@/lib/prisma'

import { DeleteGameButton } from './_components/DeleteGameButton'

const RANK_TONE = ['gold', 'felt', 'neutral', 'neg'] as const

export default async function AdminScoresPage() {
  const games = await prisma.game.findMany({
    orderBy: { playedAt: 'desc' },
    include: {
      scores: {
        include: { user: { select: { name: true } } },
        orderBy: { rank: 'asc' },
      },
    },
    take: 100,
  })

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-ink-1 text-xl font-bold">スコア管理</h1>

      {games.length === 0 ? (
        <Card className="text-ink-3 py-12 text-center text-[13px]">対戦記録がありません</Card>
      ) : (
        <div className="flex flex-col gap-3">
          {games.map((g) => (
            <Card key={g.id} padding="md">
              <div className="border-line mb-3 flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-ink-1 text-[14px] font-semibold">
                    {g.playedAt.toLocaleDateString('ja-JP')}
                  </span>
                  {g.withChip && <Chip tone="gold">チップ</Chip>}
                </div>
                <DeleteGameButton gameId={g.id} />
              </div>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {g.scores.map((s) => (
                  <div
                    key={s.id}
                    className="border-line flex items-center gap-2 rounded-md border p-2"
                  >
                    <Chip tone={RANK_TONE[s.rank - 1]} className="min-w-[40px] justify-center">
                      {s.rank}着
                    </Chip>
                    <span className="text-ink-1 flex-1 text-[13px] font-medium">{s.user.name}</span>
                    <span className="text-ink-2 num text-[12px] tabular-nums">
                      {s.rawScore.toLocaleString()}
                    </span>
                    <span
                      className={`num min-w-[60px] text-right text-[14px] font-semibold tabular-nums ${
                        s.finalScore >= 0 ? 'text-felt' : 'text-neg'
                      }`}
                    >
                      {s.finalScore > 0 ? `+${s.finalScore}` : s.finalScore}P
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
