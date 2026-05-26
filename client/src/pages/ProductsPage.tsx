import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../app/useAuth'
import { usePublication } from '../app/usePublication'
import ProductCard from '../components/products/ProductCard'
import ProductColumnCustomizer from '../components/products/ProductColumnCustomizer'
import ProductFilters from '../components/products/ProductFilters'
import ProductInsightsBar from '../components/products/ProductInsightsBar'
import ProductTable from '../components/products/ProductTable'
import LiveUpdatesFeed from '../components/ui/LiveUpdatesFeed'
import PageLoader from '../components/ui/PageLoader'
import PageHeader from '../components/ui/PageHeader'
import PaginationControls from '../components/ui/PaginationControls'
import StatePanel from '../components/ui/StatePanel'
import SyncStatus from '../components/ui/SyncStatus'
import { useProductColumns } from '../hooks/useProductColumns'
import { useProductFilters } from '../hooks/useProductFilters'
import { useProductsCatalog } from '../hooks/useProductsCatalog'
import { useSavedProductViews } from '../hooks/useSavedProductViews'
import { downloadProductsCsv } from '../utils/productExport'
import {
  PRODUCT_PAGE_SIZE,
  filterProducts,
  paginateProducts,
  sortProducts,
} from '../utils/products'

function ProductsPage() {
  const [copyStatusLabel, setCopyStatusLabel] = useState('Copy view link')
  const {
    activeFilterCount,
    appliedSearch,
    applyQueryString,
    changePage,
    changeRating,
    changeSearch,
    changeSort,
    clearFilters,
    currentPage,
    hasActiveFilters,
    ratingValue,
    savedViewQueryString,
    searchInputKey,
    selectedCategories,
    sortValue,
    toggleCategory,
  } = useProductFilters()
  const { session } = useAuth()
  const { isProductPublished, toggleProductPublished } = usePublication()
  const {
    moveColumn,
    orderedColumns,
    resetColumns,
    selectedColumnDefinitions,
    toggleColumn,
    visibleColumns,
  } = useProductColumns()

  const {
    categories,
    error,
    isError,
    isLoading,
    isRefreshing,
    lastUpdatedAt,
    products,
    refetchAll,
  } = useProductsCatalog()
  const { activeViewId, deleteView, saveView, savedViews } =
    useSavedProductViews(savedViewQueryString)
  const isAdmin = session?.role === 'admin'

  const visibleCatalogProducts = useMemo(
    () =>
      isAdmin
        ? products
        : products.filter((product) => isProductPublished(product.id)),
    [isAdmin, isProductPublished, products],
  )

  const availableCategories = useMemo(() => {
    if (isAdmin) {
      return categories
    }

    const visibleCategorySlugs = new Set(
      visibleCatalogProducts.map((product) => product.category),
    )

    return categories.filter((category) => visibleCategorySlugs.has(category.slug))
  }, [categories, isAdmin, visibleCatalogProducts])

  const publicationCounts = useMemo(
    () => ({
      hidden: products.filter((product) => !isProductPublished(product.id)).length,
      published: products.filter((product) => isProductPublished(product.id)).length,
    }),
    [isProductPublished, products],
  )

  // Filtering, sorting, and pagination are memoized so the full catalog is not recalculated on every render.
  const filteredProducts = useMemo(
    () =>
      filterProducts(
        visibleCatalogProducts,
        appliedSearch,
        selectedCategories,
        ratingValue,
      ),
    [visibleCatalogProducts, appliedSearch, selectedCategories, ratingValue],
  )

  const sortedProducts = useMemo(
    () => sortProducts(filteredProducts, sortValue),
    [filteredProducts, sortValue],
  )

  const paginatedProducts = useMemo(
    () => paginateProducts(sortedProducts, currentPage, PRODUCT_PAGE_SIZE),
    [sortedProducts, currentPage],
  )

  const filteredInsights = useMemo(() => {
    if (filteredProducts.length === 0) {
      return {
        averagePrice: 0,
        averageRating: 0,
        categoryCount: 0,
        lowStockCount: 0,
      }
    }

    return {
      averagePrice:
        filteredProducts.reduce((total, product) => total + product.price, 0) /
        filteredProducts.length,
      averageRating:
        filteredProducts.reduce((total, product) => total + product.rating, 0) /
        filteredProducts.length,
      categoryCount: new Set(filteredProducts.map((product) => product.category)).size,
      lowStockCount: filteredProducts.filter((product) => product.stock <= 10).length,
    }
  }, [filteredProducts])

  useEffect(() => {
    // A tighter filter can leave the current page out of range, so we snap
    // back to the last valid page instead of rendering an empty table.
    if (paginatedProducts.safePage !== currentPage) {
      changePage(paginatedProducts.safePage)
    }
  }, [changePage, currentPage, paginatedProducts.safePage])

  const handleExportCsv = () => {
    downloadProductsCsv(sortedProducts, selectedColumnDefinitions)
  }

  const handleCopyViewLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopyStatusLabel('Link copied')
      window.setTimeout(() => {
        setCopyStatusLabel('Copy view link')
      }, 2000)
    } catch {
      setCopyStatusLabel('Copy unavailable')
      window.setTimeout(() => {
        setCopyStatusLabel('Copy view link')
      }, 2000)
    }
  }

  const firstProductId = paginatedProducts.items[0]?.id ?? filteredProducts[0]?.id

  if (isLoading) {
    return (
      <>
        <PageHeader
          title="Products"
          description="Loading the product catalog, categories, and URL-linked filters."
        />
        <PageLoader message="Fetching products..." />
      </>
    )
  }

  if (isError) {
    return (
      <>
        <PageHeader
          title="Products"
          description="The product listing could not be loaded right now."
        />
        <StatePanel
          title="Unable to load products"
          description={
            error instanceof Error
              ? error.message
              : 'Something went wrong while contacting the products API.'
          }
          tone="error"
          action={
            <button
              type="button"
              onClick={refetchAll}
              className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Try again
            </button>
          }
        />
      </>
    )
  }

  return (
    <>
      <PageHeader
        title="Products"
        description={
          isAdmin
            ? 'Admin view of the full DummyJSON catalog with role-aware publish controls, URL-synced filters, and client-side pagination.'
            : 'User view of published products only, with URL-synced search, category filters, rating filters, and client-side pagination.'
        }
        eyebrow="Catalog Workspace"
        metaItems={[
          {
            label: isAdmin ? 'Catalog size' : 'Published products',
            value: `${visibleCatalogProducts.length} products`,
          },
          { label: 'Categories', value: `${availableCategories.length} available` },
          { label: 'Page size', value: `${PRODUCT_PAGE_SIZE} per page` },
          ...(isAdmin
            ? [
                { label: 'Published', value: `${publicationCounts.published}` },
                { label: 'Hidden', value: `${publicationCounts.hidden}` },
              ]
            : []),
        ]}
        action={
          firstProductId ? (
            <Link
              to={`/products/${firstProductId}`}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Preview first product
            </Link>
          ) : null
        }
      />

      <ProductFilters
        key={searchInputKey}
        activeFilterCount={activeFilterCount}
        activeViewId={activeViewId}
        canSaveCurrentView={hasActiveFilters}
        categories={availableCategories}
        onApplySavedView={applyQueryString}
        onClearFilters={clearFilters}
        onDeleteSavedView={deleteView}
        onRatingChange={changeRating}
        onSearchChange={changeSearch}
        onSaveCurrentView={saveView}
        onSortChange={changeSort}
        onToggleCategory={toggleCategory}
        ratingValue={ratingValue}
        savedViews={savedViews}
        searchValue={appliedSearch}
        selectedCategories={selectedCategories}
        sortValue={sortValue}
      />

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <SyncStatus
          isRefreshing={isRefreshing}
          lastUpdatedAt={lastUpdatedAt}
          onRefresh={refetchAll}
        />
        <LiveUpdatesFeed />
      </section>

      <ProductInsightsBar
        averagePrice={filteredInsights.averagePrice}
        averageRating={filteredInsights.averageRating}
        categoryCount={filteredInsights.categoryCount}
        copyStatusLabel={copyStatusLabel}
        lowStockCount={filteredInsights.lowStockCount}
        onCopyViewLink={() => {
          void handleCopyViewLink()
        }}
        onExportCsv={handleExportCsv}
        totalResults={filteredProducts.length}
      />

      <section className="rounded-[32px] border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_60px_-30px_rgba(15,23,42,0.35)] backdrop-blur dark:border-slate-700/80 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.92)_0%,rgba(2,6,23,0.94)_100%)] dark:shadow-[0_18px_60px_-30px_rgba(2,6,23,0.86)]">
        <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 lg:flex-row lg:items-end lg:justify-between dark:border-slate-700/80">
          <div>
            <h2 className="text-xl font-semibold text-slate-950 dark:text-slate-100">Catalog listing</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Showing {paginatedProducts.totalItems} filtered products from a total
              catalog of {visibleCatalogProducts.length}.
            </p>
          </div>

          <div className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            Filters in sync with URL
          </div>
        </div>

        <div className="mt-5">
          <ProductColumnCustomizer
            onMoveColumn={moveColumn}
            onReset={resetColumns}
            onToggleColumn={toggleColumn}
            orderedColumns={orderedColumns}
            visibleColumns={visibleColumns}
          />
        </div>

        {paginatedProducts.items.length === 0 ? (
          <div className="pt-5">
            <StatePanel
              title="No products matched your filters"
              description="Try removing one or two category filters, or search with a broader keyword."
              action={
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Reset filters
                </button>
              }
            />
          </div>
        ) : (
          <>
            <div className="mt-5">
              <ProductTable
                isProductPublished={isProductPublished}
                onTogglePublished={toggleProductPublished}
                products={paginatedProducts.items}
                role={session?.role ?? 'user'}
                visibleColumns={visibleColumns}
              />
            </div>

            <div className="mt-5 grid gap-4 lg:hidden">
              {paginatedProducts.items.map((product) => (
                <ProductCard
                  key={product.id}
                  isProductPublished={isProductPublished(product.id)}
                  onTogglePublished={() => toggleProductPublished(product.id)}
                  product={product}
                  role={session?.role ?? 'user'}
                />
              ))}
            </div>

            <div className="mt-5">
              <PaginationControls
                currentPage={paginatedProducts.safePage}
                onPageChange={changePage}
                pageSize={PRODUCT_PAGE_SIZE}
                totalItems={paginatedProducts.totalItems}
                totalPages={paginatedProducts.totalPages}
              />
            </div>
          </>
        )}
      </section>
    </>
  )
}

export default ProductsPage
