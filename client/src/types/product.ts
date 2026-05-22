export type Product = {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand?: string
  sku?: string
  thumbnail: string
  images: string[]
}

export type ProductListResponse = {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export type ProductListParams = {
  limit?: number
  skip?: number
  search?: string
  sortBy?: 'title' | 'price' | 'rating'
  order?: 'asc' | 'desc'
  category?: string
}
