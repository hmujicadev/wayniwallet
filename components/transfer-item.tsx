import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Transaction } from "@/lib/types"

interface TransferItemProps {
  transaction: Transaction
}

// Helper function to format date without date-fns
function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date

  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return "Invalid date"
  }

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
  return formatter.format(dateObj).replace(",", " ·")
}

export function TransferItem({ transaction }: TransferItemProps) {
  if (!transaction.recipient) return null

  const { recipient } = transaction
  const initials = `${recipient.name.first[0]}${recipient.name.last[0]}`.toUpperCase()

  return (
    <div className="flex items-center gap-[12px] mb-[24px]">
      <Avatar className="h-[60px] w-[60px]">
        <AvatarImage
          src={recipient.picture.medium || "/placeholder.svg"}
          alt={`${recipient.name.first} ${recipient.name.last}`}
        />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0 flex flex-col">
        <p className="font-semibold text-h3 text-foreground">
          {recipient.name.first} {recipient.name.last}
        </p>
        <p className="text-grayWayli text-small">{formatDate(transaction.date)}</p>
      </div>
      <p className="font-bold text-body">${" "}{Math.abs(transaction.amount).toLocaleString()}</p>
    </div>
  )
}
