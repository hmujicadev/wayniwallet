import Insurance from "@icons/insurance.svg"
import Transfers from "@icons/transfers.svg"
import Cashin from "@icons/cashin.svg"

import type { TransactionType } from "@/lib/types"
import { cn } from "@/lib/utils"

interface TransactionIconProps {
  type: TransactionType
}

export function TransactionIcon({ type }: TransactionIconProps) {
  const config = {
    transfer: {
      icon: Transfers,
      bg: "bg-[#F9F5FE]",
      color: "text-[#662AB2]",
    },
    cashin: {
      icon: Cashin,
      bg: "bg-[#F9F5FE]",
      color: "text-[#662AB2]",
    },
    internet: {
      icon: Insurance,
      bg: "bg-[#F9F5FE]",
      color: "text-[#662AB2]",
    },
    insurance: {
      icon: Insurance,
      bg: "bg-[#F9F5FE]",
      color: "text-[#662AB2]",
    },
  }

  const { icon: Icon, bg, color } = config[type]

  return (
    <div className={cn("flex items-center justify-center h-[52px] w-[52px] rounded-full", bg)}>
      <Icon className={cn("h-[22px] w-[22px]", color)} />
    </div>
  )
}
