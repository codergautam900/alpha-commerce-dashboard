type PageLoaderProps = {
  message?: string
}

export default function PageLoader({ message = 'Loading content...' }: PageLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="glass-panel flex min-h-[280px] items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/60 dark:border-slate-700 dark:bg-slate-900/70 dark:shadow-slate-900/60"
    >
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900 dark:border-slate-700 dark:border-t-slate-100" />
        <p className="mt-4 text-sm font-medium text-slate-700 dark:text-slate-300">{message}</p>
      </div>
    </div>
  )
}
