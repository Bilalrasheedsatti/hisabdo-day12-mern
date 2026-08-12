import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { customers } from "@/lib/data";
import { formatCurrency } from "@/lib/data";
import { ArrowRight, Download, Plus, Search, Phone } from "lucide-react";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("");
}

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Customers</h1>
          <p className="mt-1 text-sm text-ink-soft">
            {customers.length} customers · Rs{" "}
            {customers.reduce((sum, customer) => sum + customer.outstanding, 0).toLocaleString()}{" "}
            outstanding
          </p>
        </div>
        <div className="flex gap-3">
          <Button href="#" variant="secondary" size="sm">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button href="#" size="sm">
            <Plus className="h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
        <input
          type="search"
          name="search"
          placeholder="Search customers..."
          className="w-full rounded-lg border-2 border-ink bg-white py-2.5 pl-9 pr-4 text-sm placeholder:text-ink-faint focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Customer grid */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {customers.map((customer) => (
          <Link key={customer.id} href={`/app/customers/${customer.id}`} className="group">
            <Card className="h-full transition-transform group-hover:-translate-y-1">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-primary-light font-bold text-primary-dark">
                    {getInitials(customer.name)}
                  </span>
                  <div>
                    <p className="font-extrabold text-ink">{customer.name}</p>
                    <p className="text-xs text-ink-faint">{customer.business}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-ink-faint">
                  <Phone className="h-3.5 w-3.5" />
                  {customer.phone}
                </span>
              </div>

              <div className="mt-5">
                <p className="text-xs font-semibold text-ink-faint">Outstanding</p>
                <p className="text-xl font-extrabold text-ink">
                  {formatCurrency(customer.outstanding)}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t-2 border-gray-100 pt-3">
                <div className="flex flex-wrap items-center gap-2">
                  {customer.tags?.map((tag) => (
                    <Badge key={tag} variant="primary">
                      {tag}
                    </Badge>
                  ))}
                  <span className="text-xs text-ink-faint">Last: {customer.lastEntry}</span>
                </div>
                <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
