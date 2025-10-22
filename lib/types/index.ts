export interface User {
  id: string
  name: {
    first: string
    last: string
  }
  email: string
  phone: string
  picture: {
    large: string
    medium: string
    thumbnail: string
  }
  location: {
    city: string
    state: string
    street: {
      number: number
      name: string
    }
  }
  login: {
    uuid: string
  }
}

export interface Contact extends User {
  isFavorite?: boolean
}

export type TransactionType = "transfer" | "cashin" | "internet" | "insurance"

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  date: Date
  recipient?: Contact
  description: string
}

export interface WalletState {
  currentUser: User | null
  balance: number
  contacts: Contact[]
  transactions: Transaction[]
  setCurrentUser: (user: User) => void
  setBalance: (balance: number) => void
  setContacts: (contacts: Contact[]) => void
  addTransaction: (transaction: Transaction) => void
  updateBalance: (amount: number) => void
}