'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'
import { Input } from '@/components/ui/Input'
import { formatSignedP } from '@/lib/format'
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
                    key={s.userId}
                    className="border-line grid grid-cols-[60px_1fr_80px_70px_90px] items-center gap-2 rounded-md border px-2 py-1.5"
                  >
                    <Chip tone={RANK_TONE[s.rank - 1]} className="min-w-[40px] justify-center">
                      {s.rank}着
                    </Chip>
                    <span className="text-ink-1 text-[13px] font-medium">{s.userName}</span>
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
