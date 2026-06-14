'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'
import { Input } from '@/components/ui/Input'
import type { DailyGame } from '@/lib/results'

type Props = {
  games: DailyGame[]
  date?: string
}

const RANK_TONE = ['gold', 'felt', 'neutral', 'neg'] as const

export function DailyView({ games, date }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function setDate(value: string) {
    const next = new URLSearchParams(searchParams)
    next.set('tab', 'daily')
    if (value) next.set('date', value)
    else next.delete('date')
    router.push(`/results?${next.toString()}`)
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-ink-2 text-[12px] font-medium">日付フィルター</span>
          <Input
            type="date"
            value={date ?? ''}
            onChange={(e) => setDate(e.target.value)}
            className="w-48"
          />
        </div>
        {date && (
          <button
            type="button"
            onClick={() => setDate('')}
            className="text-ink-2 hover:text-ink-1 px-3 text-[12px] underline"
          >
            クリア
          </button>
        )}
      </Card>

      {games.length === 0 ? (
        <Card className="text-ink-3 py-12 text-center text-[13px]">対戦記録がありません</Card>
      ) : (
        <div className="flex flex-col gap-3">
          {games.map((g) => (
            <Card key={g.gameId} padding="md">
              <div className="border-line mb-3 flex items-center justify-between border-b pb-2">
                <span className="text-ink-1 text-[14px] font-semibold">
                  {g.playedAt.toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </span>
                {g.withChip && <Chip tone="gold">チップあり</Chip>}
              </div>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {g.scores.map((s) => (
                  <div
                    key={s.userId}
                    className="border-line flex items-center gap-3 rounded-md border p-2"
                  >
                    <Chip tone={RANK_TONE[s.rank - 1]} className="min-w-[40px] justify-center">
                      {s.rank}着
                    </Chip>
                    <span className="text-ink-1 flex-1 text-[13px] font-medium">{s.userName}</span>
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
