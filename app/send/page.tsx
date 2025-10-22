"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { useWalletStore } from "@/lib/store"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

function SendPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const contactId = searchParams.get("contactId")
 
  const { toast } = useToast()

  const { contacts, balance, updateBalance, addTransaction } = useWalletStore()
  const [amount, setAmount] = useState("")
  const [notes, setNotes] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

   const recipient = contacts.find((c) => c.login.uuid === contactId)

  useEffect(() => {
    if (!recipient) {
      router.push("/")
    }
  }, [recipient, router])

  if (!recipient) {
    return null
  }

  const fullName = `${recipient.name.first} ${recipient.name.last}`
  const initials = `${recipient.name.first[0]}${recipient.name.last[0]}`.toUpperCase()

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "")
    setAmount(value)
  }

  const handleTransfer = async () => {
    const transferAmount = Number.parseFloat(amount)

    if (!transferAmount || transferAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      })
      return
    }

    if (transferAmount > balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance for this transfer",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const transaction = {
      id: `txn-${Date.now()}`,
      type: "transfer" as const,
      amount: -transferAmount,
      date: new Date(),
      recipient,
      description: "Transfer",
    }

    addTransaction(transaction)
    updateBalance(-transferAmount)

    // Navigate to success page with transaction details
    const params = new URLSearchParams({
      amount: transferAmount.toString(),
      contactId: recipient.login.uuid,
      notes: notes,
      transactionId: transaction.id,
    })

    router.push(`/send/success?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-bgWhiteWayli flex flex-col">
      {/* Header */}
      <div className="text-primary-foreground bg-primary px-main pt-12 pb-[60px]">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.back()} className="p-2 -ml-2 hover:bg-primary-foreground/10 rounded-full">
            <ArrowLeft className="h-7 w-7" />
          </button>
          <h1 className="text-2xl font-bold">Send again</h1>
          <div className="w-10" />
        </div>

        <div className="text-center">
          <p className="text-sm opacity-90 mb-1">Your balance</p>
          <p className="text-3xl font-bold">${balance.toLocaleString()}</p>
        </div>
      </div>

      {/* Transfer Form */}
      <div className="px-main card-top-rounded flex flex-col justify-between flex-1 pb-[28px]">
        <div className="flex-1">
          {/* Recipient */}
          <div className="flex flex-col items-center mb-[24px]">
            <Avatar className="h-[65px] w-[65px] mt-[5px] mb-[16px]">
              <AvatarImage src={recipient.picture.medium || "/placeholder.svg"} alt={fullName} />
              <AvatarFallback className="text-xl">{initials}</AvatarFallback>
            </Avatar>
            <span className="text-small text-foreground">{fullName}</span>
          </div>

          {/* Amount Input */}
          <div className="mb-[40px]">
            <Label htmlFor="amount" className="text-h2 block text-center mb-[8px]">
              Set Amount
            </Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-foreground">$</span>
              <Input
                id="amount"
                type="text"
                inputMode="decimal"
                placeholder="0"
                value={amount}
                onChange={handleAmountChange}
                className="border-0 border-input bg-bgGrayWayli px-8 py-2 text-sm
                placeholder:text-gray-400 focus-visible:outline-none
                focus-visible:ring-0 focus-visible:ring-offset-0 w-full text-center text-h1 font-bold"
              />
            </div>
          </div>

          {/* Notes Input */}
          <div className="mb-8">
            <Label htmlFor="notes" className="text-h2 mb-[20px] block">
              Notes
            </Label>
            <Textarea
              id="notes"
              placeholder="For food"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="resize-none h-24"
            />
          </div>
          </div>

          {/* Transfer Button */}
          <Button
            onClick={handleTransfer}
            disabled={isProcessing || !amount}
            className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isProcessing ? "Processing..." : "Proceed to Transfer"}
          </Button>
   
      </div>
    </div>
  )
}

export default function SendPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <SendPageContent />
    </Suspense>
  )
}
