import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'
import { getRanking } from '@/lib/aggregate'

import { RankingChart } from './_components/RankingChart'

const PODIUM_TONE = ['gold', 'felt', 'neutral'] as const

export default async function RankingPage() {
  const ranking = await getRanking()

  if (ranking.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <h1 className="text-ink-1 text-xl font-bold">ランキング</h1>
        <Card className="text-ink-3 py-12 text-center text-[13px]">対戦記録がまだありません</Card>
      </div>
    )
  }

  const top3 = ranking.slice(0, 3)
  const rest = ranking.slice(3)

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-ink-1 text-xl font-bold">ランキング</h1>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {top3.map((r, i) => (
          <Card key={r.userId} padding="lg" className="flex flex-col items-center gap-2">
            <Chip tone={PODIUM_TONE[i]} className="px-3 py-1">
              {i + 1}位
            </Chip>
            <span className="text-ink-1 text-[16px] font-semibold">{r.name}</span>
            <span
              className={`num text-[28px] font-bold tabular-nums ${
                r.totalPoints >= 0 ? 'text-felt' : 'text-neg'
              }`}
            >
              {r.totalPoints > 0 ? `+${r.totalPoints}` : r.totalPoints}
            </span>
            <span className="text-ink-3 text-[11px]">
              {r.gamesPlayed}戦 / 平均 {r.averagePoints}P
            </span>
          </Card>
        ))}
      </div>

      <Card>
        <h2 className="text-ink-1 mb-3 text-[14px] font-semibold">累計ポイント比較</h2>
        <RankingChart rows={ranking} />
      </Card>

      {rest.length > 0 && (
        <Card>
          <h2 className="text-ink-1 mb-3 text-[14px] font-semibold">4位以下</h2>
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-line text-ink-3 border-b text-left">
                <th className="px-2 py-2 font-medium">順位</th>
                <th className="px-2 py-2 font-medium">部員</th>
                <th className="px-2 py-2 text-right font-medium">累計</th>
                <th className="px-2 py-2 text-right font-medium">試合</th>
                <th className="px-2 py-2 text-right font-medium">平均</th>
              </tr>
            </thead>
            <tbody>
              {rest.map((r, i) => (
                <tr key={r.userId} className="border-line border-b last:border-b-0">
                  <td className="text-ink-2 px-2 py-2">{i + 4}</td>
                  <td className="text-ink-1 px-2 py-2 font-medium">{r.name}</td>
                  <td
                    className={`num px-2 py-2 text-right tabular-nums ${
                      r.totalPoints >= 0 ? 'text-felt' : 'text-neg'
                    }`}
                  >
                    {r.totalPoints > 0 ? `+${r.totalPoints}` : r.totalPoints}
                  </td>
                  <td className="text-ink-2 num px-2 py-2 text-right tabular-nums">
                    {r.gamesPlayed}
                  </td>
                  <td
                    className={`num px-2 py-2 text-right tabular-nums ${
                      r.averagePoints >= 0 ? 'text-felt' : 'text-neg'
                    }`}
                  >
                    {r.averagePoints > 0 ? `+${r.averagePoints}` : r.averagePoints}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  )
}
