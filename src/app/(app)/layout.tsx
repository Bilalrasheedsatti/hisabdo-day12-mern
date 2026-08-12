import type { ReactNode } from "react";
import AppShell from "@/components/layout/AppShell";
import { TransactionProvider } from "@/context/TransactionContext";

export const metadata = {
  title: {
    default: "Dashboard | HisabDo",
    template: "%s | HisabDo",
  },
};

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <TransactionProvider>
      <AppShell>{children}</AppShell>
    </TransactionProvider>
  );
}
