import type { ReactNode } from "react";
import AppShell from "@/components/layout/AppShell";

export const metadata = {
  title: {
    default: "Dashboard | HisabDo",
    template: "%s | HisabDo",
  },
};

export default function AppLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
