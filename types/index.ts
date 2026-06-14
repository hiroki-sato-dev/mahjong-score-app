export type Rank = 1 | 2 | 3 | 4

export type Role = 'MEMBER' | 'EXECUTIVE'

export type Member = {
  id: string
  name: string
  email: string | null
  role: Role
}

export type ScoreInput = {
  userId: string
  rawScore: number
  chipCount?: number
}

export type ScoreResult = {
  userId: string
  rawScore: number
  rank: Rank
  finalScore: number
}

export type GameInput = {
  date: Date
  withChip: boolean
  scores: ScoreInput[]
}

export type RankingRow = {
  userId: string
  name: string
  totalPoints: number
  gamesPlayed: number
  averagePoints: number
}

export type MemberStat = {
  userId: string
  name: string
  totalPoints: number
  gamesPlayed: number
  averagePoints: number
  lastPlayedAt: Date | null
  recentScores: number[]
}
