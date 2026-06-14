import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="bg-paper flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-ink-1 text-4xl font-bold">404</h1>
      <p className="text-ink-2 text-[14px]">ページが見つかりません</p>
      <Link
        href="/members"
        className="bg-felt rounded-md px-4 py-2 text-[13px] font-medium text-white"
      >
        ホームへ戻る
      </Link>
    </div>
  )
}
