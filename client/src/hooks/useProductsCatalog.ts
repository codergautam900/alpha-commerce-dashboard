import { useQuery } from '@tanstack/react-query'
import {
  fetchAllProducts,
  fetchCategories,
  productQueryKeys,
} from '../services/products'

const AUTO_REFRESH_INTERVAL_MS = 60_000

export function useProductsCatalog() {
  const productsQuery = useQuery({
    queryKey: productQueryKeys.catalog,
    queryFn: fetchAllProducts,
    // Polling gives the dashboard a lightweight real-time feel for the bonus requirement.
    refetchInterval: AUTO_REFRESH_INTERVAL_MS,
    refetchIntervalInBackground: true,
  })

  const categoriesQuery = useQuery({
    queryKey: productQueryKeys.categories,
    queryFn: fetchCategories,
  })

  return {
    categories: categoriesQuery.data ?? [],
    error: productsQuery.error ?? categoriesQuery.error,
    isError: productsQuery.isError || categoriesQuery.isError,
    isLoading: productsQuery.isLoading || categoriesQuery.isLoading,
    isRefreshing: productsQuery.isRefetching,
    lastUpdatedAt: productsQuery.dataUpdatedAt,
    products: productsQuery.data?.products ?? [],
    refetchAll: () => {
      void productsQuery.refetch()
      void categoriesQuery.refetch()
    },
    totalProducts: productsQuery.data?.total ?? 0,
  }
}
