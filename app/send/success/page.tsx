"use client"

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useWalletStore } from "@/lib/store"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Share2 } from "lucide-react"

function SuccessPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const amount = searchParams.get("amount")
  const contactId = searchParams.get("contactId")
  const notes = searchParams.get("notes") || ""
  const transactionId = searchParams.get("transactionId")

  const { contacts, transactions } = useWalletStore()
  const recipient = contacts.find((c) => c.login.uuid === contactId)
  const transaction = transactions.find((t) => t.id === transactionId)

  // if (!recipient || !amount || !transaction) {
  //   router.push("/")
  //   return null
  // }

  const fullName = `${recipient?.name.first} ${recipient?.name.last}`
  const initials = `${recipient?.name.first[0]}${recipient?.name.last[0]}`.toUpperCase()

  // Format date and time
  const transactionDate = new Date(transaction?.date ?? Date.now())
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(transactionDate)

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(transactionDate)

  const handleShare = async () => {
    const shareData = {
      title: "Transfer Successful",
      text: `Successfully sent $${amount} to ${fullName}`,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`Transfer Successful: $${amount} to ${fullName}`)
      alert("Transaction details copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-main">
      <div className="w-full max-w-md mt-[40px]">
        <Card className="p-main pt-[48px] rounded-3xl border-0 gap-0 mb-[48px]">
          {/* Success Message */}
          <div className="text-center mb-[28px]">
            <h1 className="text-h3 font-bold text-greenWayli mb-[4px]">Transfer Successful</h1>
            <p className="text-grayWayli text-h3">Your transaction was successful!</p>
          </div>

          {/* Amount */}
          <div className="text-center mb-[40px]">
            <p className="text-5xl font-bold text-foreground">$ {amount}</p>
          </div>

          {/* Recipient */}
          <div className="mb-[40px]">
            <p className="text-h3 font-bold mb-[16px] text-center">Send to</p>
            <div className="flex items-center justify-center gap-[12px]">
              <Avatar className="!h-[48px] !w-[48px]">
                <AvatarImage src={recipient?.picture.medium || "/placeholder.svg"} alt={recipient?.name.first[0]} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-body">{recipient?.name.first}</p>
                <p className="text-body">{recipient?.name.last}</p>
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="mb-8">
            <h2 className="text-h3 font-bold mb-[16px]">Transaction Details</h2>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-small text-grayWayli">Payment</span>
                <span className="text-sm font-bold text-foreground">${amount}</span>
              </div>

              {notes && (
                <div className="flex justify-between items-center">
                  <span className="text-small text-grayWayli">Notes</span>
                  <span className="text-small font-bold text-foreground">{notes}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-small text-grayWayli">Date</span>
                <span className="text-small font-bold text-foreground">{formattedDate}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-small text-grayWayli">Time</span>
                <span className="text-small font-bold text-foreground">{formattedTime}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-small text-grayWayli">Reference Number</span>
                <span className="text-small font-bold text-foreground">#{transactionId?.slice(-7)}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleShare}
            className="w-full h-[56px] text-[20px] font-bold bg-primary hover:bg-primary text-primary-foreground border-2 border-whiteWayli"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Share
          </Button>

            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="w-full h-[56px] font-bold border-2 border-primary text-[20px] text-greenWayli"
            >
              Back to Home
            </Button>
          </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-primary flex items-center justify-center">
          <p className="text-primary-foreground">Loading...</p>
        </div>
      }
    >
      <SuccessPageContent />
    </Suspense>
  )
}
