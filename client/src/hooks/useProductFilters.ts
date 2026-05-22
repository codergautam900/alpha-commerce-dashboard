import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { ProductSortValue } from '../types/product'
import { useDebounce } from './useDebounce'
import {
  DEFAULT_PRODUCT_SORT,
  parseCategoriesParam,
  parsePageParam,
  parseSortParam,
} from '../utils/products'

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchFromUrl = searchParams.get('search') ?? ''
  const [searchInput, setSearchInput] = useState(searchFromUrl)
  const debouncedSearch = useDebounce(searchInput, 400)

  const selectedCategories = useMemo(
    () => parseCategoriesParam(searchParams.get('categories')),
    [searchParams],
  )

  const sortValue = useMemo(
    () => parseSortParam(searchParams.get('sort')),
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

  useEffect(() => {
    if (debouncedSearch === searchFromUrl) {
      return
    }

    // The URL is the source of truth so filters survive refresh and shared links.
    updateParams({
      search: debouncedSearch.trim() || null,
      page: null,
    })
  }, [debouncedSearch, searchFromUrl, updateParams])

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

  const changePage = useCallback(
    (nextPage: number) => {
      updateParams({
        page: nextPage > 1 ? String(nextPage) : null,
      })
    },
    [updateParams],
  )

  const clearFilters = useCallback(() => {
    setSearchInput('')
    setSearchParams(new URLSearchParams())
  }, [setSearchParams])

  const applyQueryString = useCallback(
    (queryString: string) => {
      const nextParams = new URLSearchParams(queryString)
      setSearchInput(nextParams.get('search') ?? '')
      setSearchParams(nextParams)
    },
    [setSearchParams],
  )

  const activeFilterCount =
    (searchFromUrl ? 1 : 0) +
    selectedCategories.length +
    (sortValue !== DEFAULT_PRODUCT_SORT ? 1 : 0)

  return {
    activeFilterCount,
    changePage,
    changeSort,
    clearFilters,
    currentPage,
    debouncedSearch: debouncedSearch.trim(),
    hasActiveFilters: activeFilterCount > 0,
    applyQueryString,
    savedViewQueryString,
    searchInput,
    selectedCategories,
    setSearchInput,
    sortValue,
    toggleCategory,
  }
}

function buildNormalizedQueryString(searchParams: URLSearchParams) {
  return new URLSearchParams(
    Array.from(searchParams.entries()).sort(([firstKey], [secondKey]) =>
      firstKey.localeCompare(secondKey),
    ),
  ).toString()
}
