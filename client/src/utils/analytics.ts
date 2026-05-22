import type { Product, ProductCategory } from '../types/product'

export type CategoryDistributionItem = {
  slug: string
  label: string
  value: number
  share: number
}

export type DashboardAnalytics = {
  averageDiscount: number
  averagePrice: number
  averageRating: number
  categoryCount: number
  categoryDistribution: CategoryDistributionItem[]
  healthyInventoryRate: number
  inventoryValue: number
  largestCategoryLabel: string
  largestCategoryShare: number
  lowStockCount: number
  totalProducts: number
  topRatedProductTitle: string
}

export function buildDashboardAnalytics(
  products: Product[],
  categories: ProductCategory[],
): DashboardAnalytics {
  if (products.length === 0) {
    return {
      averageDiscount: 0,
      averagePrice: 0,
      averageRating: 0,
      categoryCount: categories.length,
      categoryDistribution: [],
      healthyInventoryRate: 0,
      inventoryValue: 0,
      largestCategoryLabel: 'N/A',
      largestCategoryShare: 0,
      lowStockCount: 0,
      totalProducts: 0,
      topRatedProductTitle: 'No products available',
    }
  }

  const categoryNameMap = new Map(
    categories.map((category) => [category.slug, category.name]),
  )

  const totalProducts = products.length
  const averageRating =
    products.reduce((total, product) => total + product.rating, 0) / totalProducts
  const averagePrice =
    products.reduce((total, product) => total + product.price, 0) / totalProducts
  const averageDiscount =
    products.reduce((total, product) => total + product.discountPercentage, 0) /
    totalProducts
  const inventoryValue = products.reduce(
    (total, product) => total + product.price * product.stock,
    0,
  )
  const lowStockCount = products.filter((product) => product.stock <= 10).length
  const healthyInventoryRate =
    (products.filter((product) => product.stock > 10).length / totalProducts) * 100
  const topRatedProduct = [...products].sort((first, second) => second.rating - first.rating)[0]

  // We count products per category first, then derive the share so the chart
  // and the ranking list both read from the same normalized dataset.
  const categoryCounts = products.reduce<Record<string, number>>((accumulator, product) => {
    accumulator[product.category] = (accumulator[product.category] ?? 0) + 1
    return accumulator
  }, {})

  const rankedCategories = Object.entries(categoryCounts)
    .map(([slug, value]) => ({
      slug,
      label: categoryNameMap.get(slug) ?? slug,
      share: (value / totalProducts) * 100,
      value,
    }))
    .sort((first, second) => second.value - first.value)

  const topCategories = rankedCategories.slice(0, 6)
  const remainingCategories = rankedCategories.slice(6)
  const largestCategory = rankedCategories[0]

  if (remainingCategories.length === 0) {
    return {
      averageDiscount,
      averagePrice,
      averageRating,
      categoryCount: categories.length || rankedCategories.length,
      categoryDistribution: topCategories,
      healthyInventoryRate,
      inventoryValue,
      largestCategoryLabel: largestCategory?.label ?? 'N/A',
      largestCategoryShare: largestCategory?.share ?? 0,
      lowStockCount,
      totalProducts,
      topRatedProductTitle: topRatedProduct?.title ?? 'N/A',
    }
  }

  const otherCategoryTotal = remainingCategories.reduce(
    (total, category) => total + category.value,
    0,
  )

  return {
    averageDiscount,
    averagePrice,
    averageRating,
    categoryCount: categories.length || rankedCategories.length,
    categoryDistribution: [
      ...topCategories,
      {
        slug: 'other',
        label: 'Other',
        share: (otherCategoryTotal / totalProducts) * 100,
        value: otherCategoryTotal,
      },
    ],
    healthyInventoryRate,
    inventoryValue,
    largestCategoryLabel: largestCategory?.label ?? 'N/A',
    largestCategoryShare: largestCategory?.share ?? 0,
    lowStockCount,
    totalProducts,
    topRatedProductTitle: topRatedProduct?.title ?? 'N/A',
  }
}
