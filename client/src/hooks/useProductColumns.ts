import { useEffect, useMemo, useState } from 'react'
import type { ProductColumnId } from '../types/product'
import {
  DEFAULT_VISIBLE_PRODUCT_COLUMNS,
  PRODUCT_COLUMN_DEFINITIONS,
  sanitizeVisibleProductColumns,
} from '../utils/productColumns'

const STORAGE_KEY = 'alpha-dashboard:product-columns'

export function useProductColumns() {
  const [visibleColumns, setVisibleColumns] = useState<ProductColumnId[]>(() => {
    if (typeof window === 'undefined') {
      return DEFAULT_VISIBLE_PRODUCT_COLUMNS
    }

    const storedValue = window.localStorage.getItem(STORAGE_KEY)

    if (!storedValue) {
      return DEFAULT_VISIBLE_PRODUCT_COLUMNS
    }

    try {
      const parsedValue = JSON.parse(storedValue) as ProductColumnId[]
      return sanitizeVisibleProductColumns(parsedValue)
    } catch {
      return DEFAULT_VISIBLE_PRODUCT_COLUMNS
    }
  })

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(visibleColumns))
  }, [visibleColumns])

  const toggleColumn = (columnId: ProductColumnId) => {
    const columnDefinition = PRODUCT_COLUMN_DEFINITIONS.find(
      (column) => column.id === columnId,
    )

    if (!columnDefinition?.hideable) {
      return
    }

    setVisibleColumns((currentColumns) => {
      const nextColumns = currentColumns.includes(columnId)
        ? currentColumns.filter((currentColumnId) => currentColumnId !== columnId)
        : [...currentColumns, columnId]

      return sanitizeVisibleProductColumns(nextColumns)
    })
  }

  const resetColumns = () => {
    setVisibleColumns(DEFAULT_VISIBLE_PRODUCT_COLUMNS)
  }

  const selectedColumnDefinitions = useMemo(
    () =>
      PRODUCT_COLUMN_DEFINITIONS.filter((column) =>
        visibleColumns.includes(column.id),
      ),
    [visibleColumns],
  )

  return {
    resetColumns,
    selectedColumnDefinitions,
    toggleColumn,
    visibleColumns,
  }
}
