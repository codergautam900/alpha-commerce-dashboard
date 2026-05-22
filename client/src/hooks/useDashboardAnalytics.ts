import { useMemo } from 'react'
import { useProductsCatalog } from './useProductsCatalog'
import { buildDashboardAnalytics } from '../utils/analytics'

export function useDashboardAnalytics() {
  const catalog = useProductsCatalog()

  const analytics = useMemo(
    () => buildDashboardAnalytics(catalog.products, catalog.categories),
    [catalog.categories, catalog.products],
  )

  return {
    ...catalog,
    analytics,
  }
}
