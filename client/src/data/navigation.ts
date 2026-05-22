import { LayoutDashboard, PackageSearch, type LucideIcon } from 'lucide-react'

export type NavigationItem = {
  label: string
  to: string
  icon: LucideIcon
  badge?: string
}

export const navigationItems: NavigationItem[] = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Products',
    to: '/products',
    icon: PackageSearch,
    badge: '24',
  },
]
