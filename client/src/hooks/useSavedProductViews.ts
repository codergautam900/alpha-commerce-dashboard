import { useEffect, useMemo, useState } from 'react'
import type { ProductSavedView } from '../types/product'

const STORAGE_KEY = 'alpha-dashboard:saved-product-views'
const MAX_SAVED_VIEWS = 6

export function useSavedProductViews(currentQueryString: string) {
  const [savedViews, setSavedViews] = useState<ProductSavedView[]>(() => {
    if (typeof window === 'undefined') {
      return []
    }

    const storedValue = window.localStorage.getItem(STORAGE_KEY)

    if (!storedValue) {
      return []
    }

    try {
      const parsedValue = JSON.parse(storedValue) as ProductSavedView[]
      return sanitizeSavedViews(parsedValue)
    } catch {
      return []
    }
  })

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedViews))
  }, [savedViews])

  const activeViewId = useMemo(
    () =>
      savedViews.find((view) => view.queryString === currentQueryString)?.id ?? null,
    [currentQueryString, savedViews],
  )

  const saveView = (name: string) => {
    const trimmedName = name.trim()

    if (!trimmedName || !currentQueryString) {
      return
    }

    const createdAt = Date.now()

    setSavedViews((currentViews) => {
      const existingView = currentViews.find(
        (view) => view.name.toLowerCase() === trimmedName.toLowerCase(),
      )

      if (existingView) {
        return sanitizeSavedViews([
          {
            ...existingView,
            createdAt,
            name: trimmedName,
            queryString: currentQueryString,
          },
          ...currentViews.filter((view) => view.id !== existingView.id),
        ])
      }

      return sanitizeSavedViews([
        {
          id: `${createdAt}-${trimmedName.toLowerCase().replace(/\s+/g, '-')}`,
          name: trimmedName,
          queryString: currentQueryString,
          createdAt,
        },
        ...currentViews,
      ])
    })
  }

  const deleteView = (viewId: string) => {
    setSavedViews((currentViews) =>
      currentViews.filter((view) => view.id !== viewId),
    )
  }

  return {
    activeViewId,
    deleteView,
    saveView,
    savedViews,
  }
}

function sanitizeSavedViews(savedViews: ProductSavedView[]) {
  return savedViews
    .filter(
      (view) =>
        typeof view.id === 'string' &&
        view.id.length > 0 &&
        typeof view.name === 'string' &&
        view.name.trim().length > 0 &&
        typeof view.queryString === 'string' &&
        typeof view.createdAt === 'number',
    )
    .slice(0, MAX_SAVED_VIEWS)
}
