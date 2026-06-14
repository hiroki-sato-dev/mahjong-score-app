import { auth } from '@/auth'

export async function requireUser() {
  const session = await auth()
  if (!session?.user) {
    throw new Error('UNAUTHORIZED')
  }
  return session.user
}

export async function requireExecutive() {
  const user = await requireUser()
  if (user.role !== 'EXECUTIVE') {
    throw new Error('FORBIDDEN')
  }
  return user
}
