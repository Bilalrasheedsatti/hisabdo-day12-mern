"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useTransactions } from "@/context/TransactionContext";
import TransactionForm from "@/components/transactions/TransactionForm";
import { formatCurrency } from "@/lib/data";
import { ArrowDownLeft, ArrowUpRight, Download } from "lucide-react";
import Table from "@/components/ui/Table";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@/components/ui/Table";

export default function TransactionsClient() {
  const { transactions } = useTransactions();

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
            <Badge variant="neutral">{transactions.length} entries</Badge>
          </div>

          {transactions.length === 0 ? (
            <p className="mt-6 text-center text-sm text-ink-faint">No transactions yet. Add your first entry.</p>
          ) : (
            <div className="mt-4">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Date</TableHeaderCell>
                    <TableHeaderCell>Customer</TableHeaderCell>
                    <TableHeaderCell>Type</TableHeaderCell>
                    <TableHeaderCell align="right">Amount</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell className="font-medium text-ink">{entry.customerId}</TableCell>
                      <TableCell>
                        <Badge variant={entry.type === "credit" ? "warn" : "accent"}>
                          {entry.type === "credit" ? "Credit" : "Debit"}
                        </Badge>
                      </TableCell>
                      <TableCell align="right" className="font-extrabold">
                        {entry.type === "credit" ? "+" : "-"}
                        {formatCurrency(entry.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
