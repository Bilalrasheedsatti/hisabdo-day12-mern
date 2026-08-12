import type { ReactNode } from "react";
import AppShell from "@/components/layout/AppShell";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { TransactionProvider } from "@/context/TransactionContext";
import { CustomerProvider } from "@/context/CustomerContext";
import { ReminderProvider } from "@/context/ReminderContext";

export const metadata = {
  title: {
    default: "Dashboard | HisabDo",
    template: "%s | HisabDo",
  },
};

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <CustomerProvider>
      <TransactionProvider>
        <ReminderProvider>
          <ProtectedRoute>
            <AppShell>{children}</AppShell>
          </ProtectedRoute>
        </ReminderProvider>
      </TransactionProvider>
    </CustomerProvider>
  );
}
