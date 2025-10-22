import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { WalletState } from "./types"

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      currentUser: null,
      balance: 2800,
      contacts: [],
      transactions: [],

      setCurrentUser: (user) => set({ currentUser: user }),

      setBalance: (balance) => set({ balance }),

      setContacts: (contacts) => set({ contacts }),

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        })),

      updateBalance: (amount) =>
        set((state) => ({
          balance: state.balance + amount,
        })),
    }),
    {
      name: "wayniwallet-storage",
    },
  ),
)
