import clsx from 'clsx'

type SkeletonProps = {
  className?: string
  animated?: boolean
}

export function Skeleton({ className, animated = true }: SkeletonProps) {
  return (
    <div
      className={clsx(
        'rounded-lg bg-slate-200 dark:bg-slate-800',
        animated && 'animate-pulse',
        className,
      )}
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900/50">
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-6 w-1/2" />
      <div className="space-y-2 pt-3">
        <Skeleton className="h-4" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  )
}

export function TableSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex gap-4 rounded-lg bg-slate-100 p-4 dark:bg-slate-800">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function PageHeaderSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-1/3" />
      <Skeleton className="h-6 w-2/3" />
    </div>
  )
}

export default Skeleton
