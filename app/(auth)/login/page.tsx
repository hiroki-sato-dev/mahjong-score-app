import { LoginForm } from './_components/LoginForm'

type Props = {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>
}

export default async function LoginPage({ searchParams }: Props) {
  const { callbackUrl, error } = await searchParams
  return (
    <div className="bg-surface shadow-card border-line w-full max-w-sm rounded-lg border p-8">
      <h1 className="text-ink-1 mb-6 text-center text-xl font-bold">麻雀部スコア管理</h1>
      <LoginForm callbackUrl={callbackUrl} initialError={error} />
      <p className="text-ink-3 mt-6 text-center text-[11px]">
        シードユーザー: exec@example.com / member1@example.com 等
        <br />
        パスワード: password
      </p>
    </div>
  )
}
