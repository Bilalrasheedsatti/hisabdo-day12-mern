import type { Metadata } from "next";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { MessageCircle, CheckCircle2, Clock, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Reminders",
};

const reminders = [
  {
    id: "r-1",
    customer: "Ahmed Traders",
    amount: "Rs 112,500",
    method: "WhatsApp",
    status: "delivered",
    time: "Today, 9:00 AM",
  },
  {
    id: "r-2",
    customer: "Al-Noor Mart",
    amount: "Rs 54,100",
    method: "SMS",
    status: "sent",
    time: "Today, 8:45 AM",
  },
  {
    id: "r-3",
    customer: "Sabir & Sons",
    amount: "Rs 36,900",
    method: "WhatsApp",
    status: "pending",
    time: "Scheduled – Tomorrow",
  },
];

const statusStyles = {
  delivered: { label: "Delivered", variant: "accent" as const, icon: CheckCircle2 },
  sent: { label: "Sent", variant: "primary" as const, icon: Send },
  pending: { label: "Pending", variant: "warn" as const, icon: Clock },
};

export default function RemindersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Payment Reminders</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Automatically recover dues with SMS and WhatsApp.
          </p>
        </div>
        <Button href="#">Send New Reminder</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-4 text-center">
          <p className="text-sm font-semibold text-ink-faint">Sent Today</p>
          <p className="mt-1 text-3xl font-extrabold text-ink">12</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-sm font-semibold text-ink-faint">Delivered</p>
          <p className="mt-1 text-3xl font-extrabold text-accent-dark">9</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-sm font-semibold text-ink-faint">Recovery Rate</p>
          <p className="mt-1 text-3xl font-extrabold text-primary">68%</p>
        </Card>
      </div>

      <Card>
        <h2 className="text-lg font-extrabold text-ink">Recent Reminders</h2>
        <ul className="mt-4 divide-y-2 divide-gray-100">
          {reminders.map((reminder) => {
            const status = statusStyles[reminder.status as keyof typeof statusStyles];
            return (
              <li key={reminder.id} className="flex items-center gap-4 py-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-ink bg-primary-light text-primary-dark">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-ink">{reminder.customer}</p>
                  <p className="text-xs text-ink-faint">
                    {reminder.method} · {reminder.time}
                  </p>
                </div>
                <p className="font-extrabold text-ink">{reminder.amount}</p>
                <Badge variant={status.variant}>
                  <status.icon className="h-3.5 w-3.5" />
                  {status.label}
                </Badge>
              </li>
            );
          })}
        </ul>
      </Card>

      <Card className="bg-[#EAF0FF]">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-ink">Automate recovery</h2>
            <p className="mt-1 text-sm text-ink-soft">
              Set up automatic follow-ups for overdue balances. Upgrade to Pro
              to enable scheduled reminders.
            </p>
          </div>
          <Button href="/pricing" className="shrink-0">
            Upgrade to Pro
          </Button>
        </div>
      </Card>
    </div>
  );
}
