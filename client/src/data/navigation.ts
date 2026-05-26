import { LayoutDashboard, PackageSearch, type LucideIcon } from 'lucide-react'
import type { UserRole } from '../types/auth'

export type NavigationItem = {
  label: string
  to: string
  icon: LucideIcon
}

const allNavigationItems: NavigationItem[] = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Products',
    to: '/products',
    icon: PackageSearch,
  },
]

export function getNavigationItems(role: UserRole) {
  if (role === 'admin') {
    return allNavigationItems
  }

  return allNavigationItems.filter((item) => item.to !== '/dashboard')
}
