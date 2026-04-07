import { create } from 'zustand';
import { persist, createJSONStorage } from "zustand/middleware";

export interface Transaction {
  id: string;
  council: string;
  pcnNumber: string;
  fineAmount: string;
  status: 'success' | 'failed';
  dateCompleted: string;
  totalPaid: string; // Total amount including service fee
  serviceFee: string;
  referenceId?: string;
  paymentId?: string;
}

interface TransactionStore {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'dateCompleted'>) => void;
  getSuccessfulTransactions: () => Transaction[];
  clearTransactions: () => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
}

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set, get) => ({
      transactions: [],
      
      addTransaction: (transaction) => set((state) => ({
        transactions: [
          {
            ...transaction,
            id: Date.now().toString() + '_' + Math.random().toString(36).substr(2, 9),
            dateCompleted: new Date().toISOString(),
          },
          ...state.transactions
        ]
      })),

      getSuccessfulTransactions: () => {
        return get().transactions.filter(tx => tx.status === 'success');
      },

      updateTransaction: (id, updates) => set((state) => ({
        transactions: state.transactions.map(tx => 
          tx.id === id ? { ...tx, ...updates } : tx
        )
      })),

      clearTransactions: () => set({ transactions: [] }),
    }),
    {
      name: 'transaction-storage',
      storage: createJSONStorage(() => sessionStorage), // Use sessionStorage for persistence across sessions
    }
  )
);