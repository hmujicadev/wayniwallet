import { Skeleton } from "@/components/ui/skeleton"

export function TransactionSkeleton() {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
      <Skeleton className="h-5 w-20" />
    </div>
  )
}
