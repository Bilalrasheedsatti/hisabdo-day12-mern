"use client";

import type { Customer } from "@/types";
import { customers as initialCustomers } from "@/lib/data";
import { createContext, useContext, useState, type ReactNode } from "react";

interface CustomerContextValue {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  addCustomer: (customer: Omit<Customer, "id">) => Promise<void>;
  updateCustomer: (id: string, customer: Partial<Customer>) => Promise<void>;
  deleteCustomer: (id: string) => Promise<void>;
  getCustomer: (id: string) => Customer | undefined;
}

const CustomerContext = createContext<CustomerContextValue | undefined>(undefined);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addCustomer = async (entry: Omit<Customer, "id">) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const newCustomer: Customer = {
        ...entry,
        id: `c-${Date.now()}`,
      };
      setCustomers((prev) => [newCustomer, ...prev]);
    } catch {
      setError("Failed to add customer. Please try again.");
      throw new Error("Failed to add customer");
    } finally {
      setLoading(false);
    }
  };

  const updateCustomer = async (id: string, updates: Partial<Customer>) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setCustomers((prev) =>
        prev.map((customer) =>
          customer.id === id ? { ...customer, ...updates } : customer,
        ),
      );
    } catch {
      setError("Failed to update customer. Please try again.");
      throw new Error("Failed to update customer");
    } finally {
      setLoading(false);
    }
  };

  const deleteCustomer = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setCustomers((prev) => prev.filter((customer) => customer.id !== id));
    } catch {
      setError("Failed to delete customer. Please try again.");
      throw new Error("Failed to delete customer");
    } finally {
      setLoading(false);
    }
  };

  const getCustomer = (id: string) => {
    return customers.find((customer) => customer.id === id);
  };

  return (
    <CustomerContext.Provider
      value={{ customers, loading, error, addCustomer, updateCustomer, deleteCustomer, getCustomer }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomers() {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomers must be used within a CustomerProvider");
  }
  return context;
}
