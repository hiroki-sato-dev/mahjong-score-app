'use server'

import bcrypt from 'bcryptjs'
import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/prisma'
import { requireExecutive } from '@/lib/session'
import type { Role } from '@/types'

export async function addMember(formData: FormData) {
  await requireExecutive()
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const role = (formData.get('role') === 'EXECUTIVE' ? 'EXECUTIVE' : 'MEMBER') as Role

  if (!name) return { error: '名前を入力してください' }
  if (!email) return { error: 'メールアドレスを入力してください' }
  if (password.length < 4) return { error: 'パスワードは4文字以上必要です' }

  const exists = await prisma.user.findUnique({ where: { email } })
  if (exists) return { error: 'このメールアドレスは既に登録されています' }

  await prisma.user.create({
    data: { name, email, password: await bcrypt.hash(password, 10), role },
  })
  revalidatePath('/admin/members')
  revalidatePath('/members')
  return undefined
}

export async function updateMemberRole(userId: string, role: Role) {
  await requireExecutive()
  await prisma.user.update({ where: { id: userId }, data: { role } })
  revalidatePath('/admin/members')
}

export async function deleteMember(userId: string) {
  const me = await requireExecutive()
  if (me.id === userId) return { error: '自分自身は削除できません' }

  const scoresCount = await prisma.score.count({ where: { userId } })
  if (scoresCount > 0) {
    return { error: '対戦記録がある部員は削除できません' }
  }
  await prisma.user.delete({ where: { id: userId } })
  revalidatePath('/admin/members')
  revalidatePath('/members')
  return undefined
}
