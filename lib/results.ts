import { prisma } from '@/lib/prisma'

export type DailyGame = {
  gameId: string
  playedAt: Date
  withChip: boolean
  scores: {
    userId: string
    userName: string
    rank: number
    rawScore: number
    subScore: number
    finalScore: number
  }[]
}

export type TotalRow = {
  userId: string
  name: string
  totalSubScore: number
  totalPoints: number
  gamesPlayed: number
  averageSubScore: number
  averagePoints: number
  firstRate: number
  bestScore: number
  worstScore: number
  pointsTimeline: { gameIdx: number; total: number; playedAt: Date }[]
  rankDistribution: { rank: number; count: number }[]
}

export async function getDailyGames(date?: string): Promise<DailyGame[]> {
  const where = date
    ? {
        playedAt: {
          gte: new Date(`${date}T00:00:00`),
          lt: new Date(`${date}T23:59:59.999`),
        },
      }
    : {}

  const games = await prisma.game.findMany({
    where,
    orderBy: { playedAt: 'desc' },
    include: {
      scores: {
        include: { user: { select: { name: true } } },
        orderBy: { rank: 'asc' },
      },
    },
    take: 50,
  })

  return games.map((g) => ({
    gameId: g.id,
    playedAt: g.playedAt,
    withChip: g.withChip,
    scores: g.scores.map((s) => ({
      userId: s.userId,
      userName: s.user.name ?? '名無し',
      rank: s.rank,
      rawScore: s.rawScore,
      subScore: s.subScore,
      finalScore: s.finalScore,
    })),
  }))
}

export async function getTotalStats(): Promise<TotalRow[]> {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      scores: {
        select: {
          subScore: true,
          finalScore: true,
          rank: true,
          game: { select: { playedAt: true } },
        },
        orderBy: { game: { playedAt: 'asc' } },
      },
    },
  })

  return users
    .filter((u) => u.scores.length > 0)
    .map((u) => {
      let running = 0
      const timeline = u.scores.map((s, i) => {
        running += s.finalScore
        return { gameIdx: i + 1, total: running, playedAt: s.game.playedAt }
      })
      const total = running
      const totalSub = u.scores.reduce((sum, s) => sum + s.subScore, 0)
      const games = u.scores.length
      const firsts = u.scores.filter((s) => s.rank === 1).length
      const scores = u.scores.map((s) => s.finalScore)
      const dist = [1, 2, 3, 4].map((rank) => ({
        rank,
        count: u.scores.filter((s) => s.rank === rank).length,
      }))

      return {
        userId: u.id,
        name: u.name ?? '名無し',
        totalSubScore: totalSub,
        totalPoints: total,
        gamesPlayed: games,
        averageSubScore: Math.round((totalSub / games) * 10) / 10,
        averagePoints: Math.round((total / games) * 10) / 10,
        firstRate: Math.round((firsts / games) * 1000) / 10,
        bestScore: Math.max(...scores),
        worstScore: Math.min(...scores),
        pointsTimeline: timeline,
        rankDistribution: dist,
      }
    })
    .sort((a, b) => b.totalPoints - a.totalPoints)
}
