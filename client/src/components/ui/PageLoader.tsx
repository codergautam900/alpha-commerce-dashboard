type PageLoaderProps = {
  message?: string
}

function PageLoader({ message = 'Loading content...' }: PageLoaderProps) {
  return (
    <div className="flex min-h-[280px] items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/60">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
        <p className="mt-4 text-sm font-medium text-slate-700">{message}</p>
      </div>
    </div>
  )
}

export default PageLoader
