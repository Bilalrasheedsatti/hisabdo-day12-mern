import type { Metadata } from "next";
import TransactionsClient from "@/components/app/TransactionsClient";

export const metadata: Metadata = {
  title: "Transactions",
};

export default function TransactionsPage() {
  return <TransactionsClient />;
}
