"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar } from "lucide-react"
import { useWalletStore } from "@/lib/store"
import { useContacts } from "@/hooks/use-users"
import { TransferItem } from "@/components/transfer-item"
import { TransactionSkeleton } from "@/components/transaction-skeleton"
import { BottomNav } from "@/components/bottom-nav"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function TransfersPage() {
  const router = useRouter()
  const { transactions } = useWalletStore()
  const { isLoading: isLoadingContacts } = useContacts()
  const [dateFilter, setDateFilter] = useState<string>("all")

  const filteredTransfers = useMemo(() => {
  const onlyTransfers = transactions.filter(
    (t) => t.type === "transfer" && t.recipient
  );
  if (dateFilter === "all") return onlyTransfers;

  const now = new Date();
  const startOfToday = new Date(now); startOfToday.setHours(0,0,0,0);
  const toDate = (d: Date | string) => (d instanceof Date ? d : new Date(d));

  switch (dateFilter) {
    case "today":
      return onlyTransfers.filter((txn) => toDate(txn.date) >= startOfToday);
    case "week": {
      const sevenDaysAgo = new Date(startOfToday);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return onlyTransfers.filter((txn) => toDate(txn.date) >= sevenDaysAgo);
    }
    case "month": {
      const oneMonthAgo = new Date(startOfToday);
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      return onlyTransfers.filter((txn) => toDate(txn.date) >= oneMonthAgo);
    }
    default:
      return onlyTransfers;
  }
}, [transactions, dateFilter]);


  const isLoading = isLoadingContacts || transactions.length === 0

  return (
    <div className="min-h-screen bg-bgWhiteWayli pb-22">
      {/* Header */}
      <div className="text-primary-foreground bg-primary px-main pt-12 pb-[60px]">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => router.push("/")} className="p-2 -ml-2 hover:bg-primary-foreground/10 rounded-full">
            <ArrowLeft className="h-7 w-7" />
          </button>
          <h1 className="text-2xl font-bold">Transfers</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Filter Section */}
      <div className="px-main card-top-rounded">
        <div className="flex items-center justify-between mb-[32px]">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-foreground">Latest Transfer</h2>
            <Badge variant="secondary">{filteredTransfers.length}</Badge>
          </div>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-[155px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Transfers List */}
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => <TransactionSkeleton key={i} />)
          ) : filteredTransfers.length > 0 ? (
            filteredTransfers.map((transaction) => <TransferItem key={transaction.id} transaction={transaction} />)
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No transfers found</p>
            </div>
          )}
      
      </div>
      <BottomNav />
    </div>
  )
}
