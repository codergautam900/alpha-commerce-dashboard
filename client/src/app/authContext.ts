import { createContext } from 'react'
import type { AuthSession, UserRole } from '../types/auth'

export type AuthContextValue = {
  isAuthenticated: boolean
  session: AuthSession | null
  signInAsRole: (role: UserRole) => void
  signOut: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
