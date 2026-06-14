'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Tabs } from '@/components/ui/Tabs'
import type { DailyGame, TotalRow } from '@/lib/results'

import { DailyView } from './DailyView'
import { TotalView } from './TotalView'

type Props = {
  tab: 'daily' | 'total'
  date?: string
  daily: DailyGame[]
  total: TotalRow[]
}

export function ResultsTabs({ tab, date, daily, total }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function changeTab(value: 'daily' | 'total') {
    const next = new URLSearchParams(searchParams)
    next.set('tab', value)
    router.push(`/results?${next.toString()}`)
  }

  return (
    <div className="flex flex-col gap-4">
      <Tabs
        items={[
          { value: 'daily', label: '日別' },
          { value: 'total', label: '累計' },
        ]}
        value={tab}
        onChange={changeTab}
      />
      {tab === 'daily' ? <DailyView games={daily} date={date} /> : <TotalView rows={total} />}
    </div>
  )
}
