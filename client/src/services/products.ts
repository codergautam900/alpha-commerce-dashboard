import { http } from './http'
import type {
  Product,
  ProductCategory,
  ProductListParams,
  ProductListResponse,
} from '../types/product'

export const productQueryKeys = {
  all: ['products'] as const,
  catalog: ['products', 'catalog'] as const,
  categories: ['products', 'categories'] as const,
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

export async function fetchAllProducts(): Promise<ProductListResponse> {
  // We fetch the full catalog once because the assignment needs
  // multi-category filtering, sorting, and pagination to work together.
  const { data } = await http.get<ProductListResponse>('/products', {
    params: {
      limit: 0,
    },
  })

  return data
}

export async function fetchProductById(productId: number | string) {
  const { data } = await http.get<Product>(`/products/${productId}`)
  return data
}

export async function fetchCategories() {
  const { data } = await http.get<ProductCategory[]>('/products/categories')
  return data
}
