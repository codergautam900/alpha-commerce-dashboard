export type LiveUpdateKind = 'stock' | 'rating' | 'price'

export type LiveUpdateEvent = {
  id: string
  kind: LiveUpdateKind
  message: string
  occurredAt: number
  productId: number
  productTitle: string
}
