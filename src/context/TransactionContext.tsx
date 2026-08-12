"use client";

import type { Transaction, TransactionType } from "@/types";
import { ledgerTransactions as initialTransactions } from "@/lib/data";
import { createContext, useContext, useState, type ReactNode } from "react";

interface TransactionContextValue {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
}

const TransactionContext = createContext<TransactionContextValue | undefined>(
  undefined,
);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const addTransaction = (entry: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...entry,
      id: `tx-${Date.now()}`,
    };
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactions must be used within a TransactionProvider");
  }
  return context;
}
