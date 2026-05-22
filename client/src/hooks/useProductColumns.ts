import { useEffect, useMemo, useState } from 'react'
import type { ProductColumnId } from '../types/product'
import {
  DEFAULT_ORDERED_PRODUCT_COLUMNS,
  DEFAULT_VISIBLE_PRODUCT_COLUMNS,
  PRODUCT_COLUMN_DEFINITIONS,
  moveProductColumn,
  type ProductColumnDefinition,
  sanitizeOrderedProductColumns,
  type ProductColumnPreferences,
  sanitizeVisibleProductColumns,
} from '../utils/productColumns'

const STORAGE_KEY = 'alpha-dashboard:product-columns'

export function useProductColumns() {
  const [columnPreferences, setColumnPreferences] = useState<ProductColumnPreferences>(() => {
    if (typeof window === 'undefined') {
      return {
        orderedColumnIds: DEFAULT_ORDERED_PRODUCT_COLUMNS,
        visibleColumnIds: DEFAULT_VISIBLE_PRODUCT_COLUMNS,
      }
    }

    const storedValue = window.localStorage.getItem(STORAGE_KEY)

    if (!storedValue) {
      return {
        orderedColumnIds: DEFAULT_ORDERED_PRODUCT_COLUMNS,
        visibleColumnIds: DEFAULT_VISIBLE_PRODUCT_COLUMNS,
      }
    }

    try {
      const parsedValue = JSON.parse(storedValue) as
        | ProductColumnId[]
        | ProductColumnPreferences

      if (Array.isArray(parsedValue)) {
        return {
          orderedColumnIds: sanitizeOrderedProductColumns(parsedValue),
          visibleColumnIds: sanitizeVisibleProductColumns(parsedValue),
        }
      }

      return {
        orderedColumnIds: sanitizeOrderedProductColumns(parsedValue.orderedColumnIds),
        visibleColumnIds: sanitizeVisibleProductColumns(parsedValue.visibleColumnIds),
      }
    } catch {
      return {
        orderedColumnIds: DEFAULT_ORDERED_PRODUCT_COLUMNS,
        visibleColumnIds: DEFAULT_VISIBLE_PRODUCT_COLUMNS,
      }
    }
  })

  const { orderedColumnIds, visibleColumnIds } = columnPreferences

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(columnPreferences))
  }, [columnPreferences])

  const toggleColumn = (columnId: ProductColumnId) => {
    const columnDefinition = PRODUCT_COLUMN_DEFINITIONS.find(
      (column) => column.id === columnId,
    )

    if (!columnDefinition?.hideable) {
      return
    }

    setColumnPreferences((currentPreferences) => {
      const nextColumns = currentPreferences.visibleColumnIds.includes(columnId)
        ? currentPreferences.visibleColumnIds.filter(
            (currentColumnId) => currentColumnId !== columnId,
          )
        : [...currentPreferences.visibleColumnIds, columnId]

      return {
        ...currentPreferences,
        visibleColumnIds: sanitizeVisibleProductColumns(nextColumns),
      }
    })
  }

  const moveColumn = (columnId: ProductColumnId, direction: 'left' | 'right') => {
    setColumnPreferences((currentPreferences) => ({
      ...currentPreferences,
      orderedColumnIds: moveProductColumn(
        currentPreferences.orderedColumnIds,
        columnId,
        direction,
      ),
    }))
  }

  const resetColumns = () => {
    setColumnPreferences({
      orderedColumnIds: DEFAULT_ORDERED_PRODUCT_COLUMNS,
      visibleColumnIds: DEFAULT_VISIBLE_PRODUCT_COLUMNS,
    })
  }

  const selectedColumnDefinitions = useMemo(
    () =>
      orderedColumnIds
        .map((columnId) =>
          PRODUCT_COLUMN_DEFINITIONS.find((column) => column.id === columnId),
        )
        .filter(
          (column): column is ProductColumnDefinition =>
            column !== undefined && visibleColumnIds.includes(column.id),
        ),
    [orderedColumnIds, visibleColumnIds],
  )

  return {
    moveColumn,
    orderedColumns: orderedColumnIds,
    resetColumns,
    selectedColumnDefinitions,
    toggleColumn,
    visibleColumns: visibleColumnIds,
  }
}
