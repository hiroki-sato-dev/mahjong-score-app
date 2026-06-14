'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Field } from '@/components/ui/Field'
import { Input } from '@/components/ui/Input'

import { addMember } from '../actions'

export function AddMemberForm() {
  const [error, setError] = useState<string | undefined>()
  const [pending, setPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setError(undefined)
    setPending(true)
    const result = await addMember(formData)
    if (result?.error) {
      setError(result.error)
      setPending(false)
    } else {
      setPending(false)
      ;(document.getElementById('add-member-form') as HTMLFormElement | null)?.reset()
    }
  }

  return (
    <form
      id="add-member-form"
      action={handleSubmit}
      className="grid grid-cols-1 gap-3 md:grid-cols-5"
    >
      <Field label="名前" required>
        <Input name="name" required />
      </Field>
      <Field label="メール" required>
        <Input name="email" type="email" required />
      </Field>
      <Field label="パスワード" required>
        <Input name="password" type="password" minLength={4} required />
      </Field>
      <Field label="ロール">
        <select
          name="role"
          defaultValue="MEMBER"
          className="border-line-strong h-10 rounded-md border px-3 text-[14px]"
        >
          <option value="MEMBER">部員</option>
          <option value="EXECUTIVE">幹部</option>
        </select>
      </Field>
      <div className="flex flex-col gap-1.5">
        <span className="text-ink-2 text-[12px] font-medium">&nbsp;</span>
        <Button type="submit" kind="primary" disabled={pending}>
          {pending ? '追加中...' : '追加'}
        </Button>
      </div>
      {error && <p className="text-neg col-span-full text-[12px]">{error}</p>}
    </form>
  )
}
