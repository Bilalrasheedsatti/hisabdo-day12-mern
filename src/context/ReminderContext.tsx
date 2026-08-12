"use client";

import type { Reminder } from "@/types";
import { reminders as initialReminders } from "@/lib/data";
import { createContext, useContext, useState, type ReactNode } from "react";

interface ReminderContextValue {
  reminders: Reminder[];
  loading: boolean;
  error: string | null;
  addReminder: (reminder: Omit<Reminder, "id">) => Promise<void>;
  updateReminder: (id: string, reminder: Partial<Reminder>) => Promise<void>;
  deleteReminder: (id: string) => Promise<void>;
  getReminder: (id: string) => Reminder | undefined;
}

const ReminderContext = createContext<ReminderContextValue | undefined>(undefined);

export function ReminderProvider({ children }: { children: ReactNode }) {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addReminder = async (entry: Omit<Reminder, "id">) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const newReminder: Reminder = {
        ...entry,
        id: `r-${Date.now()}`,
        status: "scheduled",
        sentAt: null,
      };
      setReminders((prev) => [newReminder, ...prev]);
    } catch {
      setError("Failed to add reminder. Please try again.");
      throw new Error("Failed to add reminder");
    } finally {
      setLoading(false);
    }
  };

  const updateReminder = async (id: string, updates: Partial<Reminder>) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setReminders((prev) =>
        prev.map((reminder) =>
          reminder.id === id ? { ...reminder, ...updates } : reminder,
        ),
      );
    } catch {
      setError("Failed to update reminder. Please try again.");
      throw new Error("Failed to update reminder");
    } finally {
      setLoading(false);
    }
  };

  const deleteReminder = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setReminders((prev) => prev.filter((reminder) => reminder.id !== id));
    } catch {
      setError("Failed to delete reminder. Please try again.");
      throw new Error("Failed to delete reminder");
    } finally {
      setLoading(false);
    }
  };

  const getReminder = (id: string) => {
    return reminders.find((reminder) => reminder.id === id);
  };

  return (
    <ReminderContext.Provider
      value={{
        reminders,
        loading,
        error,
        addReminder,
        updateReminder,
        deleteReminder,
        getReminder,
      }}
    >
      {children}
    </ReminderContext.Provider>
  );
}

export function useReminders() {
  const context = useContext(ReminderContext);
  if (!context) {
    throw new Error("useReminders must be used within a ReminderProvider");
  }
  return context;
}
