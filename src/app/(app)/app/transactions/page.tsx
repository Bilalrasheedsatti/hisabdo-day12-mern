import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { recentEntries } from "@/lib/data";
import { formatCurrency } from "@/lib/data";
import TransactionForm from "@/components/transactions/TransactionForm";
import { ArrowDownLeft, ArrowUpRight, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Transactions",
};

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Transactions</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Record and review every credit and debit entry.
          </p>
        </div>
        <div className="flex gap-3">
          <Button href="#" variant="secondary" size="sm">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <TransactionForm />

        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-ink">All Entries</h2>
            <Badge variant="neutral">This month</Badge>
          </div>
          <ul className="mt-4 divide-y-2 divide-gray-100">
            {recentEntries.map((entry) => (
              <li key={entry.id} className="flex items-center gap-4 py-3">
                <span
                  className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-ink ${
                    entry.type === "credit"
                      ? "bg-warn-light text-amber-700"
                      : "bg-accent-light text-accent-dark"
                  }`}
                >
                  {entry.type === "credit" ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownLeft className="h-4 w-4" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-ink">{entry.customer}</p>
                  <p className="text-xs text-ink-faint">{entry.time}</p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-extrabold ${
                      entry.type === "credit" ? "text-danger" : "text-accent-dark"
                    }`}
                  >
                    {entry.type === "credit" ? "+" : "-"}
                    {formatCurrency(entry.amount)}
                  </p>
                  <Badge variant={entry.type === "credit" ? "warn" : "accent"}>
                    {entry.type === "credit" ? "Credit" : "Debit"}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
