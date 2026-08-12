import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: {
    default: "HisabDo – Digital Khata & Bookkeeping",
    template: "%s | HisabDo",
  },
  description:
    "HisabDo helps shopkeepers and small businesses track credit/debit khata records, send reminders, and generate reports.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
