"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWalletStore } from "@/lib/store"
import { useContacts, useCurrentUser } from "@/hooks/use-users"
import { generateMockTransactions } from "@/lib/mock-data"
import { ContactAvatar } from "@/components/contact-avatar"
import { TransactionItem } from "@/components/transaction-item"
import { TransactionSkeleton } from "@/components/transaction-skeleton"
import { BottomNav } from "@/components/bottom-nav"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { Contact } from "@/lib/types"
// import Wayni from "@icons/waynilogo.svg"

export default function HomePage() {
  const router = useRouter()
  const { data: currentUser, isLoading: isLoadingUser } = useCurrentUser()
  const { data: contacts, isLoading: isLoadingContacts } = useContacts()

  const {
    currentUser: storedUser,
    balance,
    transactions,
    setCurrentUser,
    setContacts,
    addTransaction,
  } = useWalletStore()

  // Initialize user and contacts
  useEffect(() => {
    if (currentUser && !storedUser) {
      setCurrentUser(currentUser)
    }
  }, [currentUser, storedUser, setCurrentUser])

  useEffect(() => {
    if (contacts && contacts.length > 0) {
      setContacts(contacts)

      // Generate mock transactions if none exist
      if (transactions.length === 0) {
        const mockTransactions = generateMockTransactions(contacts)
        mockTransactions.forEach((txn) => addTransaction(txn))
      }
    }
  }, [contacts, setContacts, transactions.length, addTransaction])

  const displayUser = storedUser || currentUser
  const displayContacts = contacts || []

  const handleContactClick = (contact: Contact) => {
    router.push(`/send?contactId=${contact.login.uuid}`)
  }

  const isLoadingTransactions = isLoadingContacts || transactions.length === 0

  return (
    <div className="min-h-screen bg-bgWhiteWayli pb-22">
      {/* Header with gradient */}
      <div className="bg-primary text-primary-foreground px-main pt-12 pb-[60px]">
        <div className="flex items-center justify-between my-4">
          <div>
            {isLoadingUser ? (
              <div className="flex items-center gap-[12px]">
                  <Skeleton className="h-12 w-12 rounded-full bg-primary-foreground/20" />
                  <div className="flex items-start flex-col gap-0">
                    <Skeleton className="h-5 w-32 bg-primary-foreground/20 mt-1" />
                    <Skeleton className="h-5 w-48 bg-primary-foreground/20 mt-2" />
                  </div>
              </div>
              
            ) : (
            <div className="flex items-center gap-[12px]">
              <div className="h-12 w-12 rounded-full bg-primary-foreground/20 flex items-center justify-center text-xl font-bold">
                <Avatar className="flex items-center justify-center text-xl font-bold">
                  <AvatarImage className="h-12 w-12 rounded-full" src={displayUser?.picture.medium || "/placeholder.svg"} alt={`${displayUser?.name.first} ${displayUser?.name.last}`} />
                </Avatar>
              </div>
              <div className="flex items-start flex-col gap-0">
                <p className="text-sm opacity-90">Welcome back,</p>
                <h1 className="text-2xl font-bold">
                  {displayUser ? `${displayUser.name.first} ${displayUser.name.last}` : "User"}
                </h1>
              </div>
              
            </div>)}
          </div>
          
          
        </div>

        <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-2 text-center">
          <p className="text-sm opacity-90 mb-1 ">Your Balance</p>
          <p className="text-4xl font-bold">${balance.toLocaleString()}</p>
        </div>
      </div>

      {/* Send Again Section */}
      <div className="px-main card-top-rounded">
        <h2 className="text-h2 font-bold text-foreground mb-[24px] text-center">Send Again</h2>
        <div className="w-full overflow-x-auto mb-[32px]">
          <div className="flex gap-[19.5px] h-[102px]">
            {isLoadingContacts
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-[16px]">
                    <Skeleton className="h-[65px] w-[65px] rounded-full" />
                    <Skeleton className="h-3 w-12" />
                  </div>
                ))
              : displayContacts
                  .slice(0, 10)
                  .map((contact) => (
                    <ContactAvatar key={contact.login.uuid} contact={contact} onClick={() => handleContactClick(contact)} />
                  ))}
          </div>
        </div>
  

      {/* Latest Transactions */}
        <div>
          <h2 className="text-h2 font-bold text-foreground mb-[24px] text-center">Latest Transaction</h2>
            {isLoadingTransactions
              ? Array.from({ length: 5 }).map((_, i) => <TransactionSkeleton key={i} />)
              : transactions
                  .slice(0, 8)
                  .map((transaction) => <TransactionItem key={transaction.id} transaction={transaction} />)}
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
