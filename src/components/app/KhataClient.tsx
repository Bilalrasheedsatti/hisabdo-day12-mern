"use client";

import Link from "next/link";
import { useTransactions } from "@/context/TransactionContext";
import { useCustomers } from "@/context/CustomerContext";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatCurrency } from "@/lib/data";
import { ArrowLeft, ArrowDownLeft, ArrowUpRight, Phone, MessageCircle, Bell } from "lucide-react";
import Table from "@/components/ui/Table";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@/components/ui/Table";

interface KhataClientProps {
  customerId: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("");
}

export default function KhataClient({ customerId }: KhataClientProps) {
  const { getCustomer } = useCustomers();
  const { transactions } = useTransactions();

  const customer = getCustomer(customerId);

  if (!customer) {
    return (
      <div className="space-y-6">
        <Link
          href="/app/customers"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Customers
        </Link>
        <Card className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-lg font-extrabold text-ink">Customer not found</p>
          <p className="mt-1 text-sm text-ink-soft">
            The customer you are looking for does not exist.
          </p>
        </Card>
      </div>
    );
  }

  if (!customer) {
    return null;
  }

  const customerTransactions = transactions.filter((t) => t.customerId === customer.id);

  let balance = 0;
  const rows = customerTransactions.map((transaction) => {
    balance += transaction.type === "credit" ? transaction.amount : -transaction.amount;
    return { ...transaction, runningBalance: balance };
  });

  return (
    <div className="space-y-6">
      <Link
        href="/app/customers"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Customers
      </Link>

      <Card className="bg-[#EAF0FF]">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink bg-white text-lg font-extrabold text-primary-dark">
              {getInitials(customer.name)}
            </span>
            <div>
              <h1 className="text-2xl font-extrabold text-ink">{customer.name}</h1>
              <p className="text-sm text-ink-soft">
                {customer.business} · {customer.phone}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {customer.tags?.map((tag) => (
                  <Badge key={tag} variant="primary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button href={`tel:${customer.phone}`} variant="secondary" size="sm">
              <Phone className="h-4 w-4" />
              Call
            </Button>
            <Button href="#" variant="secondary" size="sm">
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>
            <Button href="#" size="sm">
              <Bell className="h-4 w-4" />
              Remind
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 border-t-2 border-ink/10 pt-5 sm:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-ink-faint">Total Credit</p>
            <p className="mt-1 text-xl font-extrabold text-danger">
              {formatCurrency(customer.totalCredit)}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink-faint">Total Debit</p>
            <p className="mt-1 text-xl font-extrabold text-accent-dark">
              {formatCurrency(customer.totalDebit)}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink-faint">Outstanding</p>
            <p className="mt-1 text-xl font-extrabold text-ink">
              {formatCurrency(customer.outstanding)}
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-extrabold text-ink">Transaction History</h2>
          <div className="flex gap-2">
            <Button href="/app/transactions" size="sm" variant="secondary">
              <ArrowUpRight className="h-4 w-4" />
              Add Credit
            </Button>
            <Button href="/app/transactions" size="sm">
              <ArrowDownLeft className="h-4 w-4" />
              Add Debit
            </Button>
          </div>
        </div>

        {rows.length === 0 ? (
          <p className="mt-6 text-center text-sm text-ink-faint">No transactions for this customer yet.</p>
        ) : (
          <div className="mt-4">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Date</TableHeaderCell>
                  <TableHeaderCell>Type</TableHeaderCell>
                  <TableHeaderCell>Note</TableHeaderCell>
                  <TableHeaderCell align="right">Amount</TableHeaderCell>
                  <TableHeaderCell align="right">Balance</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...rows].reverse().map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="text-ink-soft">{row.date}</TableCell>
                    <TableCell>
                      <Badge variant={row.type === "credit" ? "warn" : "accent"}>
                        {row.type === "credit" ? "Credit" : "Debit"}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[180px] truncate font-medium text-ink">
                      {row.note}
                    </TableCell>
                    <TableCell
                      align="right"
                      className={`font-extrabold ${
                        row.type === "credit" ? "text-danger" : "text-accent-dark"
                      }`}
                    >
                      {row.type === "credit" ? "+" : "-"}
                      {formatCurrency(row.amount)}
                    </TableCell>
                    <TableCell align="right" className="font-bold text-ink">
                      {formatCurrency(row.runningBalance)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
}
