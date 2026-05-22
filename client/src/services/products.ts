import { http } from './http'
import type {
  Product,
  ProductListParams,
  ProductListResponse,
} from '../types/product'

export const productQueryKeys = {
  all: ['products'] as const,
  detail: (productId: number | string) => ['products', productId] as const,
}

export async function fetchProducts(
  params: ProductListParams = {},
): Promise<ProductListResponse> {
  const { search, ...rest } = params
  const endpoint = search ? '/products/search' : '/products'

  const { data } = await http.get<ProductListResponse>(endpoint, {
    params: {
      q: search,
      ...rest,
    },
  })

  return data
}

export async function fetchProductById(productId: number | string) {
  const { data } = await http.get<Product>(`/products/${productId}`)
  return data
}

export async function fetchCategories() {
  const { data } = await http.get<string[]>('/products/category-list')
  return data
}
