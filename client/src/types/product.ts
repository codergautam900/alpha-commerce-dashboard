export type Product = {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  availabilityStatus?: string
  brand?: string
  sku?: string
  minimumOrderQuantity?: number
  shippingInformation?: string
  warrantyInformation?: string
  tags?: string[]
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

export type ProductCategory = {
  slug: string
  name: string
  url: string
}

export type ProductSortValue =
  | 'title-asc'
  | 'title-desc'
  | 'price-asc'
  | 'price-desc'
  | 'rating-asc'
  | 'rating-desc'

export type ProductColumnId =
  | 'product'
  | 'category'
  | 'price'
  | 'stock'
  | 'rating'

export type ProductSavedView = {
  id: string
  name: string
  queryString: string
  createdAt: number
}
