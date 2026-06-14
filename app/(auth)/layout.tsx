export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-paper flex min-h-screen items-center justify-center px-4">{children}</div>
  )
}
