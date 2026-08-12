import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatCurrency } from "@/lib/data";
import { Download, TrendingUp, TrendingDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Reports",
};

const monthlyData = [
  { month: "Mar", value: 182000 },
  { month: "Apr", value: 226000 },
  { month: "May", value: 198000 },
  { month: "Jun", value: 245000 },
  { month: "Jul", value: 268000 },
  { month: "Aug", value: 284500 },
];

const topCustomers = [
  { name: "Ahmed Traders", amount: 112500, percent: 56 },
  { name: "Bismillah Store", amount: 55500, percent: 34 },
  { name: "Al-Noor Mart", amount: 54100, percent: 30 },
  { name: "Sabir & Sons", amount: 36900, percent: 24 },
];

export default function ReportsPage() {
  const maxValue = Math.max(...monthlyData.map((item) => item.value));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Reports</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Understand your khata with daily and monthly summaries.
          </p>
        </div>
        <Button href="#" variant="secondary" size="sm">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink-faint">Receivable</p>
            <TrendingUp className="h-4 w-4 text-accent-dark" />
          </div>
          <p className="mt-2 text-2xl font-extrabold text-ink">Rs 284,500</p>
          <p className="mt-1 text-xs font-semibold text-accent-dark">+12% vs last month</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink-faint">Payable</p>
            <TrendingDown className="h-4 w-4 text-danger" />
          </div>
          <p className="mt-2 text-2xl font-extrabold text-ink">Rs 46,200</p>
          <p className="mt-1 text-xs font-semibold text-accent-dark">-8% vs last month</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm font-semibold text-ink-faint">Month&apos;s Recovery</p>
          <p className="mt-2 text-2xl font-extrabold text-ink">Rs 121,800</p>
          <p className="mt-1 text-xs font-semibold text-ink-faint">68% of total dues</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm font-semibold text-ink-faint">Avg. Dues Age</p>
          <p className="mt-2 text-2xl font-extrabold text-ink">23 days</p>
          <p className="mt-1 text-xs font-semibold text-ink-faint">15 days slower than target</p>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-ink">Monthly Receivable</h2>
            <Badge variant="neutral">Last 6 months</Badge>
          </div>
          <div className="mt-6 flex h-48 items-end gap-3 sm:gap-4">
            {monthlyData.map((item) => (
              <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-bold text-ink">
                  {(item.value / 1000).toFixed(0)}k
                </span>
                <div
                  className="w-full rounded-t-lg border-2 border-b-0 border-ink bg-primary"
                  style={{ height: `${Math.max((item.value / maxValue) * 100, 8)}%` }}
                />
                <span className="text-xs font-semibold text-ink-faint">{item.month}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-extrabold text-ink">Top Outstanding Customers</h2>
          <div className="mt-5 space-y-4">
            {topCustomers.map((customer) => (
              <div key={customer.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-ink">{customer.name}</span>
                  <span className="font-extrabold text-ink">{formatCurrency(customer.amount)}</span>
                </div>
                <div className="mt-1.5 h-3 overflow-hidden rounded-full border-2 border-ink bg-white">
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${customer.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
