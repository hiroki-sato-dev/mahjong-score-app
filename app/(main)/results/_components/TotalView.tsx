'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Card } from '@/components/ui/Card'
import { Stat } from '@/components/ui/Stat'
import { formatSignedP } from '@/lib/format'
import type { TotalRow } from '@/lib/results'

type Props = {
  rows: TotalRow[]
}

const COLORS = ['#0e5a3c', '#a8893a', '#c8312b', '#52524d', '#9a978f']
const RANK_COLORS = ['#a8893a', '#0e5a3c', '#9a978f', '#c8312b']

export function TotalView({ rows }: Props) {
  if (rows.length === 0) {
    return <Card className="text-ink-3 py-12 text-center text-[13px]">対戦記録がありません</Card>
  }

  const maxLen = Math.max(...rows.map((r) => r.pointsTimeline.length))
  const timelineData = Array.from({ length: maxLen }, (_, i) => {
    const point: Record<string, number | string> = { gameIdx: i + 1 }
    rows.forEach((r) => {
      const t = r.pointsTimeline[i]
      if (t) point[r.name] = t.total
    })
    return point
  })

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <h2 className="text-ink-1 mb-3 text-[14px] font-semibold">累計ポイント推移</h2>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={timelineData}>
            <CartesianGrid stroke="#e8e5dc" strokeDasharray="3 3" />
            <XAxis dataKey="gameIdx" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            {rows.map((r, i) => (
              <Line
                key={r.userId}
                type="monotone"
                dataKey={r.name}
                stroke={COLORS[i % COLORS.length]}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {rows.map((r) => (
          <Card key={r.userId} padding="md">
            <h3 className="text-ink-1 mb-3 text-[14px] font-semibold">{r.name}</h3>
            <div className="mb-3 grid grid-cols-2 gap-2">
              <Stat
                label="累計 素点P"
                value={formatSignedP(r.totalSubScore, '')}
                tone={r.totalSubScore >= 0 ? 'pos' : 'neg'}
              />
              <Stat
                label="累計 P"
                value={formatSignedP(r.totalPoints, '')}
                tone={r.totalPoints >= 0 ? 'pos' : 'neg'}
              />
              <Stat label="試合数" value={r.gamesPlayed} unit="戦" />
              <Stat label="1位率" value={r.firstRate} unit="%" />
              <Stat
                label="平均 素点P"
                value={formatSignedP(r.averageSubScore, '')}
                tone={r.averageSubScore >= 0 ? 'pos' : 'neg'}
              />
              <Stat
                label="平均 P"
                value={formatSignedP(r.averagePoints, '')}
                tone={r.averagePoints >= 0 ? 'pos' : 'neg'}
              />
            </div>
            <div className="text-ink-3 mb-2 text-[11px] font-medium">順位分布</div>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={r.rankDistribution}>
                <XAxis dataKey="rank" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="count">
                  {r.rankDistribution.map((d) => (
                    <Cell key={d.rank} fill={RANK_COLORS[d.rank - 1]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        ))}
      </div>
    </div>
  )
}
