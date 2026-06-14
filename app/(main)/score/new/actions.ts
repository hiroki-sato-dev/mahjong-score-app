'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { calcPoints } from '@/lib/points'
import { prisma } from '@/lib/prisma'
import { requireUser } from '@/lib/session'
import type { ScoreInput } from '@/types'

type SaveScoreInput = {
  date: string
  withChip: boolean
  scores: ScoreInput[]
}

export async function saveScore(input: SaveScoreInput) {
  await requireUser()

  if (input.scores.length !== 4) {
    return { error: '4人分のスコアが必要です' }
  }
  const totalRaw = input.scores.reduce((sum, s) => sum + s.rawScore, 0)
  if (totalRaw !== 100000) {
    return { error: `合計素点が100,000になっていません（現在: ${totalRaw}）` }
  }
  const uniqueIds = new Set(input.scores.map((s) => s.userId))
  if (uniqueIds.size !== 4) {
    return { error: '同じ部員が複数選択されています' }
  }

  let results
  try {
    results = calcPoints(input.scores, input.withChip)
  } catch (e) {
    return { error: e instanceof Error ? e.message : '計算エラー' }
  }

  await prisma.game.create({
    data: {
      playedAt: new Date(input.date),
      withChip: input.withChip,
      scores: {
        create: results.map((r) => {
          const inputScore = input.scores.find((s) => s.userId === r.userId)
          return {
            userId: r.userId,
            rawScore: r.rawScore,
            finalScore: r.finalScore,
            rank: r.rank,
            chipCount: input.withChip ? (inputScore?.chipCount ?? 0) : 0,
          }
        }),
      },
    },
  })

  revalidatePath('/members')
  revalidatePath('/results')
  revalidatePath('/ranking')
  redirect('/results')
}
