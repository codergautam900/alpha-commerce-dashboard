import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Product } from '../types/product'
import { ComparisonContext } from './comparisonContext'

type ComparisonProviderProps = {
  children: ReactNode
}

export function ComparisonProvider({ children }: ComparisonProviderProps) {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])

  const toggleProduct = useCallback((product: Product) => {
    setSelectedProducts((currentProducts) => {
      const isAlreadySelected = currentProducts.some(
        (currentProduct) => currentProduct.id === product.id,
      )

      if (isAlreadySelected) {
        return currentProducts.filter(
          (currentProduct) => currentProduct.id !== product.id,
        )
      }

      if (currentProducts.length >= 3) {
        return [...currentProducts.slice(1), product]
      }

      return [...currentProducts, product]
    })
  }, [])

  const clearComparison = useCallback(() => {
    setSelectedProducts([])
  }, [])

  const value = useMemo(
    () => ({
      clearComparison,
      selectedProducts,
      toggleProduct,
    }),
    [clearComparison, selectedProducts, toggleProduct],
  )

  return (
    <ComparisonContext.Provider value={value}>{children}</ComparisonContext.Provider>
  )
}
