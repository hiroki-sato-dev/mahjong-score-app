'use client'

import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import type { RankingRow } from '@/types'

type Props = {
  rows: RankingRow[]
}

export function RankingChart({ rows }: Props) {
  const data = rows.map((r) => ({ name: r.name, points: r.totalPoints }))
  return (
    <ResponsiveContainer width="100%" height={Math.max(160, data.length * 36)}>
      <BarChart data={data} layout="vertical" margin={{ left: 16, right: 16 }}>
        <XAxis type="number" tick={{ fontSize: 11 }} />
        <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 12 }} />
        <Tooltip />
        <Bar dataKey="points">
          {data.map((d) => (
            <Cell key={d.name} fill={d.points >= 0 ? '#0e5a3c' : '#c8312b'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
