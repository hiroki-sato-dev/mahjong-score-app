import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('password', 10)

  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'exec@example.com' },
      update: {},
      create: { email: 'exec@example.com', name: '幹部A', password, role: Role.EXECUTIVE },
    }),
    prisma.user.upsert({
      where: { email: 'member1@example.com' },
      update: {},
      create: { email: 'member1@example.com', name: '部員B', password, role: Role.MEMBER },
    }),
    prisma.user.upsert({
      where: { email: 'member2@example.com' },
      update: {},
      create: { email: 'member2@example.com', name: '部員C', password, role: Role.MEMBER },
    }),
    prisma.user.upsert({
      where: { email: 'member3@example.com' },
      update: {},
      create: { email: 'member3@example.com', name: '部員D', password, role: Role.MEMBER },
    }),
    prisma.user.upsert({
      where: { email: 'member4@example.com' },
      update: {},
      create: { email: 'member4@example.com', name: '部員E', password, role: Role.MEMBER },
    }),
  ])

  console.warn(
    'Seeded users:',
    users.map((u) => u.email),
  )
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
