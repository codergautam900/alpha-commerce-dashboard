import {
  Minus,
  Plus,
  ShoppingCart,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../app/useCart'
import {
  getCartLineSummary,
  getMaxCartQuantity,
  getShippingCopy,
} from '../../utils/cart'
import { formatCategoryLabel, formatCurrency } from '../../utils/formatters'

function CartDrawer() {
  const {
    cartItems,
    cartSummary,
    clearCart,
    closeCart,
    isCartOpen,
    removeFromCart,
    updateQuantity,
  } = useCart()
  const [isCheckoutPreviewVisible, setIsCheckoutPreviewVisible] = useState(false)

  useEffect(() => {
    if (!isCartOpen) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isCartOpen])

  if (!isCartOpen) {
    return null
  }

  const checkoutMessage =
    isCheckoutPreviewVisible && cartSummary.totalUnits > 0
      ? `Ready to buy ${cartSummary.totalUnits} unit${cartSummary.totalUnits > 1 ? 's' : ''} across ${cartSummary.uniqueItems} product${cartSummary.uniqueItems > 1 ? 's' : ''} for ${formatCurrency(cartSummary.grandTotal)}.`
      : ''

  const handleClose = () => {
    setIsCheckoutPreviewVisible(false)
    closeCart()
  }

  const handleClearCart = () => {
    setIsCheckoutPreviewVisible(false)
    clearCart()
  }

  const handleCheckoutPreview = () => {
    if (cartSummary.totalUnits === 0) {
      return
    }

    setIsCheckoutPreviewVisible(true)
  }

  return (
    <div className="fixed inset-0 z-[70] flex justify-end bg-slate-950/45 backdrop-blur-sm">
      <button
        type="button"
        onClick={handleClose}
        className="absolute inset-0 cursor-default"
        aria-label="Close cart"
      />

      <aside className="page-reveal relative z-10 h-full w-full max-w-[460px] overflow-y-auto overscroll-contain border-l border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.97)_0%,rgba(248,250,252,0.98)_100%)] shadow-[-24px_0_80px_-36px_rgba(15,23,42,0.55)] touch-pan-y dark:border-slate-700/80 dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.98)_0%,rgba(15,23,42,0.98)_100%)] dark:shadow-[-24px_0_80px_-36px_rgba(2,6,23,0.92)]">
        <div className="flex min-h-full flex-col">
          <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,250,252,0.98)_100%)] px-5 py-5 backdrop-blur dark:border-slate-700/80 dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.98)_0%,rgba(15,23,42,0.98)_100%)]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                <ShoppingCart className="h-3.5 w-3.5" />
                Cart
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 dark:text-slate-100">
                Order calculator
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Live totals update as you add products or change quantities.
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="rounded-2xl border border-slate-200 bg-white p-2.5 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="Close cart drawer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 px-5 py-5">
            {cartItems.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center dark:border-slate-700 dark:bg-slate-900/70">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-white text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-300 dark:shadow-slate-950/60">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-950 dark:text-slate-100">
                  Your cart is empty
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Add products from the catalog or detail page and the full price
                  calculation will appear here automatically.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((cartItem) => {
                  const lineSummary = getCartLineSummary(
                    cartItem.product,
                    cartItem.quantity,
                  )

                  return (
                    <article
                      key={cartItem.product.id}
                      className="rounded-[28px] border border-slate-200/80 bg-white/90 p-4 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.3)] dark:border-slate-700/80 dark:bg-slate-900/75 dark:shadow-[0_18px_50px_-34px_rgba(2,6,23,0.8)]"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={cartItem.product.thumbnail}
                          alt={cartItem.product.title}
                          className="h-20 w-20 rounded-2xl bg-slate-100 object-cover dark:bg-slate-800"
                        />

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                                {formatCategoryLabel(cartItem.product.category)}
                              </p>
                              <Link
                                to={`/products/${cartItem.product.id}`}
                                onClick={handleClose}
                                className="mt-1 block truncate text-sm font-semibold text-slate-950 transition hover:text-sky-700 dark:text-slate-100 dark:hover:text-sky-400"
                              >
                                {cartItem.product.title}
                              </Link>
                              <p className="mt-1 text-sm text-slate-500">
                                {formatCurrency(cartItem.product.price)} each
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeFromCart(cartItem.product.id)}
                              className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                              aria-label={`Remove ${cartItem.product.title}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                            <div className="inline-flex items-center rounded-2xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800/80">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    cartItem.product.id,
                                    Math.max(1, cartItem.quantity - 1),
                                  )
                                }
                                disabled={cartItem.quantity === 1}
                                className="rounded-xl p-2 text-slate-600 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-300 dark:hover:bg-slate-700"
                                aria-label={`Decrease ${cartItem.product.title} quantity`}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="min-w-10 px-3 text-center text-sm font-semibold text-slate-900 dark:text-slate-100">
                                {cartItem.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    cartItem.product.id,
                                    Math.min(
                                      getMaxCartQuantity(cartItem.product),
                                      cartItem.quantity + 1,
                                    ),
                                  )
                                }
                                disabled={
                                  cartItem.quantity >= getMaxCartQuantity(cartItem.product)
                                }
                                className="rounded-xl p-2 text-slate-600 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 dark:text-slate-300 dark:hover:bg-slate-700"
                                aria-label={`Increase ${cartItem.product.title} quantity`}
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>

                            <div className="text-right">
                              <p className="text-sm font-semibold text-slate-950 dark:text-slate-100">
                                {formatCurrency(lineSummary.discountedSubtotal)}
                              </p>
                              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-emerald-600">
                                Save {formatCurrency(lineSummary.discountTotal)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </div>

          <div className="border-t border-slate-200/80 px-5 py-5 dark:border-slate-700/80">
            <div className="rounded-[30px] border border-slate-200/80 bg-slate-950 p-5 text-white shadow-[0_18px_50px_-30px_rgba(15,23,42,0.8)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Checkout math
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight">
                    {formatCurrency(cartSummary.grandTotal)}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-3 text-slate-100">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <SummaryRow label="Products" value={`${cartSummary.uniqueItems}`} />
                <SummaryRow label="Units" value={`${cartSummary.totalUnits}`} />
                <SummaryRow
                  label="Subtotal"
                  value={formatCurrency(cartSummary.subtotal)}
                />
                <SummaryRow
                  label="Discount savings"
                  value={`- ${formatCurrency(cartSummary.discountTotal)}`}
                  valueClassName="text-emerald-300"
                />
                <SummaryRow
                  label="Shipping"
                  value={formatCurrency(cartSummary.shipping)}
                />
                <SummaryRow
                  label="Estimated tax"
                  value={formatCurrency(cartSummary.tax)}
                />
              </div>

              <div className="mt-5 rounded-[24px] border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">Delivery note</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {getShippingCopy(cartSummary.discountedSubtotal)}
                </p>
              </div>

              {checkoutMessage ? (
                <div className="mt-4 rounded-[24px] border border-emerald-400/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">
                  {checkoutMessage}
                </div>
              ) : null}

              <div className="mt-5 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleCheckoutPreview}
                  disabled={cartSummary.totalUnits === 0}
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Buy products
                </button>
                <button
                  type="button"
                  onClick={handleClearCart}
                  disabled={cartSummary.totalUnits === 0}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Clear cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}

type SummaryRowProps = {
  label: string
  value: string
  valueClassName?: string
}

function SummaryRow({
  label,
  value,
  valueClassName = 'text-white',
}: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-slate-300">{label}</span>
      <span className={`font-semibold ${valueClassName}`}>{value}</span>
    </div>
  )
}

export default CartDrawer
