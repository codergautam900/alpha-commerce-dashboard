import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { AuthContext } from './authContext'
import { DEMO_PROFILES, type AuthSession, type UserRole } from '../types/auth'

const STORAGE_KEY = 'alpha-dashboard:auth-session'

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<AuthSession | null>(() => {
    if (typeof window === 'undefined') {
      return null
    }

    const storedValue = window.localStorage.getItem(STORAGE_KEY)

    if (!storedValue) {
      return null
    }

    try {
      return sanitizeAuthSession(JSON.parse(storedValue))
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (!session) {
      window.localStorage.removeItem(STORAGE_KEY)
      return
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  }, [session])

  const value = useMemo(
    () => ({
      isAuthenticated: session !== null,
      session,
      signInAsRole: (role: UserRole) => {
        const profile = DEMO_PROFILES[role]

        setSession({
          email: profile.email,
          displayName: profile.displayName,
          role: profile.role,
          title: profile.title,
        })
      },
      signOut: () => {
        setSession(null)
      },
    }),
    [session],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function sanitizeAuthSession(value: unknown): AuthSession | null {
  if (!value || typeof value !== 'object') {
    return null
  }

  const session = value as Partial<AuthSession>

  if (
    typeof session.email !== 'string' ||
    typeof session.displayName !== 'string' ||
    typeof session.title !== 'string' ||
    (session.role !== 'admin' && session.role !== 'user')
  ) {
    return null
  }

  return {
    email: session.email,
    displayName: session.displayName,
    role: session.role,
    title: session.title,
  }
}
