'use server'

import { AuthError } from 'next-auth'

import { signIn } from '@/auth'

export async function loginAction(formData: FormData, callbackUrl?: string) {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirectTo: callbackUrl ?? '/members',
    })
    return undefined
  } catch (e) {
    if (e instanceof AuthError) {
      return { error: 'メールアドレスかパスワードが間違っています' }
    }
    throw e
  }
}
