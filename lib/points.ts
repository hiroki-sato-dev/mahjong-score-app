import type { Rank, ScoreInput, ScoreResult } from '@/types'

const RETURN_SCORE = 30000
const RATE_PER_1000 = 50
const CHIP_POINT = 100
const UMA: Record<Rank, number> = {
  1: 20,
  2: 10,
  3: -10,
  4: -20,
}

export function calcPoints(scores: ScoreInput[], withChip: boolean): ScoreResult[] {
  if (scores.length !== 4) {
    throw new Error('スコアは4人分必要です')
  }

  const sorted = [...scores].sort((a, b) => b.rawScore - a.rawScore)
  const ranks = new Map<string, Rank>()
  sorted.forEach((s, i) => ranks.set(s.userId, (i + 1) as Rank))

  return scores.map((s) => {
    const rank = ranks.get(s.userId)!
    const baseP = Math.round(((s.rawScore - RETURN_SCORE) * RATE_PER_1000) / 1000)
    const umaP = UMA[rank]
    const chipP = withChip ? (s.chipCount ?? 0) * CHIP_POINT : 0
    return {
      userId: s.userId,
      rawScore: s.rawScore,
      rank,
      finalScore: baseP + umaP + chipP,
    }
  })
}
