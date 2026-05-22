type RankingEntry = {
  rank: number
  name: string
  score: number
  gamesPlayed: number
}

type RankingTableProps = {
  entries: RankingEntry[]
}

export function RankingTable({ entries }: RankingTableProps) {
  return (
    <table className="w-full border-collapse bg-white rounded-lg shadow overflow-hidden">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">順位</th>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">名前</th>
          <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">スコア</th>
          <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">対局数</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => (
          <tr key={entry.rank} className="border-t hover:bg-gray-50">
            <td className="px-4 py-3 text-sm font-medium">{entry.rank}</td>
            <td className="px-4 py-3 text-sm">{entry.name}</td>
            <td className="px-4 py-3 text-sm text-right">{entry.score}</td>
            <td className="px-4 py-3 text-sm text-right">{entry.gamesPlayed}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
