/* eslint-disable @typescript-eslint/consistent-type-definitions */
// 注: module augmentation は declaration merging が必要なため interface 必須
import type { DefaultSession } from 'next-auth'

import type { Role } from '@/types'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: Role
    } & DefaultSession['user']
  }

  interface User {
    role: Role
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: Role
  }
}
