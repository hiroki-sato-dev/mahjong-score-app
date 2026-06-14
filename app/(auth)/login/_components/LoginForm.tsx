'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Field } from '@/components/ui/Field'
import { Input } from '@/components/ui/Input'

import { loginAction } from '../actions'

type Props = {
  callbackUrl?: string
  initialError?: string
}

export function LoginForm({ callbackUrl, initialError }: Props) {
  const [error, setError] = useState<string | undefined>(initialError)
  const [pending, setPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setPending(true)
    setError(undefined)
    const result = await loginAction(formData, callbackUrl)
    if (result?.error) {
      setError(result.error)
      setPending(false)
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <Field label="メールアドレス" required>
        <Input name="email" type="email" autoComplete="email" required />
      </Field>
      <Field label="パスワード" required error={error}>
        <Input name="password" type="password" autoComplete="current-password" required />
      </Field>
      <Button kind="primary" size="lg" type="submit" disabled={pending}>
        {pending ? 'ログイン中...' : 'ログイン'}
      </Button>
    </form>
  )
}
