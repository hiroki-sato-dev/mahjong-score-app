'use client'

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="bg-paper flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-ink-1 text-4xl font-bold">500</h1>
      <p className="text-ink-2 text-[14px]">エラーが発生しました</p>
      <button
        type="button"
        onClick={reset}
        className="bg-felt rounded-md px-4 py-2 text-[13px] font-medium text-white"
      >
        再試行
      </button>
    </div>
  )
}
