'use client'

import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Field } from '@/components/ui/Field'
import { Input } from '@/components/ui/Input'
import { NumField } from '@/components/ui/NumField'
import { Stat } from '@/components/ui/Stat'
import { Toggle } from '@/components/ui/Toggle'
import { calcPoints } from '@/lib/points'

import { saveScore } from '../actions'

type Member = { id: string; name: string }

type Props = {
  members: Member[]
}

type Seat = { userId: string; rawScore: string; chipCount: string }

const SEAT_LABELS = ['東', '南', '西', '北']

export function ScoreNewForm({ members }: Props) {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [withChip, setWithChip] = useState(false)
  const [seats, setSeats] = useState<Seat[]>([
    { userId: '', rawScore: '', chipCount: '' },
    { userId: '', rawScore: '', chipCount: '' },
    { userId: '', rawScore: '', chipCount: '' },
    { userId: '', rawScore: '', chipCount: '' },
  ])
  const [error, setError] = useState<string | undefined>()
  const [pending, setPending] = useState(false)

  function updateSeat(idx: number, patch: Partial<Seat>) {
    setSeats((prev) => prev.map((s, i) => (i === idx ? { ...s, ...patch } : s)))
  }

  const parsedScores = useMemo(
    () =>
      seats.map((s) => ({
        userId: s.userId,
        rawScore: Number(s.rawScore),
        chipCount: Number(s.chipCount || 0),
      })),
    [seats],
  )

  const allFilled = parsedScores.every(
    (s) => s.userId && Number.isFinite(s.rawScore) && s.rawScore !== 0,
  )
  const uniqueUsers = new Set(parsedScores.map((s) => s.userId).filter(Boolean)).size === 4
  const totalScore = parsedScores.reduce((sum, s) => sum + s.rawScore, 0)
  const scoresValid = allFilled && uniqueUsers && totalScore === 100000

  const preview = useMemo(() => {
    if (!scoresValid) return null
    try {
      return calcPoints(parsedScores, withChip)
    } catch {
      return null
    }
  }, [parsedScores, withChip, scoresValid])

  async function handleSubmit() {
    setError(undefined)
    setPending(true)
    const result = await saveScore({
      date,
      withChip,
      scores: parsedScores,
    })
    if (result?.error) {
      setError(result.error)
      setPending(false)
    }
  }

  return (
    <Card padding="lg" className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="対戦日" required>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </Field>
        <Field label="チップ">
          <div className="flex h-10 items-center">
            <Toggle checked={withChip} onChange={setWithChip} label="チップあり" />
          </div>
        </Field>
      </div>

      <div className="flex flex-col gap-3">
        {seats.map((seat, idx) => (
          <div
            key={idx}
            className="border-line bg-paper grid grid-cols-1 gap-3 rounded-md border p-3 md:grid-cols-[56px_minmax(200px,1fr)_160px_140px] md:items-end"
          >
            <div className="bg-felt text-surface flex h-10 items-center justify-center self-end rounded-md text-[14px] font-bold">
              {SEAT_LABELS[idx]}
            </div>
            <Field label="部員">
              <select
                value={seat.userId}
                onChange={(e) => updateSeat(idx, { userId: e.target.value })}
                className="bg-surface border-line-strong text-ink-1 focus:border-felt h-10 rounded-md border-2 px-3 text-[14px] outline-none"
                required
              >
                <option value="">選択</option>
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="素点">
              <NumField
                value={seat.rawScore}
                onChange={(e) => updateSeat(idx, { rawScore: e.target.value })}
                placeholder="25000"
                required
              />
            </Field>
            <Field label="チップ枚数">
              <NumField
                value={seat.chipCount}
                onChange={(e) => updateSeat(idx, { chipCount: e.target.value })}
                disabled={!withChip}
                placeholder={withChip ? '0' : '—'}
                className={withChip ? '' : 'opacity-50'}
              />
            </Field>
          </div>
        ))}
      </div>

      <div className="border-line border-t pt-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-ink-2 text-[13px] font-medium">合計素点</span>
          <span
            className={`num text-[16px] font-semibold tabular-nums ${
              totalScore === 100000 ? 'text-felt' : 'text-neg'
            }`}
          >
            {totalScore.toLocaleString()} / 100,000
          </span>
        </div>
        {preview && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {preview.map((p, idx) => {
              const member = members.find((m) => m.id === p.userId)
              return (
                <Stat
                  key={idx}
                  label={`${p.rank}着 / ${member?.name ?? ''}`}
                  value={p.finalScore > 0 ? `+${p.finalScore}` : `${p.finalScore}`}
                  unit="P"
                  tone={p.finalScore >= 0 ? 'pos' : 'neg'}
                />
              )
            })}
          </div>
        )}
      </div>

      {error && <p className="text-neg text-[12px]">{error}</p>}

      <Button kind="primary" size="lg" onClick={handleSubmit} disabled={!scoresValid || pending}>
        {pending ? '登録中...' : '半荘を登録'}
      </Button>
    </Card>
  )
}
