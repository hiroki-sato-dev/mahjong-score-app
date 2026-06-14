'use server'

import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/prisma'
import { requireExecutive } from '@/lib/session'

export async function deleteGame(gameId: string) {
  await requireExecutive()
  await prisma.$transaction([
    prisma.score.deleteMany({ where: { gameId } }),
    prisma.game.delete({ where: { id: gameId } }),
  ])
  revalidatePath('/admin/scores')
  revalidatePath('/members')
  revalidatePath('/results')
  revalidatePath('/ranking')
}
