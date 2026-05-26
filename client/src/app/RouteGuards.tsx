import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './useAuth'
import { getHomeRouteForRole, type UserRole } from '../types/auth'

type GuardProps = {
  children: ReactNode
}

type RoleGuardProps = GuardProps & {
  role: UserRole
}

export function RequireAuth({ children }: GuardProps) {
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <>{children}</>
}

export function RequireRole({ children, role }: RoleGuardProps) {
  const { session } = useAuth()

  if (!session) {
    return <Navigate to="/login" replace />
  }

  if (session.role !== role) {
    return <Navigate to={getHomeRouteForRole(session.role)} replace />
  }

  return <>{children}</>
}
