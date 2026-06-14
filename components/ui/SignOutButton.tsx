import { signOut } from '@/auth'

type Props = {
  variant?: 'default' | 'admin'
}

export function SignOutButton({ variant = 'default' }: Props) {
  return (
    <form
      action={async () => {
        'use server'
        await signOut({ redirectTo: '/login' })
      }}
    >
      <button
        type="submit"
        className={`rounded-md px-3 py-1.5 text-[12px] ${
          variant === 'admin' ? 'hover:bg-felt text-white/80' : 'text-ink-2 hover:bg-paper'
        }`}
      >
        ログアウト
      </button>
    </form>
  )
}
