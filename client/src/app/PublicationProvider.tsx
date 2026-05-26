import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { PublicationContext } from './publicationContext'

const STORAGE_KEY = 'alpha-dashboard:product-publication'

type PublicationProviderProps = {
  children: ReactNode
}

type PublicationOverrides = Record<string, boolean>

export function PublicationProvider({ children }: PublicationProviderProps) {
  const [publicationOverrides, setPublicationOverrides] = useState<PublicationOverrides>(() => {
    if (typeof window === 'undefined') {
      return {}
    }

    const storedValue = window.localStorage.getItem(STORAGE_KEY)

    if (!storedValue) {
      return {}
    }

    try {
      return sanitizePublicationOverrides(JSON.parse(storedValue))
    } catch {
      return {}
    }
  })

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(publicationOverrides))
  }, [publicationOverrides])

  const value = useMemo(
    () => ({
      isProductPublished: (productId: number) => {
        const storedValue = publicationOverrides[String(productId)]

        if (typeof storedValue === 'boolean') {
          return storedValue
        }

        return getDefaultPublicationStatus(productId)
      },
      setProductPublished: (productId: number, published: boolean) => {
        setPublicationOverrides((currentOverrides) => ({
          ...currentOverrides,
          [String(productId)]: published,
        }))
      },
      toggleProductPublished: (productId: number) => {
        setPublicationOverrides((currentOverrides) => {
          const currentValue = currentOverrides[String(productId)]
          const resolvedValue =
            typeof currentValue === 'boolean'
              ? currentValue
              : getDefaultPublicationStatus(productId)

          return {
            ...currentOverrides,
            [String(productId)]: !resolvedValue,
          }
        })
      },
    }),
    [publicationOverrides],
  )

  return (
    <PublicationContext.Provider value={value}>{children}</PublicationContext.Provider>
  )
}

function sanitizePublicationOverrides(value: unknown) {
  if (!value || typeof value !== 'object') {
    return {}
  }

  return Object.fromEntries(
    Object.entries(value).filter(
      ([key, currentValue]) =>
        Number.isFinite(Number(key)) && typeof currentValue === 'boolean',
    ),
  )
}

function getDefaultPublicationStatus(productId: number) {
  // A handful of products start hidden so the two roles are easy to verify during review.
  return productId % 9 !== 0
}
