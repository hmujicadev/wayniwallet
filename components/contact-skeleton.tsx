import { Skeleton } from "@/components/ui/skeleton"

export function ContactSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Skeleton className="h-16 w-16 rounded-full" />
      <Skeleton className="h-3 w-12" />
    </div>
  )
}
