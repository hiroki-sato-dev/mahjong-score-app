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
    <div className="p-4 bg-white rounded-lg shadow flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
        {member.name[0]}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-gray-900">{member.name}</p>
        <p className="text-xs text-gray-500">{member.gamesPlayed}戦 / 合計 {member.totalScore}pt</p>
      </div>
    </div>
  )
}
