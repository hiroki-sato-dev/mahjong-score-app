import { NextResponse } from 'next/server'

import { auth } from '@/auth'

const PUBLIC_PATHS = ['/login']
const ADMIN_PREFIX = '/admin'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isAuthed = !!req.auth
  const role = req.auth?.user?.role

  if (PUBLIC_PATHS.includes(pathname)) {
    if (isAuthed) {
      return NextResponse.redirect(new URL('/members', req.url))
    }
    return NextResponse.next()
  }

  if (!isAuthed) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (pathname.startsWith(ADMIN_PREFIX) && role !== 'EXECUTIVE') {
    return NextResponse.redirect(new URL('/members', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
