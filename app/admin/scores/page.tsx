import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'
import { formatSignedP } from '@/lib/format'
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
              <div className="text-ink-3 mb-2 grid grid-cols-[60px_1fr_80px_70px_90px] gap-2 px-2 text-[11px] font-medium">
                <span>順位</span>
                <span>部員</span>
                <span className="text-right">素点</span>
                <span className="text-right">素点P</span>
                <span className="text-right">P</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {g.scores.map((s) => (
                  <div
                    key={s.id}
                    className="border-line grid grid-cols-[60px_1fr_80px_70px_90px] items-center gap-2 rounded-md border px-2 py-1.5"
                  >
                    <Chip tone={RANK_TONE[s.rank - 1]} className="min-w-[40px] justify-center">
                      {s.rank}着
                    </Chip>
                    <span className="text-ink-1 text-[13px] font-medium">{s.user.name}</span>
                    <span className="text-ink-2 num text-right text-[12px] tabular-nums">
                      {s.rawScore.toLocaleString()}
                    </span>
                    <span
                      className={`num text-right text-[13px] font-semibold tabular-nums ${
                        s.subScore > 0 ? 'text-felt' : s.subScore < 0 ? 'text-neg' : 'text-ink-2'
                      }`}
                    >
                      {formatSignedP(s.subScore, '')}
                    </span>
                    <span
                      className={`num text-right text-[14px] font-semibold tabular-nums ${
                        s.finalScore >= 0 ? 'text-felt' : 'text-neg'
                      }`}
                    >
                      {formatSignedP(s.finalScore)}
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
