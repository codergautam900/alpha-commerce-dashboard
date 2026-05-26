export type UserRole = 'admin' | 'user'

export type AuthSession = {
  email: string
  displayName: string
  role: UserRole
  title: string
}

export type DemoProfile = AuthSession & {
  password: string
}

export const DEMO_PROFILES: Record<UserRole, DemoProfile> = {
  admin: {
    email: 'admin@alpha.test',
    displayName: 'Avery Stone',
    password: 'alpha-admin',
    role: 'admin',
    title: 'Platform Admin',
  },
  user: {
    email: 'user@alpha.test',
    displayName: 'Maya Chen',
    password: 'alpha-user',
    role: 'user',
    title: 'Catalog Reviewer',
  },
}

export function getHomeRouteForRole(role: UserRole) {
  return role === 'admin' ? '/dashboard' : '/products'
}
