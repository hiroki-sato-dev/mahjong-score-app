import { prisma } from '@/lib/prisma'
import type { MemberStat, RankingRow } from '@/types'

export async function getMemberStats(): Promise<MemberStat[]> {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      scores: {
        select: { finalScore: true, game: { select: { playedAt: true } } },
        orderBy: { game: { playedAt: 'desc' } },
      },
    },
    orderBy: { name: 'asc' },
  })

  return users.map((u) => {
    const total = u.scores.reduce((sum, s) => sum + s.finalScore, 0)
    const games = u.scores.length
    return {
      userId: u.id,
      name: u.name ?? '名無し',
      totalPoints: total,
      gamesPlayed: games,
      averagePoints: games === 0 ? 0 : Math.round((total / games) * 10) / 10,
      lastPlayedAt: u.scores[0]?.game.playedAt ?? null,
      recentScores: u.scores
        .slice(0, 10)
        .map((s) => s.finalScore)
        .reverse(),
    }
  })
}

export async function getRanking(): Promise<RankingRow[]> {
  const stats = await getMemberStats()
  return stats
    .filter((s) => s.gamesPlayed > 0)
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .map((s) => ({
      userId: s.userId,
      name: s.name,
      totalPoints: s.totalPoints,
      gamesPlayed: s.gamesPlayed,
      averagePoints: s.averagePoints,
    }))
}
