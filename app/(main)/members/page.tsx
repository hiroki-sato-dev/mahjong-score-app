import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'
import { Stat } from '@/components/ui/Stat'
import { getMemberStats } from '@/lib/aggregate'

import { MemberCard } from './_components/MemberCard'

export default async function MembersPage() {
  const members = await getMemberStats()
  const totalGames = members.reduce((sum, m) => sum + m.gamesPlayed, 0) / 4

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-ink-1 text-xl font-bold">部員一覧</h1>
        <Chip tone="felt">{members.length} 名</Chip>
      </div>

      <Card>
        <Stat label="累計対戦数" value={Math.round(totalGames)} unit="半荘" />
      </Card>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {members.map((m) => (
          <MemberCard key={m.userId} member={m} />
        ))}
      </div>
    </div>
  )
}
