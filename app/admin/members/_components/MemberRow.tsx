'use client'

import { useTransition } from 'react'

import { Chip } from '@/components/ui/Chip'
import type { Role } from '@/types'

import { deleteMember, updateMemberRole } from '../actions'

type Props = {
  member: {
    id: string
    name: string
    email: string | null
    role: Role
    gamesPlayed: number
  }
}

export function MemberRow({ member }: Props) {
  const [pending, startTransition] = useTransition()

  function handleRoleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as Role
    startTransition(async () => {
      await updateMemberRole(member.id, next)
    })
  }

  function handleDelete() {
    if (!confirm(`${member.name} を削除しますか？`)) return
    startTransition(async () => {
      const result = await deleteMember(member.id)
      if (result?.error) alert(result.error)
    })
  }

  return (
    <tr className="border-line border-b last:border-b-0">
      <td className="text-ink-1 px-2 py-2 font-medium">{member.name}</td>
      <td className="text-ink-2 px-2 py-2 text-[12px]">{member.email}</td>
      <td className="px-2 py-2">
        <select
          value={member.role}
          onChange={handleRoleChange}
          disabled={pending}
          className="border-line h-8 rounded-md border px-2 text-[12px]"
        >
          <option value="MEMBER">部員</option>
          <option value="EXECUTIVE">幹部</option>
        </select>
      </td>
      <td className="text-ink-2 num px-2 py-2 text-right tabular-nums">
        {member.gamesPlayed > 0 ? (
          <Chip>{member.gamesPlayed}戦</Chip>
        ) : (
          <span className="text-ink-3">—</span>
        )}
      </td>
      <td className="px-2 py-2 text-right">
        <button
          type="button"
          onClick={handleDelete}
          disabled={pending || member.gamesPlayed > 0}
          className="text-neg hover:bg-neg-soft rounded-md px-2 py-1 text-[12px] disabled:cursor-not-allowed disabled:opacity-30"
          title={member.gamesPlayed > 0 ? '対戦記録がある部員は削除できません' : ''}
        >
          削除
        </button>
      </td>
    </tr>
  )
}
