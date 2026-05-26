import { createContext } from 'react'

export type PublicationContextValue = {
  isProductPublished: (productId: number) => boolean
  setProductPublished: (productId: number, published: boolean) => void
  toggleProductPublished: (productId: number) => void
}

export const PublicationContext = createContext<PublicationContextValue | null>(null)
