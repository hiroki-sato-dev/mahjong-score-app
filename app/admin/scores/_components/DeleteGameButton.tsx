'use client'

import { useTransition } from 'react'

import { deleteGame } from '../actions'

type Props = {
  gameId: string
}

export function DeleteGameButton({ gameId }: Props) {
  const [pending, startTransition] = useTransition()

  function handleDelete() {
    if (!confirm('この半荘記録を削除しますか？')) return
    startTransition(async () => {
      await deleteGame(gameId)
    })
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={pending}
      className="text-neg hover:bg-neg-soft rounded-md px-2 py-1 text-[12px] disabled:opacity-50"
    >
      削除
    </button>
  )
}
