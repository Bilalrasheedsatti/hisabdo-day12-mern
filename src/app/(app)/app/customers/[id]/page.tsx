import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { customers, ledgerTransactions } from "@/lib/data";
import { formatCurrency } from "@/lib/data";
import { ArrowLeft, ArrowDownLeft, ArrowUpRight, Phone, MessageCircle, Bell } from "lucide-react";

interface KhataPageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return customers.map((customer) => ({ id: customer.id }));
}

export function generateMetadata({ params }: KhataPageProps): Metadata {
  const customer = customers.find((c) => c.id === params.id);
  return {
    title: customer ? `${customer.name} Khata` : "Khata",
  };
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("");
}

export default function KhataPage({ params }: KhataPageProps) {
  const customer = customers.find((c) => c.id === params.id);
  if (!customer) {
    notFound();
  }

  const transactions = ledgerTransactions.filter((t) => t.customerId === customer.id);

  let balance = 0;
  const rows = transactions.map((transaction) => {
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

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-ink text-xs uppercase tracking-wider text-ink-faint">
                <th className="pb-3 pr-4 font-semibold">Date</th>
                <th className="pb-3 pr-4 font-semibold">Type</th>
                <th className="pb-3 pr-4 font-semibold">Note</th>
                <th className="pb-3 pr-4 text-right font-semibold">Amount</th>
                <th className="pb-3 text-right font-semibold">Balance</th>
              </tr>
            </thead>
            <tbody>
              {[...rows].reverse().map((row) => (
                <tr key={row.id} className="border-b border-gray-100 last:border-0">
                  <td className="py-3 pr-4 text-sm text-ink-soft">{row.date}</td>
                  <td className="py-3 pr-4">
                    <Badge variant={row.type === "credit" ? "warn" : "accent"}>
                      {row.type === "credit" ? "Credit" : "Debit"}
                    </Badge>
                  </td>
                  <td className="max-w-[180px] truncate py-3 pr-4 text-sm font-medium text-ink">
                    {row.note}
                  </td>
                  <td
                    className={`py-3 pr-4 text-right text-sm font-extrabold ${
                      row.type === "credit" ? "text-danger" : "text-accent-dark"
                    }`}
                  >
                    {row.type === "credit" ? "+" : "-"}
                    {formatCurrency(row.amount)}
                  </td>
                  <td className="py-3 text-right text-sm font-bold text-ink">
                    {formatCurrency(row.runningBalance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
