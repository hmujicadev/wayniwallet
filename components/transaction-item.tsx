import type { Transaction } from "@/lib/types"
import { TransactionIcon } from "./transaction-icon"
import { Badge } from "@/components/ui/badge"

interface TransactionItemProps {
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
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
  return formatter.format(dateObj).replace(",", " ·")
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const isPositive = transaction.amount > 0

  return (
    <div className="flex items-center gap-[12px] mb-[24px]">
      <TransactionIcon type={transaction.type} />
      <div className="flex-1 min-w-0 gap-[4px] flex flex-col">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-h3 text-foreground">{transaction.description}</p>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
            {transaction.type}
          </Badge>
        </div>
        <p className="text-grayWayli text-small">{formatDate(transaction.date)}</p>
      </div>
      <p className={`font-bold text-body ${isPositive ? "text-amountGreenWayli" : "text-amountRedWayli"}`}>
        {isPositive ? "+" : "-"}${" "}{Math.abs(transaction.amount).toLocaleString()}
      </p>
    </div>
  )
}
