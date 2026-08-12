"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useTransactions } from "@/context/TransactionContext";
import { useCustomers } from "@/context/CustomerContext";
import { formatCurrency } from "@/lib/data";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export default function DashboardClient() {
  const { transactions } = useTransactions();
  const { customers } = useCustomers();

  const recentEntries = transactions.slice(0, 5);

  const totalReceivable = customers.reduce((sum, c) => sum + c.outstanding, 0);
  const totalPayable = customers.reduce((sum, c) => sum + c.totalDebit, 0);
  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const todayEntries = transactions.filter((t) => t.date === today || t.date === new Date().toISOString().slice(0, 10));
  const activeCustomers = new Set(transactions.map((t) => t.customerId)).size;

  const kpiStats = [
    { label: "Total Receivable", value: formatCurrency(totalReceivable), delta: "Across all customers", positive: true },
    { label: "Total Payable", value: formatCurrency(totalPayable), delta: "All time payables", positive: true },
    { label: "Today's Entries", value: `${todayEntries.length} entries`, delta: "Recorded today", positive: true },
    { label: "Active Customers", value: `${activeCustomers}`, delta: "With transactions", positive: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Dashboard</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Welcome back, Bilal! Here&apos;s your khata today.
          </p>
        </div>
        <div className="flex gap-3">
          <Button href="/app/customers" variant="secondary" size="sm">
            Add Customer
          </Button>
          <Button href="/app/transactions" size="sm">
            New Entry
          </Button>
        </div>
      </div>

      {/* KPI cards */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiStats.map((stat) => (
          <Card key={stat.label} className="p-4">
            <p className="text-sm font-semibold text-ink-faint">{stat.label}</p>
            <p className="mt-2 text-2xl font-extrabold text-ink">{stat.value}</p>
            <p
              className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${
                stat.positive ? "text-accent-dark" : "text-danger"
              }`}
            >
              <TrendingUp className="h-3.5 w-3.5" />
              {stat.delta}
            </p>
          </Card>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent entries */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-ink">Recent Entries</h2>
            <Link
              href="/app/transactions"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {recentEntries.length === 0 ? (
            <p className="mt-6 text-center text-sm text-ink-faint">No entries yet. Start by adding a transaction.</p>
          ) : (
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
                    <p className="truncate font-bold text-ink">{entry.customerId}</p>
                    <p className="text-xs text-ink-faint">{entry.date}</p>
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
          )}
        </Card>

        {/* Quick actions */}
        <Card>
          <h2 className="text-lg font-extrabold text-ink">Quick Actions</h2>
          <div className="mt-4 space-y-3">
            {[
              { label: "Record udhaar (credit)", href: "/app/transactions" },
              { label: "Record payment (debit)", href: "/app/transactions" },
              { label: "Add new customer", href: "/app/customers" },
              { label: "Send reminders", href: "/app/reminders" },
              { label: "View reports", href: "/app/reports" },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center justify-between rounded-lg border-2 border-ink bg-gray-50 px-4 py-3 text-sm font-semibold text-ink transition-colors hover:border-primary hover:bg-primary-light"
              >
                {action.label}
                <ArrowRight className="h-4 w-4 text-primary" />
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
