import { useCallback, useMemo, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import type {
  ProductRatingFilterValue,
  ProductSortValue,
} from '../types/product'
import {
  DEFAULT_PRODUCT_SORT,
  buildNormalizedQueryString,
  parseCategoriesParam,
  parsePageParam,
  parseRatingParam,
  parseSortParam,
} from '../utils/products'

export function useProductFilters() {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchInputResetVersion, setSearchInputResetVersion] = useState(0)
  const searchFromUrl = searchParams.get('search') ?? ''
  const appliedSearch = searchFromUrl.trim()
  // The search field keeps its own debounced draft, so we bump this key when
  // filters are replaced externally and the input needs a clean reset.
  const searchInputKey = `${location.key}:${searchInputResetVersion}`

  const selectedCategories = useMemo(
    () => parseCategoriesParam(searchParams.get('categories')),
    [searchParams],
  )

  const sortValue = useMemo(
    () => parseSortParam(searchParams.get('sort')),
    [searchParams],
  )

  const ratingValue = useMemo(
    () => parseRatingParam(searchParams.get('rating')),
    [searchParams],
  )

  const currentPage = useMemo(
    () => parsePageParam(searchParams.get('page')),
    [searchParams],
  )

  const savedViewQueryString = useMemo(() => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.delete('page')

    return buildNormalizedQueryString(nextParams)
  }, [searchParams])

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const nextParams = new URLSearchParams(searchParams)

      Object.entries(updates).forEach(([key, value]) => {
        if (!value) {
          nextParams.delete(key)
          return
        }

        nextParams.set(key, value)
      })

      setSearchParams(nextParams)
    },
    [searchParams, setSearchParams],
  )

  const toggleCategory = useCallback(
    (categorySlug: string) => {
      const nextCategories = selectedCategories.includes(categorySlug)
        ? selectedCategories.filter((category) => category !== categorySlug)
        : [...selectedCategories, categorySlug]

      updateParams({
        categories: nextCategories.length > 0 ? nextCategories.join(',') : null,
        page: null,
      })
    },
    [selectedCategories, updateParams],
  )

  const changeSort = useCallback(
    (nextSortValue: ProductSortValue) => {
      updateParams({
        sort: nextSortValue === DEFAULT_PRODUCT_SORT ? null : nextSortValue,
        page: null,
      })
    },
    [updateParams],
  )

  const changeSearch = useCallback(
    (nextSearchValue: string) => {
      updateParams({
        search: nextSearchValue.trim() || null,
        page: null,
      })
    },
    [updateParams],
  )

  const changeRating = useCallback(
    (nextRatingValue: ProductRatingFilterValue | null) => {
      updateParams({
        rating: nextRatingValue ? String(nextRatingValue) : null,
        page: null,
      })
    },
    [updateParams],
  )

  const changePage = useCallback(
    (nextPage: number) => {
      updateParams({
        page: nextPage > 1 ? String(nextPage) : null,
      })
    },
    [updateParams],
  )

  const clearFilters = useCallback(() => {
    setSearchInputResetVersion((currentVersion) => currentVersion + 1)
    setSearchParams(new URLSearchParams())
  }, [setSearchParams])

  const applyQueryString = useCallback(
    (queryString: string) => {
      setSearchInputResetVersion((currentVersion) => currentVersion + 1)
      const nextParams = new URLSearchParams(queryString)
      setSearchParams(nextParams)
    },
    [setSearchParams],
  )

  const activeFilterCount =
    (searchFromUrl ? 1 : 0) +
    selectedCategories.length +
    (ratingValue ? 1 : 0) +
    (sortValue !== DEFAULT_PRODUCT_SORT ? 1 : 0)

  return {
    activeFilterCount,
    appliedSearch,
    changePage,
    changeSearch,
    changeRating,
    changeSort,
    clearFilters,
    currentPage,
    hasActiveFilters: activeFilterCount > 0,
    applyQueryString,
    ratingValue,
    savedViewQueryString,
    searchInputKey,
    selectedCategories,
    sortValue,
    toggleCategory,
  }
}
