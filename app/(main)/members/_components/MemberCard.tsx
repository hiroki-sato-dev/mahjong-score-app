import { Card } from '@/components/ui/Card'
import type { MemberStat } from '@/types'

type Props = { member: MemberStat }

export function MemberCard({ member }: Props) {
  const initial = member.name[0] ?? '?'
  const isPos = member.totalPoints >= 0
  return (
    <Card padding="md" className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="bg-felt-soft text-felt flex h-10 w-10 items-center justify-center rounded-full text-[14px] font-bold">
          {initial}
        </div>
        <div className="flex flex-1 flex-col">
          <span className="text-ink-1 text-[14px] font-semibold">{member.name}</span>
          <span className="text-ink-3 text-[11px]">
            {member.lastPlayedAt
              ? `最終 ${member.lastPlayedAt.toLocaleDateString('ja-JP')}`
              : '対戦なし'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col gap-0.5">
          <span className="text-ink-3 text-[10px] font-medium">累計</span>
          <span
            className={`num text-[16px] font-semibold tabular-nums ${
              isPos ? 'text-felt' : 'text-neg'
            }`}
          >
            {member.totalPoints > 0 ? `+${member.totalPoints}` : member.totalPoints}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-ink-3 text-[10px] font-medium">試合</span>
          <span className="text-ink-1 num text-[16px] font-semibold tabular-nums">
            {member.gamesPlayed}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-ink-3 text-[10px] font-medium">平均</span>
          <span
            className={`num text-[16px] font-semibold tabular-nums ${
              member.averagePoints >= 0 ? 'text-felt' : 'text-neg'
            }`}
          >
            {member.averagePoints > 0 ? `+${member.averagePoints}` : member.averagePoints}
          </span>
        </div>
      </div>
    </Card>
  )
}
