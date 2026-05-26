import { createContext } from 'react'
import type { Product } from '../types/product'

export type ComparisonContextValue = {
  clearComparison: () => void
  selectedProducts: Product[]
  toggleProduct: (product: Product) => void
}

export const ComparisonContext = createContext<ComparisonContextValue | undefined>(
  undefined,
)
