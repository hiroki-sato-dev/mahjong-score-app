import { getDailyGames, getTotalStats } from '@/lib/results'

import { ResultsTabs } from './_components/ResultsTabs'

type Props = {
  searchParams: Promise<{ tab?: string; date?: string }>
}

export default async function ResultsPage({ searchParams }: Props) {
  const params = await searchParams
  const tab = params.tab === 'total' ? 'total' : 'daily'
  const date = params.date

  const [daily, total] = await Promise.all([
    tab === 'daily' ? getDailyGames(date) : Promise.resolve([]),
    tab === 'total' ? getTotalStats() : Promise.resolve([]),
  ])

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-ink-1 text-xl font-bold">成績</h1>
      <ResultsTabs tab={tab} date={date} daily={daily} total={total} />
    </div>
  )
}
