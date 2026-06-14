type Member = {
  id: string
  name: string
  gamesPlayed: number
  totalScore: number
}

type MemberCardProps = {
  member: Member
}

export function MemberCard({ member }: MemberCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg bg-white p-4 shadow">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
        {member.name[0]}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-gray-900">{member.name}</p>
        <p className="text-xs text-gray-500">
          {member.gamesPlayed}戦 / 合計 {member.totalScore}pt
        </p>
      </div>
    </div>
  )
}
