import { useQuery } from '@tanstack/react-query'
import {
  fetchAllProducts,
  fetchCategories,
  productQueryKeys,
} from '../services/products'

export function useProductsCatalog() {
  const productsQuery = useQuery({
    queryKey: productQueryKeys.catalog,
    queryFn: fetchAllProducts,
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
    products: productsQuery.data?.products ?? [],
    refetchAll: () => {
      void productsQuery.refetch()
      void categoriesQuery.refetch()
    },
    totalProducts: productsQuery.data?.total ?? 0,
  }
}
