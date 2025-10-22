import type { Transaction, TransactionType, User } from "./types"

export function generateMockTransactions(contacts: User[]): Transaction[] {
  const types: TransactionType[] = ["transfer", "cashin", "internet", "insurance"]
  const descriptions: Record<TransactionType, string> = {
    transfer: "Transfer",
    cashin: "CashIn",
    internet: "Internet",
    insurance: "Insurance",
  }

  const transactions: Transaction[] = []
  const now = new Date()

  // Generate some mock transactions
  for (let i = 0; i < 10; i++) {
    const type = types[Math.floor(Math.random() * types.length)]
    const isPositive = type === "cashin"
    const amount = isPositive
      ? Math.floor(Math.random() * 300000) + 50000
      : -(Math.floor(Math.random() * 600000) + 20000)

    const date = new Date(now)
    date.setDate(date.getDate() - Math.floor(Math.random() * 30))

    transactions.push({
      id: `Transfer-${i}`,
      type,
      amount,
      date,
      recipient: type === "transfer" && contacts[i % contacts.length] ? contacts[i % contacts.length] : undefined,
      description: descriptions[type],
    })
  }

  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime())
}
