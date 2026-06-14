import type { Rank, ScoreInput, ScoreResult } from '@/types'

const RETURN_SCORE = 30000
const RATE = 50 // 素点P 1 = 最終P 50
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

  // 順位を決定（同点は配列順で上位）
  const sorted = [...scores].sort((a, b) => b.rawScore - a.rawScore)
  const ranks = new Map<string, Rank>()
  sorted.forEach((s, i) => ranks.set(s.userId, (i + 1) as Rank))

  // 2,3,4位の素点P（千点単位 + ウマ）を先に計算
  const subScores = new Map<string, number>()
  scores.forEach((s) => {
    const rank = ranks.get(s.userId)!
    if (rank === 1) return
    const base = (s.rawScore - RETURN_SCORE) / 1000
    subScores.set(s.userId, base + UMA[rank])
  })

  // 1位の素点P = -(2位+3位+4位) で残差を吸収（オカ＋端数調整）
  const firstId = sorted[0].userId
  const others = [...subScores.values()].reduce((sum, v) => sum + v, 0)
  subScores.set(firstId, -others)

  return scores.map((s) => {
    const rank = ranks.get(s.userId)!
    const subScore = Math.round(subScores.get(s.userId)!)
    const chipP = withChip ? (s.chipCount ?? 0) * CHIP_POINT : 0
    return {
      userId: s.userId,
      rawScore: s.rawScore,
      rank,
      subScore,
      finalScore: subScore * RATE + chipP,
    }
  })
}
