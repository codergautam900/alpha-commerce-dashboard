import { useCallback, useState } from 'react'

const RECENT_SEARCHES_KEY = 'alpha-dashboard:recent-searches'
const MAX_RECENT = 8

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<string[]>(readRecentSearches)

  const addSearch = useCallback((search: string) => {
    const normalizedSearch = search.trim()

    if (!normalizedSearch) {
      return
    }

    setRecentSearches((prev) => {
      const filtered = prev.filter(
        (storedSearch) => storedSearch.toLowerCase() !== normalizedSearch.toLowerCase(),
      )
      const updated = [normalizedSearch, ...filtered].slice(0, MAX_RECENT)
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const clearSearches = useCallback(() => {
    setRecentSearches([])
    localStorage.removeItem(RECENT_SEARCHES_KEY)
  }, [])

  return {
    addSearch,
    clearSearches,
    recentSearches,
  }
}

function readRecentSearches() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const storedValue = window.localStorage.getItem(RECENT_SEARCHES_KEY)

    if (!storedValue) {
      return []
    }

    const parsedValue = JSON.parse(storedValue)

    if (!Array.isArray(parsedValue)) {
      return []
    }

    return parsedValue.filter((value): value is string => typeof value === 'string')
  } catch {
    return []
  }
}
