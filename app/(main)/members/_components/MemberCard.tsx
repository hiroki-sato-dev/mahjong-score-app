import { Card } from '@/components/ui/Card'
import { formatSignedP } from '@/lib/format'
import type { MemberStat } from '@/types'

type Props = { member: MemberStat }

export function MemberCard({ member }: Props) {
  const initial = member.name[0] ?? '?'
  const subTone =
    member.totalSubScore > 0 ? 'text-felt' : member.totalSubScore < 0 ? 'text-neg' : 'text-ink-2'
  const ptTone =
    member.totalPoints > 0 ? 'text-felt' : member.totalPoints < 0 ? 'text-neg' : 'text-ink-2'

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

      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-0.5">
          <span className="text-ink-3 text-[10px] font-medium">累計 素点P</span>
          <span className={`num text-[18px] font-semibold tabular-nums ${subTone}`}>
            {formatSignedP(member.totalSubScore, '')}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-ink-3 text-[10px] font-medium">累計 P</span>
          <span className={`num text-[18px] font-semibold tabular-nums ${ptTone}`}>
            {formatSignedP(member.totalPoints, '')}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-ink-3 text-[10px] font-medium">試合</span>
          <span className="text-ink-1 num text-[14px] font-semibold tabular-nums">
            {member.gamesPlayed}戦
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-ink-3 text-[10px] font-medium">平均 素点P / P</span>
          <span className="num text-ink-1 text-[12px] tabular-nums">
            <span className={member.averageSubScore >= 0 ? 'text-felt' : 'text-neg'}>
              {formatSignedP(member.averageSubScore, '')}
            </span>
            <span className="text-ink-3 mx-1">/</span>
            <span className={member.averagePoints >= 0 ? 'text-felt' : 'text-neg'}>
              {formatSignedP(member.averagePoints, '')}
            </span>
          </span>
        </div>
      </div>
    </Card>
  )
}
